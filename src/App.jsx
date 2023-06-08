import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
const Signin = lazy(() => import("./Auth/Signin"));
const Signup = lazy(() => import("./Auth/Signup"));
const Cart = lazy(() => import("./pages/Cart"));
const Address = lazy(() => import("./pages/Accounts/Address"));
const Profile = lazy(() => import("./pages/Accounts/Profile"));
const ChangePassword = lazy(() => import("./pages/Accounts/ChangePassword"));
const AccountContainer = lazy(() =>
  import("./pages/Accounts/AccountContainer")
);
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductPage = lazy(() => import("./pages/Products/ProductPage"));
const Products = lazy(() => import("./shop/AllProducts"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const ConfrimOrder = lazy(() => import("./pages/Checkout/ConfrimOrder"));
const ProductSearch = lazy(() => import("./pages/ProductSearch"));
const ProductByCategory = lazy(() =>
  import("./shop/Category/ProductByCategory")
);
const Payment = lazy(() => import("./pages/Checkout/Payment"));
const UserOrdersHistory = lazy(() => import("./pages/Accounts/Order"));
const ForgetPassword = lazy(() => import("./pages/Accounts/ForgetPassword"));
const ForgetPasswordRequest = lazy(() =>
  import("./pages/Accounts/RequestForgetpassword")
);
const EmailChangeRequest = lazy(() =>
  import("./pages/Accounts/EmailchangeRequest")
);
const VerifyEmailChnage = lazy(() =>
  import("./pages/Accounts/VerifyEmailChnage")
);
const Term_Conditions = lazy(() => import("./pages/Term_Conditions"));
import WholeProductpage from "./Skeleton/WholeProductpage";
import ProtectedRoutes from "./global/ProtectedRoutes";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CartSkeleton from "./Skeleton/CartSkeleton";
import SigninSkeleton from "./Skeleton/SigninSkeleton";
const OrderSuccess = lazy(() => import("./Components/OrderSuccess"));
const SessionExpired = lazy(() => import("./Components/SessionExpired"));

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<p>laoding</p>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/V2/user/cart"
            element={
              <Suspense fallback={<CartSkeleton />}>
                <Cart />
              </Suspense>
            }
          />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/V2/shop/checkout"
              element={
                <Suspense fallback={<p>laoding</p>}>
                  <Checkout />
                </Suspense>
              }
            />
            <Route
              path="V2/shop/checkout/confirm/order"
              element={
                <Suspense fallback={<p>laoding</p>}>
                  <ConfrimOrder />
                </Suspense>
              }
            />

            <Route
              path="/V2/shop/checkout/payment"
              element={
                <Suspense fallback={<p>laoding</p>}>
                  <Payment />
                </Suspense>
              }
            />

            <Route
              path="/V2/user/account/order/history"
              element={
                <Suspense fallback={<p>laoding</p>}>
                  <UserOrdersHistory />
                </Suspense>
              }
            />

            <Route
              path="/v2/auth/user/change/password/link/verify/:user/:token"
              element={
                <Suspense fallback={<p>laoding</p>}>
                  <ForgetPassword />
                </Suspense>
              }
            />
            <Route
              path="/V2/forget/password/request"
              element={
                <Suspense fallback={<p>laoding</p>}>
                  <ForgetPasswordRequest />
                </Suspense>
              }
            />

            <Route
              path="/V2/email/change/request"
              element={
                <Suspense fallback={<p>laoding</p>}>
                  <EmailChangeRequest />
                </Suspense>
              }
            />
            <Route
              path="/v2/auth/user/change/email/link/verify/:user/:token"
              element={
                <Suspense fallback={<p>laoding</p>}>
                  <VerifyEmailChnage />
                </Suspense>
              }
            />

            <Route
              path="/V2/account/profile"
              element={
                <Suspense fallback={<p>laoding</p>}>
                  <Profile />
                </Suspense>
              }
            />

            <Route
              path="/V2/account/address"
              element={
                <Suspense fallback={<p>laoding</p>}>
                  <Address />
                </Suspense>
              }
            />
            <Route
              path="/V2/account/change/password"
              element={
                <Suspense fallback={<p>laoding</p>}>
                  <ChangePassword />
                </Suspense>
              }
            />

            <Route
              path="/v2/order/response"
              element={
                <Suspense fallback={"loading..."}>
                  <OrderSuccess />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/checkout/session-expired"
            element={
              <Suspense fallback={"loading..."}>
                <SessionExpired />
              </Suspense>
            }
          />
          <Route
            path="/V2/shop/products/category"
            element={
              <Suspense fallback={<p>laoding</p>}>
                <ProductByCategory />
              </Suspense>
            }
          />

          <Route
            path="/V2/user/account"
            element={
              <Suspense fallback={<p>laoding</p>}>
                <AccountContainer />
              </Suspense>
            }
          />
          <Route
            path="/V2/auth/sign_up"
            element={
              <Suspense fallback={<SigninSkeleton />}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/V2/auth/sign_in"
            element={
              <Suspense fallback={<SigninSkeleton />}>
                <Signin />
              </Suspense>
            }
          />
          <Route
            path="/V2/shop/product/:id/:name/:category"
            element={
              <Suspense fallback={<WholeProductpage />}>
                <ProductPage />
              </Suspense>
            }
          />
          <Route
            path="/V2/shop/search"
            element={
              <Suspense fallback={<p>laoding</p>}>
                <ProductSearch />
              </Suspense>
            }
          />
          <Route
            path="/V2/shop/products"
            element={
              <Suspense fallback={<p>laoding</p>}>
                <Products />
              </Suspense>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <Suspense fallback={<p>loading..</p>}>
                <Term_Conditions />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<p>laoding</p>}>
                <NotFound />
              </Suspense>
            }
          />
          <Route
            path="/v2/privacy/policy"
            element={
              <Suspense fallback={"loading..."}>
                <PrivacyPolicy />
              </Suspense>
            }
          />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
