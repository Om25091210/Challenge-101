import React, { useState, useEffect, useRef } from 'react';
import { Form, Col, Row, Button, Card } from 'react-bootstrap';
import API from "@utils/blockapi";
import useRazorpay from "react-razorpay";
import { useCallback } from "react";

function CoinBuyForm({user}) {
    const cost = useRef(0);
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const [coinVal, setCoinVal] = useState(0);
    const [coinAmount, setCoinAmount] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [inrVal, setINRVal] = useState(0);
    const [inrAmount, setINRAmount] = useState(0);
    const [fees, setFees] = useState(0);
    const [total, setTotal] = useState(0);
    const [invalid, setInvalid] = useState({});
    const [invalid2, setInvalid2] = useState({});
    const [hideButton, setHide] = useState(false);

    const Razorpay = useRazorpay();

    useEffect(() => {
        API.getINR()
            .then(res => {
                setCoinVal(res.data);
                const div = 1 / res.data;
                setINRVal(div);
            })
    })
    //Input is coins
    const getValue = (amount) => {
        if (isNaN(amount)) {
            setInvalid2({ isInvalid: "isInvalid" })
            setHide(true);
        } else {
            setHide(false);
            const value = amount * coinVal;

            setINRAmount(value.toFixed(2));


            const fee = value / 100;
            setFees(fee.toFixed(2));
            const total = parseFloat(value) + parseFloat(fee);
            setTotal(total.toFixed(2));
        }
    }

    //Input is INR
    const getINR = (inr) => {

        if (isNaN(inr)) {
            setInvalid({ isInvalid: "isInvalid" })
            setHide(true);
        } else {
            setHide(false);
            setInvalid({})
            const value = inr * inrVal;
            setCoinAmount(value);

            const fee = inr / 100;
            setFees(fee.toFixed(2));
            const total = parseFloat(inr) + parseFloat(fee);
            setTotal(total.toFixed(2));
            console.log(total);
        }



    }

    const toggleListener = (boolean, val = 0) => {
        if (boolean) {
            setToggle(true)
            getValue(val);
        } else {
            setToggle(false)
            getINR(val);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setData({ total: e.target[3].value, coins: e.target[0].value, show: true })
        setShow(true);
    }

  const handlePayment = async (tot) => {

    console.log(tot);
    const options = {
      key: "rzp_test_TGb47fS6VcBpqY",
      amount: tot*100,
      currency: "INR",
      name: "Multiplayr esports",
      description: "Buying MP Coin",
      image: "https://example.com/your_logo",
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: '9880773498' //user.phone_number,
      },
      notes: {
        address: "Multiplayr Coin Corporate Office",
      },
      theme: {
        color: "#7238E9",
      },
    };

    const rzpay = new Razorpay(options);

  rzpay.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
      
    rzpay.open();
  };

    return (
        <>
            <Card style={{
                color: 'rgb(53, 53, 53)',
                width: '100%',
                paddingTop: '45px',
                paddingLeft: '55px',
                paddingRight: '55px',
                alignContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '20px',
            }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Amount of Coins:
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            {toggle
                                ? <Form.Control ref={cost} type="text" onChange={(e) => getValue(e.target.value)} {...invalid2}/>
                                : <Form.Control ref={cost} type="text" onFocus={(e) => toggleListener(true, e.target.value)} value={coinAmount} />
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextCost">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Cost INR:
                    </Form.Label>

                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            {toggle
                                ? <Form.Control type="text" onFocus={(e) => toggleListener(false, e.target.value)} value={inrAmount} />
                                : <Form.Control type="text" onChange={(e) => getINR(e.target.value)} {...invalid} />
                            }
                        </Col>
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTransFees">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Trans Fees (1% INR):
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            <Form.Control readOnly value={fees} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextTotal">
                        <Form.Label style={{ marginTop: 5 }} column md={4}>
                            Total (INR):
                        </Form.Label>
                        <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
                            <Form.Control type="number" readOnly value={(total)} />
                        </Col>
                    </Form.Group>
                    <Form.Group style={{ marginTop: 5 }} as={Row}>
                        <Col style={{ marginTop: 5 }} md={{ span: 10, offset: 5 }}>
                            {hideButton ? null : <Button type="submit" onClick={() => handlePayment(total)}>Continue</Button>}
                        </Col>
                    </Form.Group>
                </Form>
            </Card>

        </>

    )
}

export default CoinBuyForm;