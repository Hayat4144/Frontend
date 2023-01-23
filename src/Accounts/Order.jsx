import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { lazy } from 'react'
const Navbar = lazy(() => import('../UsableComponent/Navbar'))
const Footer = lazy(() => import('../UsableComponent/Footer'))
import NavbarSkeleton from '../Skeleton/NavbarSkeleton'
import { useNavigate,createSearchParams ,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Order() {
    //  -------------------- All states --------------------- //
    const [Orderdata, setOrderdata] = useState([])
    const [produceVarient, setProduceVarient] = useState([])
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
        await fetch('http://localhost:5000/v3/api/user/orders/history', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
            .then(async res => {
                const { error, data } = await res.json() ;
                if(res.status !== 200){
                    setIsLoading(false);
                    return ;
                } 
                //  ------------------- make the human readable date formate and push in the existing data --------- //
                const result = data.map(item => {
                    const date = new Date(item.created_at);
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    const humanReadableDate = date.toLocaleDateString('en-US', options);
                    return { ...item, created_at: humanReadableDate }

                })

                //  -------------------- iterating over data to get varient and push into an array for fetching products ----------- //
                let varients = []
                result.forEach(element => {
                    element.products.forEach(vairentitem => {
                      varients.push(vairentitem.varientId)
                    });
                });
                setOrderdata(result)

                //  ----------- fetch products data --------------------- //
                await fetch('http://localhost:5000/v4/api/get/products/varients/order/history', {
                    method:"POST",
                    headers:{
                        'Content-Type':"application/json"
                    },
                    body:JSON.stringify({varients}),
                    credentials:"include"
                }).then(async response=>{
                    const result = await response.json();
                    if(response.status !== 200) return setIsLoading(false)
                    setProduceVarient(result.data)
                    setIsLoading(false)
                    
                }).catch(error=> console.log(error))

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
            <section className="order_history_container my-10 mx-10">
                {
                  isLoading ?  <p>loading....</p>:  Orderdata.length > 0 ?
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
                                    <div className='order_date'>
                                        <h3 className='orderDate_text font-extrabold'>Order Date</h3>
                                        <span className='order_OrderDate text-gray-600'>{item.created_at}</span>
                                    </div>
                                </div>
                            </div>
                        )) : <p>no order history</p> 
                }

            </section>
            Order page is here
            <div className='my-10 mb-0'>
                <Suspense fallback={<p>loading....</p>}>
                    <Footer />
                </Suspense>
            </div>

        </Fragment>

    )
}
