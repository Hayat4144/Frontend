import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export default function Customer_also_view(props) {
    const [product_data, setProduct_data] = useState([])

    const navigate = useNavigate();

    const data = async () => {
        const mt = await fetch(`http://localhost:8000/product/api/get_product_by_category/${props.category_name}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        setProduct_data(mt.slice(0, 4))
    }

    useEffect(() => {
        data()
    }, [])


    return (
        <Fragment>
            <div className='top-header-customer-view flex items-center justify-between'>
                <h2 className='page-heading text-indigo-700 font-bold tracking-tight'>Customer also view</h2>
                <h2 className='view-all-content flex items-center space-x-2 hover:text-indigo-800 cursor-pointer tracking-tight'><span className='view_all_text' onClick={() => {
                    navigate(`/V2/shop/all_product/category/${props.category_name}/`)
                }}>View all</span>
                    <BsArrowRight fontSize={'20px'} /></h2>
            </div>
            <section className='feature-product-category grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 mb-24'>
                {
                    props.data.map((item) => (
                        <main className='feature-product-main-container w-full cursor-pointer  mb-5 ' key={item.id} onClick={() => {
                            navigate(`/V2/Shop/product/${item.category_name}/${item.id}`)
                        }}>
                            <figure className='product-image-container shadow-lg rounded-lg my-5 overflow-hidden'>
                                <img
                                    src={item.imagetumbnail}
                                    className='rounded-lg object-cover object-center h-60 w-full hover:scale-125 transition ease-in-out duration-500 ' />
                            </figure>
                            {/* <article className='product-details'>
                                <div className='product-name&price flex items-center justify-between'>
                                    <h2 className='product-name text-xl sm:text-xl tracking-tight  font-bold capitalize leading-4 '>{item.name.length > 20 ? item.name.slice(0, 20) : item.name}{item.name.length > 20 ? '.....' : ''}</h2>
                                    <h2 className='prouduct-price  leading-4 text-xl tracking-tight'> Rs {item.regular_price}</h2>
                                </div>
                            </article> */}
                            <article className='product-details'>
                                <div className='product-name&price flex items-center justify-between'>
                                    <h2 className='product-name text-xl sm:text-xl tracking-tight  font-bold capitalize leading-4 '>DT Product</h2>
                                    <h2 className='prouduct-price  leading-4 text-xl tracking-tight'> Rs 455</h2>
                                </div>
                            </article>

                        </main>
                    ))
                }
            </section>
        </Fragment>
    )
}