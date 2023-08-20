import React, {useState, useEffect} from 'react'
import "./Products.css"

const Products = () => {

    const [pages, setPages] = useState(1);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await fetch(`https://dummyjson.com/products?limit=100`);
        const data = await res.json();
        setProducts(data.products);
      //  console.log(data.products);
    }

    console.log(products)

    useEffect(()=>{
        fetchProducts();
    },[])

    let handlePagination = (selectedPage) =>{
        if(selectedPage>=1 && selectedPage<=products.length/10 && selectedPage !== pages){
            setPages(selectedPage);
        }
    }

  return (
    <>
    
    <h1>Products List</h1>

          <div className='allProduct'>
              {products.slice(pages * 10 - 10, pages * 10).map((singleItem) => {
                  return (
                      <div className='singleProduct' key={singleItem.id}>
                          <img src={singleItem.thumbnail} alt={singleItem.id} />
                          <p style={{ textAlign: "center" }}>{singleItem.title}</p>
                      </div>
                  )
              })}
          </div>

          <div className='pagination'>
              <span onClick={() => { handlePagination(pages - 1) }}>◀️</span>
              {
                  [...Array(products.length / 10)].map((_, i) => {
                      return (
                          <span className={pages === i + 1 ? "PageSelected" : ""} onClick={() => { handlePagination(i + 1) }}>
                              {i + 1}
                          </span>
                      )
                  })
              }
              <span onClick={() => { handlePagination(pages + 1) }}>▶️</span>
          </div>

    </>
  )
}

export default Products