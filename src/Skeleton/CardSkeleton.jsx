import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'

export default function CardSkeleton() {
    return (
        <Fragment>
            <div className='card_container grid grid-cols-1 md:grid-cols-2
         lg:grid-cols-3 gap-5 my-5 mx-2 md:mx-5 lg:mx-10'>
                {[1, 2, 3].map((index) => (
                    <Skeleton
                        key={index}
                        className='shadow-md h-28 px-5 py-2  
                        cursor-pointer' />
                ))}
            </div>
        </Fragment>
    )
}
