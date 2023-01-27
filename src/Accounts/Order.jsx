import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { lazy } from 'react'
const Navbar = lazy(() => import('../UsableComponent/Navbar'))
const Footer = lazy(() => import('../UsableComponent/Footer'))
import NavbarSkeleton from '../Skeleton/NavbarSkeleton'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { FcProcess } from 'react-icons/fc'
import NoOrderImage from '../assets/images/NoOrder.webp'
import OrderLoading from '../Skeleton/OrderLoading'

export default function Order() {
    //  -------------------- All states --------------------- //
    const [Orderdata, setOrderdata] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { IsLogdin } = useSelector(state => state.Signin)
    const Location = useLocation();
    const navigate = useNavigate();

    // ------------------------ check is user Logdin or not -------------- //

    useEffect(() => {
        !IsLogdin ? navigate({
            pathname: "/V2/auth/sign_in",
            search: `?${createSearchParams({ 'next': Location.pathname })}`
        }) : null;
    }, [])


    //  ---------------------- fetch order of user --------------------- //
    const FetchOrderHistory = async () => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/v3/api/user/orders/history`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
            .then(async res => {
                const { error, data } = await res.json();
                if (res.status !== 200) {
                    setIsLoading(false);
                    return;
                }
                //  ------------------- make the human readable date formate and push in the existing data --------- //
                const result = data.map(item => {
                    const date = new Date(item.created_at);
                    const updateData = new Date(item.updated_at)
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    const humanReadableDate = date.toLocaleDateString('en-US', options);
                    const updated_at = date.toLocaleDateString('en-us', options)
                    return { ...item, created_at: humanReadableDate, updated_at }

                })

                //  -------------------- iterating over data to get varient and push into an array for fetching products ----------- //
                let varients = []
                result.forEach(element => {
                    element.products.forEach(vairentitem => {
                        varients.push(vairentitem.varientId)
                    });
                });
                setIsLoading(false)
                setOrderdata(result)
            }).catch(err => console.log(err))
    }
    useEffect(() => {
        FetchOrderHistory()
    }, [])


    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <section className="order_history_container my-10 mx-5 md:mx-auto md:w-[80%]">
                {
                    isLoading ? <section className='w-full h-screen'>
                        <OrderLoading />
                    </section> : Orderdata.length > 0 ?
                        Orderdata.map(item => (
                            <div key={item._id} className="order_history_box border my-10 border-gray-300 shadow-sm rounded-md">
                                <div className='order_history_box_header border-b border-gray-300 flex justify-between items-center px-5 h-24 py-10 '>
                                    <div className='order_id'>
                                        <h3 className='orderId_text font-extrabold'>Order Id</h3>
                                        <span className='order_number text-gray-600'>{item._id}</span>
                                    </div>
                                    <div className='order_totalPrice'>
                                        <h3 className='ordertotalPrice_text font-extrabold'>Total Amount</h3>
                                        <span className='order_totalpriceValue text-gray-600'>{item.totalPrice}</span>
                                    </div>
                                    <div className='order_date hidden md:block'>
                                        <h3 className='orderDate_text font-extrabold'>Order Date</h3>
                                        <span className='order_OrderDate text-gray-600'>{item.created_at}</span>
                                    </div>
                                </div>
                                <div className="order_products_display_area my-5 mx-5">
                                    {item.products.map((varient, index) => (
                                        <div className="order_product border-b border-gray-300 my-5 pb-5" key={index}>
                                            <div className='product_image_container flex space-x-6'>
                                                <figure className='w-28 sm:w-56 bg-red-500'>
                                                    <img src={varient.varientId.product.assets.images[0]} alt="product_pic"
                                                        className='h-28 rounded-sm' />
                                                </figure>
                                                <div className='product_name_description px-2'>
                                                    <div className='product_name_price sm:flex justify-between items-center'>
                                                        <h2 className='product_name text-xl font-bold capitalize'>{varient.varientId.product.name}</h2>
                                                        <h2 className='product_varient_price text-xl font-bold md:space-x-5 space-x-2'>
                                                            <span className='currency_symbol'>Rs</span>
                                                            <span className='amount_value'>{varient.varientId.price}</span>
                                                        </h2>
                                                    </div>
                                                    <div className='product_description hidden sm:block'>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore iste sapiente earum nobis cum?
                                                        Placeat, veniam dolorem adipisci aliquam aperiam similique vel necessitatibus!
                                                    </div>
                                                </div>

                                            </div>
                                            <section className='delivary_info my-2'>
                                                <div className='order_status flex items-center space-x-2'>
                                                    {item.status == 'delivered' ?
                                                        <div className='flex space-x-3 items-center'>
                                                            <BsFillCheckCircleFill className='text-green-900 text-xl' />
                                                            <span className='status_text'> Deliverd on </span>
                                                            <h1 className='status'>
                                                                {item.updated_at}
                                                            </h1>
                                                        </div> :
                                                        <div className='flex space-x-3 items-center'>
                                                            <FcProcess className='text-2xl' />
                                                            <span className='status_text'>Processing </span>
                                                        </div>
                                                    }

                                                </div>
                                            </section>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )) :
                        // ---------------------------- if order not found ----------------------- //
                        <article className='order_not_found lg:flex  md:justify-center lg:items-center w-full h-screen'>
                            <div className='order_not_found_image'>
                                <figure className=''>
                                    <img src={NoOrderImage} alt='orderr_not_found_pic' />
                                </figure>
                            </div>
                            <div className='order_not_found_info'>
                                <h3 className='order_not_found_text text-xl font-bold'>
                                    It seeems like you have not order anything yet on our website.
                                </h3>
                                <div className='buttons my-10 w-full space-y-5 md:space-y-0 md:flex
                                items-center md:space-x-4'>
                                    <button
                                        className="w-full border border-gray-300
                                    py-2 rounded-md text-center cursor-pointer hover:text-white
                                    hover:bg-sky-500 hover:border-none focus:outline-none shadow-lg
                                    focus:bg-sky-500 focus:text-white focus:border-none 
                                    focus:shadow-lg capitalize">
                                        explore now
                                    </button>
                                    <button
                                        className="w-full border border-gray-300
                                    py-2 rounded-md text-center cursor-pointer text-white
                                  bg-sky-500 hover:border hover:border-sky-500 focus:outline-none hover:shadow-lg
                                    focus:shadow-lg capitalize hover:bg-transparent hover:text-black">
                                        Order now
                                    </button>
                                </div>
                            </div>
                        </article>
                }

            </section>
            <div className='my-10 mb-0 w-full'>
                <Suspense fallback={<p>loading....</p>}>
                    <Footer />
                </Suspense>
            </div>

        </Fragment>

    )
}
