import { Link } from "react-router-dom"
import { ShoppingCart } from 'lucide-react'

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                    La nueva era del <br /><span className="text-indigo-600">Comercio Digital</span>
                </h1>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                    Plataforma B2B demostrativa. Integra Zustand para carrito de compras, React Router para navegación segura y Axios para consumo de APIs REST.
                </p>
                <Link
                    to="/login"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3 text-lg"
                >
                    Entrar a la tienda ahora <ShoppingCart />
                </Link>
            </div>
        </div>
    )
}

export default Home