import React, { Fragment, Suspense, lazy } from "react";
import CartHeader from "./CartHeader";
const CartItem = lazy(() => import("./CartItem"));
const Footer = lazy(()=> import('../Footer'))
const CheckoutSummary = lazy(() => import("./CheckoutSummary"));

export default function CartContainer() {
  return (
    <Fragment>
      <CartHeader />
      <main className="grid grid-cols-1 md:grid-cols-3 mx-2 gap-10 md:gap-5 ">
        <Suspense fallback={"loading"}>
          <CartItem />
        </Suspense>
        <Suspense fallback={"loading"}>
          <CheckoutSummary />
        </Suspense>
      </main>
      <Suspense fallback={"loading"}>
        <Footer />
      </Suspense>
    </Fragment>
  );
}
