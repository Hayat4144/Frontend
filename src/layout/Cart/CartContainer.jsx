import React, { Fragment, Suspense, lazy } from "react";
import CartHeader from "./CartHeader";
import CartIemSkeleton from "../../Skeleton/CartIemSkeleton";
import CartSummarySkelton from "../../Skeleton/CartSummarySkelton";
const CartItem = lazy(() => import("./CartItem"));
const CheckoutSummary = lazy(() => import("./CheckoutSummary"));

export default function CartContainer() {
  return (
    <Fragment>
      <CartHeader />
      <main className="grid grid-cols-1 md:grid-cols-3 mx-2 gap-10 md:gap-5 ">
        <Suspense fallback={<CartIemSkeleton />}>
          <CartItem />
        </Suspense>
        <Suspense fallback={<CartSummarySkelton />}>
          <CheckoutSummary />
        </Suspense>
      </main>
    </Fragment>
  );
}
