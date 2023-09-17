import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./routes/Routes.js";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage,
} from "./routes/ShopRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import ShopSettingsPage from "./pages/Shop/ShopSettingsPage";
import ShopAllOrders from "./pages/Shop/ShopAllOrders";
import ShopAllRefunds from "./pages/Shop/ShopAllRefunds";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import ShopOrderDetails from "./pages/Shop/ShopOrderDetails";
import ShopWithDrawMoneyPage from "./pages/Shop/ShopWithDrawMoneyPage";
import ShopInboxPage from "./pages/Shop/ShopInboxPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPages";
import UserInbox from "./pages/UserInbox";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminDashboardProducts from "./pages/AdminDashboardProducts";
import AdminDashboardOrders from "./pages/AdminDashboardOrders";
import AdminDashboardSellers from "./pages/AdminDashboardSellers";
import AdminDashboardUsers from "./pages/AdminDashboardUsers";
import AdminDashboardEvents from "./pages/AdminDashboardEvents";
import AdminDashboardWithdraw from "./pages/AdminDashboardWithdraw";

import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import AdminDashboardTransaction from "./pages/AdminDashboardTransaction";
import ForgotPassword from "./pages/ForgetPasswordPage";
import ShopForgotPassword from "./components/Shop/ShopForgotPassword";
import ResetPassword from "./pages/ResetPasswordPage";
import ShopResetPassword from "./components/Shop/ShopResetPassword";
import CompareProducts from "./pages/CompareProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminCarousel from "./pages/AdminCarousel";
import ShopUpdateProduct from "./pages/Shop/ShopUpdateProduct";
import EditProduct from "./components/Shop/UpdateProduct";
import StatementsPage from "./components/Admin/CreateStatements";
import AdminStatements from "./pages/AdminStatements";
import { getAllStatements } from "./redux/actions/statements";
import AdminDestination from "./pages/AdminDestinations";

const App = () => {
  useEffect(() => {
    Store.dispatch(getAllStatements());
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/compare-products" element={<CompareProducts />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/statements"
          element={
            <ProtectedAdminRoute>
              <AdminStatements />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/shop-login/forgot-password"
          element={<ShopForgotPassword />}
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="shop/reset-password/:token"
          element={<ShopResetPassword />}
        />

        <Route
          path="/checkout"
          element={
            // <ProtectedRoute>
            <CheckoutPage />
            /* </ProtectedRoute> */
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        {/* shop Routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/edit-product/:productId"
          element={
            <SellerProtectedRoute>
              <EditProduct />
            </SellerProtectedRoute>
          }
        />
        {/* <Route path="/trial" element={<TrialPage />} /> */}
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-update-product"
          element={
            <SellerProtectedRoute>
              <ShopUpdateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupouns />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        {/* <Route
          path="/shippingadd"
          element={
            <ProtectedAdminRoute>
              <AdminDestination />
            </ProtectedAdminRoute>
          }
        /> */}
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-carousel"
          element={
            <ProtectedAdminRoute>
              <AdminCarousel />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedAdminRoute>
              <AdminCategories />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-statements"
          element={
            <ProtectedAdminRoute>
              <StatementsPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-transaction"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardTransaction />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
