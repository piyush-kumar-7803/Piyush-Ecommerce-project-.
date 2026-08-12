import {BrowserRouter, Route, Routes} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProduct from "./pages/admin/ManageProduct";
import AddProduct from "./pages/admin/AddProduct";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageOrders from "./pages/admin/ManageOrders";

function App() {

    return (
        <BrowserRouter>

            <div className="min-h-screen bg-slate-50 flex flex-col">

                <Navbar/>

                <div className="flex-1">
                    <Routes>

                        <Route path="/" element={<Home/>}/>

                        <Route path="/login" element={<Login/>}/>

                        <Route path="/register" element={<Register/>}/>

                        <Route path="/products" element={<Products/>}/>

                        <Route
                            path="/products/:id"
                            element={<ProductDetails/>}
                        />

                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <Cart/>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/orders"
                            element={
                                <ProtectedRoute>
                                    <Orders/>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/orders/:id"
                            element={
                                <ProtectedRoute>
                                    <OrderDetails/>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute adminOnly>
                                    <AdminDashboard/>
                                </ProtectedRoute>
                            }
                        >
                            <Route path="products" element={<ManageProduct/>}/>
                            <Route path="products/new" element={<AddProduct/>}/>
                            <Route path="products/:id/edit" element={<AddProduct/>}/>
                            <Route path="categories" element={<ManageCategories/>}/>
                            <Route path="orders" element={<ManageOrders/>}/>
                        </Route>

                    </Routes>
                </div>

                <Footer/>

            </div>

        </BrowserRouter>
    );
}

export default App;