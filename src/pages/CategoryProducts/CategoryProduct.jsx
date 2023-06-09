import React, { Fragment, Suspense, lazy } from 'react'
import NavbarSkeleton from '../../Skeleton/NavbarSkeleton'
const Navbar = lazy(() => import('../../layout/Nav/Navbar'))

export default function CategoryProduct() {
    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            CategoryProducts
        </Fragment>
    )
}
