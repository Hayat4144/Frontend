import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function OrderSkeleton() {
    return (
        <Fragment>
            <div className='w-full h-screen my-10 mx-5 md:mx-auto md:w-[80%]'>
                <div className="order_history_box  my-10
                  shadow-sm rounded-md">
                    <div className='order_history_box_header flex items-center justify-between '>
                        <div className='order_id'>
                            <Skeleton height={40} width={300} />
                        </div>
                        <div className='order_totalPrice'>
                            <Skeleton height={40} width={300} />
                        </div>
                        <div className='order_date hidden md:block'>
                            <Skeleton height={40} width={300} />
                        </div>
                    </div>
                    <div className="order_products_display_area my-5 mx-5">
                        <div className="order_product my-5 pb-5">
                            <div className='product_image_container flex space-x-6'>
                                <Skeleton width={200} height={100}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Skeleton>

                </Skeleton>
            </div>
        </Fragment>
    )
}
