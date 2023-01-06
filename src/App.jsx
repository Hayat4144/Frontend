import Signin from "./Auth/Signin"
import Signup from "./Auth/Signup"
import NotFound from "./UsableComponent/NotFound"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./UsableComponent/Home"
import Profile from "./Accounts/Profile";
import Address from "./Accounts/Address";
import ChangePassword from "./Accounts/ChangePassword";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductPage from "./shop/ProductPage";
import ProductSearch from "./shop/ProductSearch";
import Products from "./shop/AllProducts";
import Navbar from "./UsableComponent/Navbar";
import Cart from "./shop/Cart/Cart";
import AccountContainer from "./Accounts/AccountContainer";
import Checkout from "./shop/Checkout/Checkout";
import ConfrimOrder from "./shop/Checkout/ConfrimOrder";
import { lazy, Suspense } from "react";
import ProductByCategory from "./shop/Category/ProductByCategory";
const Payment = lazy(() => import('./shop/Checkout/Payment'))

function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/V2/user/cart" element={<Cart />} />
          <Route path="/V2/shop/checkout" element={<Checkout />} />
          <Route path="V2/shop/checkout/confirm/order" element={<ConfrimOrder />} />
          <Route path="/V2/shop/products/category" element={<ProductByCategory />} />
          <Route path="V2/shop/checkout/payment" element={<Suspense fallback={<p>laoding</p>}><Payment /></Suspense>} />
          <Route path="/V2/user/account" element={<AccountContainer />} />
          <Route path="/V2/account/profile" element={<Profile />} />
          <Route path="/V2/account/address" element={<Address />} />
          <Route path="/V2/account/change/password" element={<ChangePassword />} />
          <Route path="/V2/auth/sign_up" element={<Signup />} />
          <Route path="/V2/auth/sign_in" element={<Signin />} />
          <Route path="/V2/shop/product/:id/:name" element={<ProductPage />} />
          <Route path="/V2/shop/search" element={<ProductSearch />} />
          <Route path="/V2/shop/products" element={<Products />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
