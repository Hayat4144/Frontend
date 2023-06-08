import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'

export default function AddressformSkeleton() {
    return (
        <Fragment>
            <div className='border border-gray-300 rounded-md px-5 py-4'>
                <div>
                    <Skeleton />
                    <Skeleton className='h-8' />
                </div>
                <div>
                    <Skeleton />
                    <Skeleton className='h-8' />
                </div>
                <div>
                    <Skeleton />
                    <Skeleton className='h-8' />
                </div>
                <div>
                    <Skeleton />
                    <Skeleton className='h-8' />
                </div>
                <div>
                    <Skeleton />
                    <Skeleton className='h-8' />
                </div>
                <div>
                    <Skeleton />
                    <Skeleton className='h-8' />
                </div>
                <Skeleton  className='h-15'/>
            </div>
        </Fragment>
    )
}
