import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '@store/GlobalState';

import { getData } from '@utils/fetchData';
import ProductItem from '@components/product/ProductItem';
import filterSearch from '@utils/filterSearch';
import { useRouter } from 'next/router';
import Filter from '@components/Filter';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';

const ProductRigs = ({ user, productList, Userdata }) => {
  const [products, setProducts] = useState(productList);
  const [searchText, setSearchText] = useState('');
  const [searchText2, setSearchText2] = useState('');
  const [rigsData, setRigsData] = useState([]);
  const [states, setStates] = useState({
    keyboard: '',
    mouse: ''
  });

  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  useEffect(() => {
    setProducts(productList);
  }, [productList]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  useEffect(() => {
    axios.get(`${baseURL}/api/rigsdata/`).then((res) => setRigsData(res.data));
  }, []);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const handleCheckALL = () => {
    products.forEach((product) => (product.checked = !isCheck));
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: '',
          id: product._id,
          title: 'Delete all selected products?',
          type: 'DELETE_PRODUCT'
        });
      }
    });

    dispatch({ type: 'ADD_MODAL', payload: deleteArr });
  };

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = rigsData?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) &&
        value.category === 'Keyboard'
      );
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleSelectedRig = (data) => {
    setSearchText(data.name);
    state.keyboard = data._id;
  };

  const [filteredData2, setFilteredData2] = useState([]);
  const handleFilter2 = (event) => {
    const searchWord = event.target.value;

    setSearchText2(searchWord);
    const newFilter = rigsData?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) &&
        value.category === 'Mouse'
      );
    });

    if (searchText2 === '') {
      setFilteredData2([]);
    } else {
      setFilteredData2(newFilter);
    }
  };
  const handleSelectedRig2 = (data) => {
    setSearchText2(data.name);
    state.mouse = data._id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.put(`${baseURL}/api/profile/rigs/${user._id}`, state);
      toast.success('Saved Changes', { autoClose: 2000 });
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  return (
    <div className="tab hide" id="rigs">
      <div className="rigs">
        <ul>
          {Userdata.profile.rigs.length === 0 ? (
            <p>No Rigs available for you.</p>
          ) : (
            Userdata.profile.rigs.map((rig) => (
              <li>
                <div className="lft_prod_det">
                  {' '}
                  <span className="new"> New</span>
                  <div className="prod_brand">
                    {rig.rigId.name.length > 30
                      ? rig.rigId.name.substring(0, 30) + '...'
                      : rig.rigId.name}
                  </div>
                  <p className="prod_name">{rig.rigId.category}</p>
                  <a href="#prod2" className="quickpoup">
                    Buy Now
                  </a>{' '}
                </div>
                <div className="prod_img">
                  <img src={rig.rigId.image} alt={rig.rigId.name} />
                </div>
              </li>
            ))
          )}
        </ul>

        <div className="sponser_btn">
          {' '}
          {Userdata.profile.user._id === user._id ? (
            <a href="#!" className="model_show_btn">
              <button className="btn">
                {' '}
                <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
                Your Rigs
              </button>
            </a>
          ) : null}
          <div className="common_model_box" style={{ height: '12rem' }}>
            {' '}
            <a href="#!" className="model_close">
              {' '}
              X{' '}
            </a>
            <div className="inner_model_box">
              <h3>Rigs</h3>
              <form className="common_form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="">
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Keyboard</label>
                      <input
                        type="search"
                        id="keyboard"
                        name="keyboard"
                        placeholder="Enter The Keyboard name"
                        value={searchText}
                        onChange={handleFilter}
                        autoComplete="off"
                      />
                      {searchText.length !== 0 ? (
                        <div className="custom-rig-tag">
                          <div>
                            {!filteredData || filteredData.length === 0 ? (
                              <p>No Keyboard found..</p>
                            ) : (
                              filteredData.map((data) => (
                                <div
                                  onClick={() => handleSelectedRig(data)}
                                  key={data._id}
                                >
                                  <img
                                    src={data?.image}
                                    height={50}
                                    width={50}
                                  />
                                  <p>
                                    {data.name.length > 20
                                      ? data.name.substring(0, 20) + '...'
                                      : data.name}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Mouse</label>
                      <input
                        type="search"
                        id="mouse"
                        name="mouse"
                        placeholder="Enter Mouse name"
                        value={searchText2}
                        onChange={handleFilter2}
                        autoComplete="off"
                      />
                      {searchText2.length !== 0 ? (
                        <div className="custom-rig-tag">
                          <div>
                            {!filteredData2 || filteredData2.length === 0 ? (
                              <p>No Mouse found..</p>
                            ) : (
                              filteredData2.map((data) => (
                                <div
                                  onClick={() => handleSelectedRig2(data)}
                                  key={data._id}
                                >
                                  <img
                                    src={data?.image}
                                    height={50}
                                    width={50}
                                  />
                                  <p>
                                    {data.name.length > 20
                                      ? data.name.substring(0, 20) + '...'
                                      : data.name}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <button className="btn">Done</button>
                </div>
              </form>
            </div>
            <div className="overlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRigs;
