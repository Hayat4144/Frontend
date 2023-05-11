import React, { Fragment, lazy, Suspense } from "react";
import NavbarSkeleton from "../Skeleton/NavbarSkeleton";
const CartContainer  = lazy(()=>import('../layout/Cart/CartContainer'))
const NoCartItemFound = lazy(()=> import('../layout/Cart/NoCartItemFound'))
const Navbar = lazy(() => import("../layout/Navbar"));
const Footer = lazy(() => import("../layout/Footer"));
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const Cartdata = useSelector((state) => state.Cart.productItems);
  return (
    <Fragment>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      <div className="cart_container w-full mt-10 mb-20">
        {Cartdata.length == 0 ? <Suspense fallback="loading">
            <NoCartItemFound />
        </Suspense> : <Suspense fallback="loading"><CartContainer/></Suspense>}
      </div>
    </Fragment>
  );
}
