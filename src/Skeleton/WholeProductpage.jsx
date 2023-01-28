import React, { Fragment } from 'react'
import NavbarSkeleton from './NavbarSkeleton'
import ProductPageSkeleton from './ProductPageSkeleton'

export default function WholeProductpage() {
  return (
    <Fragment>
        <NavbarSkeleton />
        <ProductPageSkeleton />
    </Fragment>
  )
}
