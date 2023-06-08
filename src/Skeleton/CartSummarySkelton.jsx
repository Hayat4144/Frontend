import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'

export default function CartSummarySkelton() {
    return (
        <Fragment>
            <Skeleton className='w-full' height={300}/>
        </Fragment>
    )
}
