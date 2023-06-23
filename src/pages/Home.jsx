import React, { Fragment, Suspense, lazy } from "react";
import NavbarSkeleton from "../Skeleton/NavbarSkeleton";
const Navbar = lazy(() => import("../layout/Nav/Navbar"));
const Footer = lazy(() => import('../layout/Footer'))
const HomeSlider = lazy(() => import('../layout/Home/HomeSlider'))
const SampleProducts = lazy(() => import('../layout/SampleProducts'))
const CategorySlider = lazy(() => import('../layout/Home/CategorySlider'))
import SampleProductSkeleton from '../Skeleton/SampleProductSkeleton'
import SlidersProducts from '../shop/SlidersProducts'

export default function Home() {
  return (
    <Fragment>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      <main>
        <div className="md:hidden px-3 my-3">
          <Suspense fallback={'loading'}>
            <CategorySlider />
          </Suspense>
        </div>
        <Suspense fallback={<SampleProductSkeleton />}>
          <HomeSlider />
        </Suspense>
        <section className="bg-gray-200 w-full h-full px-2 pb-5">
          <SlidersProducts />
          <div className="bg-white mb-5 py-5">
            <h4 className="text-xl font-bold mx-5">
              Top Earings Bali
            </h4>
            <Suspense fallback={<SampleProductSkeleton />}>
              <SampleProducts name="Bali" />
            </Suspense>
          </div>
          
          <div className="bg-white mb-5 py-5">
            <h4 className="text-xl font-bold mx-5">
            Latest Jhumka designed for collage girl
            </h4>
            <Suspense fallback={<SampleProductSkeleton />}>
              <SampleProducts name="jhumka" />
            </Suspense>
          </div>
        </section>
        <Suspense fallback={<p>loading...</p>}>
            <Footer />
          </Suspense>    
      </main>
    </Fragment>
  );
}
