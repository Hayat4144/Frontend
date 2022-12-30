import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, } from 'react-router-dom'

export default function AddressDetails() {
    const { user_address } = useSelector(state => state.Address)
    const address_data = [user_address]
    return (
        <Fragment>
            <div className={`IsAddressExist`}>
                <div className='address_data py-2 px-4 bg-indigo-700'>
                    <h1 className='Delivary_data text-xl font-bold text-white'>Shipping Address</h1>
                </div>
                {address_data.map((item, index) => (
                    <div className="address-info mt-3 px-2  md:flex md:items-center md:justify-between" key={index}>
                        <div className="mb-5">
                            <span>{item.Street},</span>
                            <span>{item.Area} ,</span>
                            <span>{item.city} ,</span>
                            <span>{item.State} -</span>
                            <span>{item.pincode}</span>
                        </div>
                        <Link to={'/V2/shop/checkout/'}
                            className='py-2 border border-gray-300
                                hover:bg-indigo-700 hover:text-white px-5 mb-5
                                hover:border-none active:bg-indigo-800'>
                            Change Address
                        </Link>
                    </div>
                ))}
            </div>

        </Fragment>
    )
}
