import React, { Fragment, lazy, Suspense } from 'react'
import NavbarSkeleton from '../Skeleton/NavbarSkeleton'
const Footer = lazy(() => import('./Footer'))
const HomeSlider = lazy(() => import('./HomeSlider'))
const Navbar = lazy(() => import('./Navbar'))
const SampleProducts = lazy(() => import('./SampleProducts'))



export default function Home() {
    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <section className='bg-gray-200'>
                <Suspense fallback={<p>loadding</p>}>
                    <HomeSlider />
                </Suspense>
                <section className='sample_product_show bg-white mx-2'>
                    <div className='product_show_title px-5 py-5'>
                        <h4 className='text-xl font-bold hover:text-indigo-700'>Top shoes for Men and women</h4>
                    </div>
                    <Suspense fallback={<p>loadig....</p>}>
                        <SampleProducts name="shoes" />
                    </Suspense>
                </section>
                <section className='sample_product_show bg-white mx-2'>
                    <div className='product_show_title px-5 py-5'>
                        <h4 className='text-xl font-bold hover:text-indigo-700'>Latest Jhumka designed for collage girl</h4>
                    </div>
                    <Suspense fallback={<p>loadig....</p>}>
                        <SampleProducts name="jhumka" />
                    </Suspense>
                </section>
                <div className='footer_box'>
                    <Suspense fallback={<p>loading...</p>}>
                        <Footer />
                    </Suspense>
                </div >
            </section>

        </Fragment >
    )
}
