import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { getData } from '@utils/fetchData';
import { DataContext } from '@store/GlobalState';
import { addToCart } from '@store/Actions';
import { useRouter } from 'next/router';
import Link from 'next/link';

import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';

import FooterMain from '@components/FooterMain';
import AllScript from '../AllScript';

const DetailProduct = ({ user, productItem }) => {
  const router = useRouter();
  const [product] = useState(productItem);
  const [tab, setTab] = useState(0);
  const [clicked, setClicked] = useState(false);

  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const isActive = (index) => {
    if (tab === index) return ' active';
    return '';
  };

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        <Head>
          <title>Product Details</title>
        </Head>

        <div className="checkout_strip">
          <h1>Product Detail</h1>
          <button className="btn btn-info" onClick={() => router.back()}>
            <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i> Go
            Back
          </button>
        </div>

        {/* <div className='row'>
  
            <div className="col-md-6">
                <img src={ product.images[tab].url } alt={ product.images[tab].url } className="" />

                <div className="row mx-0" style={{cursor: 'pointer'}} >

                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded ${isActive(index)}`}
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(index)} />
                    ))}

                </div>
            </div>

            <div className="col-md-6 mt-3">
                    <h2 className="text-uppercase">{ product.title }</h2>
                    
                    <span className="badge rounded-pill bg-info text-light text-capitalize mb-4 p-2">Seller: { product.seller }</span>
                    <h5 className="text-danger">${product.price}</h5>

                <div className="row mx-0 d-flex justify-content-between">
                    {
                        product.inStock > 0
                        ? <h6 className="text-info">In Stock: {product.inStock}</h6>
                        : <h6 className="text-danger">Out Stock</h6>
                    }

                    <h6 className="text-danger">Sold: {product.sold}</h6>
                </div>

                <p className="my-2 product-desc">{product.description}</p>
              
                    { auth.user && auth.user.role === 'admin' ? "" :
                        <div className="row justify-content-between mx-0">
                        <button type="button" className="cart-btn btn btn-info d-block my-3 px-5"
                            disabled={ product.inStock === 0 ? true : false }
                            onClick={ () => { dispatch( addToCart( product, cart ) ); setClicked( true ); } } >
                            
                            { clicked ? "Item in Cart" : "Add to Cart" }
                             <i className="fa fa-cart-plus pl-2"></i>
                        </button>
                         <Link href="/cart">
                            <button data-hover='View Cart' type="button" className="slide btn d-block my-3 px-5"  
                                style={ { background: '#f582ae'} }>
                          
                            <div> <i className="fa fa-shopping-cart"></i></div>
                            </button>
                                
                        </Link>
                        </div>
                    }

                </div>
                </div> */}

        <div className="product_box prodcut_detail_page">
          <div className="product-img-box">
            <div className="prod_big_thumb">
              <img
                src={product.images[tab].url}
                alt={product.images[tab].url}
                className=""
              />

              {product.images.map((img, index) => (
                <span className="small_thumb">
                  <img
                    key={index}
                    src={img.url}
                    alt={img.url}
                    className={`img-thumbnail rounded ${isActive(index)}`}
                    onClick={() => setTab(index)}
                  />
                </span>
              ))}
            </div>
          </div>

          <div class="product-detail-box">
            <h1>{product.title}</h1>
            <div class="row">
              <div class="col-lg-12">
                <div class="like_view">
                  <a href="#" class="art">
                    <i class="fa fa-picture-o" aria-hidden="true"></i> Art
                  </a>
                  <a href="#" class="view">
                    <i class="fa fa-eye" aria-hidden="true"></i> 250
                  </a>
                  <a href="#" class="like">
                    <i class="fa fa-heart" aria-hidden="true"></i> 18
                  </a>
                </div>

                <div class="review">
                  <i class="fa fa-star" aria-hidden="true"></i>{' '}
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>{' '}
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>{' '}
                  <span class="rev_txt">
                    Based on ( <b>2 reviews</b> )
                  </span>{' '}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 prduct_data">
                <div class="naming">
                  {' '}
                  <span className="labels">Seller:</span> {product.seller}
                </div>
                <div class="naming">
                  <span className="labels">Price:</span> ${product.price}
                </div>

                <div className="stocks">
                  {' '}
                  {product.inStock > 0 ? (
                    <div className="naming">
                      <span className="labels">In Stock:</span>{' '}
                      {product.inStock}
                    </div>
                  ) : (
                    <div className="naming">Out Stock</div>
                  )}
                  <div className="naming">
                    <span className="labels">Sold:</span> {product.sold}
                  </div>
                </div>

                <p class="brief">{product.description} </p>
              </div>
            </div>

            <div class="row cart-row">
              {auth.user && auth.user.role === 'admin' ? (
                ''
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={product.inStock === 0 ? true : false}
                    onClick={() => {
                      dispatch(addToCart(product, cart));
                      setClicked(true);
                    }}
                  >
                    {clicked ? 'Item in Cart' : 'Add to Cart'}
                    <i className="fa fa-cart-plus pl-2"></i>
                  </button>
                  <Link href="/cart">
                    <button
                      data-hover="View Cart"
                      type="button"
                      className="btn btn-primary"
                    >
                      <div>
                        {' '}
                        Buy Now <i className="fa fa-shopping-cart"></i>{' '}
                      </div>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <AllScript />
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  const productItem = res.product;
  // server side rendering

  return {
    props: { productItem }
  };
}

export default DetailProduct;
