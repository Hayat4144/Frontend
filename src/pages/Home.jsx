import React, { Fragment, Suspense, lazy } from "react";
import NavbarSkeleton from "../Skeleton/NavbarSkeleton";
const Navbar = lazy(() => import("../layout/Nav/Navbar"));
const Footer = lazy(() => import('../layout/Footer'))
const HomeSlider = lazy(() => import('../layout/Home/HomeSlider'))
const SampleProducts = lazy(() => import('../layout/SampleProducts'))
import SampleProductSkeleton from '../Skeleton/SampleProductSkeleton'

export default function Home() {
  return (
    <Fragment>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      <main className="bg-gray-200">
        <Suspense fallback={<SampleProductSkeleton />}>
          <HomeSlider />
        </Suspense>
        <section className="sample_product_show bg-white mx-2">
          <div className="product_show_title px-5 py-5">
            <h4 className="text-xl font-bold hover:text-indigo-700">
              Top shoes for Men and women
            </h4>
          </div>
          <Suspense fallback={<SampleProductSkeleton />}>
            <SampleProducts name="shoes" />
          </Suspense>
        </section>
        <section className="sample_product_show bg-white mx-2">
          <div className="product_show_title px-5 py-5">
            <h4 className="text-xl font-bold hover:text-indigo-700">
              Latest Jhumka designed for collage girl
            </h4>
          </div>
          <Suspense fallback={<SampleProductSkeleton />}>
            <SampleProducts name="jhumka" />
          </Suspense>
        </section>
        <div className="footer_box">
          <Suspense fallback={<p>loading...</p>}>
            <Footer />
          </Suspense>
        </div>
      </main>
    </Fragment>
  );
}
