import React, {useContext, useEffect} from 'react'
import { dashboardContext } from '../context/DashboardContext'
import { Product, DashboardContextValue } from '../types/types'
import { useParams } from 'react-router-dom'
import "../css/ProductDetail.css"

const ProductDetail = () => {

  const {id} = useParams();  
  const {products, fetchProducts}: DashboardContextValue = useContext(dashboardContext)!;  

  useEffect(() => {
    if (products?.length === 0){
      fetchProducts();
    }
  }, [])
  const product = products?.find((product: Product) => (product.id === Number(id) && product));
  
  return (
    <React.Fragment>
      {
        product &&
        <div className='bloowatch-product__detail-wrapper'>
          <div className='bloowatch-product__image-content'>
            <div className='bloowatch-product__image'>
              <img src={require(`../${product?.image}`)}/>
            </div>
          </div>

          <div className='bloowatch-product__text-detail'>
            <h3>{product?.title}</h3>

            <div className='bloowatch-product__price'>
              ${product?.price}
            </div>
            <div className='bloowatch-product__category'>
              <h4>categories:</h4>
              <p>
                { product?.category.map((category: any) => (`${category} `))}
              </p>
            </div>
            <div className='bloowatch-product__category'>
              <h4>tags:</h4>
              <p>
                { product?.category.map((category: any) => (`${category} `))}
              </p>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default ProductDetail
