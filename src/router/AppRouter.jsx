import Home from "../components/Home"
import { HashRouter, Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import Login from "../components/Login"
import { useAppStore } from "../store/useAppStore"
import Products from "../components/Products"
import Page404 from "../components/Page404"
import Profile from "../components/Profile"
import Navbar from "../components/layout/Navbar"
import PanelAdmin from "../components/panelAdmin/PanelAdmin"
import Unauthorized from "../components/Unauthorized"

const AppRouter = () => {

    const { user, hasRole } = useAppStore()

    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/products"
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                <Products />
                        }
                    />

                    <Route
                        path="/panel-admin"
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                hasRole(["admin", "editor", "manager", "finance", "RRHH"]) ?
                                    <PanelAdmin />
                                    :
                                    <Unauthorized />
                        }
                    />

                    <Route
                        path="*"
                        element={<Page404 />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default AppRouter