import Link from 'next/link'
import { useContext, useState } from 'react'
import { DataContext } from '@store/GlobalState'
import { addToCart } from '@store/Actions'
import PoUp from '@components/team/PoUp';

const ProductItem = ({product, handleCheck}) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state
    const [ clicked, setClicked ] = useState( false )

    return(

            <>
                <div className="pro_img">
                  {' '}
                  
                  <a href="#prodQuickview" className="quickpoup">
                    <img src={ product.images[ 0 ].url } alt={ product.images[ 0 ].url } />
                  </a>{' '}
                  
                  <span className="size_option">36d 12h 13m 18s</span>{' '}
                </div>
                <div className="pro_bottom">
                  <div className="name_dots">
                    <h4> {product.title} </h4>
                    <a href="#">
                      <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </a>{' '}
                  </div>
                  <div className="stars">
                    {' '}
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>{' '}
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>{' '}
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>{' '}
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>{' '}
                    <a href="#">
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </a>
                    <div className="price"> ${product.price}</div>
                  </div>
                </div>
                <div className="likes">
                  <a href="#">
                    <i className="fa fa-heart" aria-hidden="true"></i> 80{' '}
                  </a>
                </div>

                <PoUp product={product}/>


            </>    



    )


}


export default ProductItem