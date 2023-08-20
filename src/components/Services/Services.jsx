import React, { useEffect, useState } from 'react'
import "./Services.css"

const Services = () => {

    const [product, setProduct] =  useState([]);
    const [pages, setPages] = useState(1);

    const productJson = async () =>{
        const res = await fetch(`https://dummyjson.com/products?limit=95`);
        const data = await res.json();
        setProduct(data.products);
    }

    console.log(product.length);

    useEffect(()=>{
        productJson();
    },[])

    let handlePage = (selectedPage) =>{
        if(selectedPage>=1 && selectedPage<=Math.ceil(product.length/10)){
            setPages(selectedPage);
        }
    }

  return (
    <>
          <div className='allProducts'>
              {
                  product.slice(pages*10 - 10, pages*10).map((singleProduct) => {
                      return (
                          <div className='singleItem'>
                              <img src={singleProduct.thumbnail} alt={singleProduct.title} />
                              <p style={{textAlign:"center"}}>    {singleProduct.title}   </p>
                          </div>
                      )
                  })
              }
          </div>

          <div className='pagination'>
              <span onClick={()=>{handlePage(pages-1)}}>◀️</span>
                    {
                        [...Array(Math.ceil(product.length/10))].map((_,i)=>{
                            return(
                            
                            <span className={pages===i+1 ? "selectedPage": ""} onClick={()=>{handlePage(i+1)}}> {i+1}</span>

                            )
                            
                        })
                    }
              <span onClick={()=>{handlePage(pages+1)}}>▶️</span>
          </div>
    </>
  )
}

export default Services