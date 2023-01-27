import React, { Fragment } from 'react'

export default function OrderLoading() {
    return (
        <Fragment>
            <div className='absolute inset-0 w-full h-screen 
            bg-black bg-opacity-30 opacity-100 flex items-center justify-center'>
                <div className="center">
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                </div>
            </div>

        </Fragment>
    )
}
