import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const Signin = lazy(() => import('./Auth/Signin'))
const Signup = lazy(() => import('./Auth/Signup'))
const Cart = lazy(() => import('./shop/Cart/Cart'))
const Address = lazy(() => import('./Accounts/Address'))
const Profile = lazy(() => import('./Accounts/Profile'))
const ChangePassword = lazy(() => import('./Accounts/ChangePassword'))
const AccountContainer = lazy(() => import('./Accounts/AccountContainer'))
const Home = lazy(() => import('./UsableComponent/Home'))
const NotFound = lazy(() => import('./UsableComponent/NotFound'))
const ProductPage = lazy(() => import('./shop/ProductPage'))
const Products = lazy(() => import('./shop/AllProducts'))
const Checkout = lazy(() => import('./shop/Checkout/Checkout'))
const ConfrimOrder = lazy(() => import('./shop/Checkout/ConfrimOrder'))
const ProductSearch = lazy(() => import('./shop/ProductSearch'))
const ProductByCategory = lazy(() => import('./shop/Category/ProductByCategory'))
const Payment = lazy(() => import('./shop/Checkout/Payment'))
const UserOrdersHistory = lazy(() => import('./Accounts/Order'))
const ForgetPassword = lazy(() => import('./Accounts/ForgetPassword'))
const ForgetPasswordRequest = lazy(() => import('./Accounts/RequestForgetpassword'))
const EmailChangeRequest = lazy(() => import('./Accounts/EmailchangeRequest'))
const VerifyEmailChnage = lazy(() => import('./Accounts/VerifyEmailChnage'))
const Term_Conditions = lazy(() => import('./UsableComponent/Term_Conditions'))
import ProductPageSkeleton from "./Skeleton/ProductPageSkeleton";
import WholeProductpage from "./Skeleton/WholeProductpage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const jwt_token = Cookies.get('token');
    if (jwt_token === undefined || jwt_token === null) {
      dispatch({ type: "LOGOUT" })
    }
  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Suspense fallback={<p>laoding</p>}><Home /></Suspense>} />
          <Route path="/V2/user/cart" element={<Suspense fallback={<p>laoding</p>}><Cart /></Suspense>} />
          <Route path="/V2/shop/checkout" element={<Suspense fallback={<p>laoding</p>}><Checkout /></Suspense>} />
          <Route path="V2/shop/checkout/confirm/order" element={<Suspense fallback={<p>laoding</p>}><ConfrimOrder /></Suspense>} />
          <Route path="/V2/shop/products/category" element={<Suspense fallback={<p>laoding</p>}><ProductByCategory /></Suspense>} />
          <Route path="/V2/shop/checkout/payment" element={<Suspense fallback={<p>laoding</p>}><Payment /></Suspense>} />
          <Route path="/V2/user/account/order/history" element={<Suspense fallback={<p>laoding</p>}><UserOrdersHistory /></Suspense>} />
          <Route path="/v2/auth/user/change/password/link/verify/:user/:token" element={<Suspense fallback={<p>laoding</p>}><ForgetPassword /></Suspense>} />
          <Route path="/V2/forget/password/request" element={<Suspense fallback={<p>laoding</p>}><ForgetPasswordRequest /></Suspense>} />
          <Route path="/V2/email/change/request" element={<Suspense fallback={<p>laoding</p>}><EmailChangeRequest /></Suspense>} />
          <Route path="/v2/auth/user/change/email/link/verify/:user/:token" element={<Suspense fallback={<p>laoding</p>}><VerifyEmailChnage /></Suspense>} />
          <Route path="/V2/user/account" element={<Suspense fallback={<p>laoding</p>}><AccountContainer /></Suspense>} />
          <Route path="/V2/account/profile" element={<Suspense fallback={<p>laoding</p>}><Profile /></Suspense>} />
          <Route path="/V2/account/address" element={<Suspense fallback={<p>laoding</p>}><Address /></Suspense>} />
          <Route path="/V2/account/change/password" element={<Suspense fallback={<p>laoding</p>}><ChangePassword /></Suspense>} />
          <Route path="/V2/auth/sign_up" element={<Suspense fallback={<p>laoding</p>}><Signup /></Suspense>} />
          <Route path="/V2/auth/sign_in" element={<Suspense fallback={<p>laoding</p>}><Signin /></Suspense>} />
          <Route path="/V2/shop/product/:id/:name/:category" element={<Suspense fallback={<WholeProductpage />}><ProductPage /></Suspense>} />
          <Route path="/V2/shop/search" element={<Suspense fallback={<p>laoding</p>}><ProductSearch /></Suspense>} />
          <Route path="/V2/shop/products" element={<Suspense fallback={<p>laoding</p>}><Products /></Suspense>} />
          <Route path="/terms-and-conditions" element={<Suspense fallback={<p>loading..</p>}>
            <Term_Conditions />
          </Suspense>} />
          <Route path='*' element={<Suspense fallback={<p>laoding</p>}><NotFound /></Suspense>} />
        </Routes>
      </Router>

      
      <ToastContainer />
    

    </div>
  )
}

export default App
