import React, { Fragment, lazy, Suspense } from 'react'
import AccountContainer from '../Accounts/AccountContainer'
import NavbarSkeleton from '../Skeleton/NavbarSkeleton'
import NotFoundSkeleton from '../Skeleton/NotFoundSkeleton'
import HomeSlider from './HomeSlider'
import Paginations from './Paginations'
const Footer = lazy(() => import('./Footer'))
const Navbar = lazy(() => import('./Navbar'))

export default function Home() {
    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <HomeSlider />
            {/* <AccountContainer /> */}
            <Paginations />
        </Fragment>
    )
}
