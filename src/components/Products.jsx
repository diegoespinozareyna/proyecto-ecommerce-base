import axios from "axios"
import { Activity, Eye, ShoppingCart, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppStore } from "../store/useAppStore"

const API = "https://f6280e940fffd701.mokky.dev"

const Products = () => {

    const { addToCart, cart } = useAppStore()

    console.log("cart: ", cart)

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [product, setProduct] = useState(null)

    useEffect(() => {

        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${API}/products`)
                console.log("la respueste es: ", response)
                setProducts(response.data)
            }
            catch (err) {
                console.log("err: ", err)
            }
            finally {
                setLoading(false)
            }


        }

        fetchProducts()

    }, [])

    const handlePopup = (active) => {
        setShow(active)
    }

    const hadnleProduct = (productOnly) => {
        setProduct(productOnly)
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Activity className="h-20 w-20 text-indigo-600 animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-start h-screen p-5 relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Catálogo de Productos
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                    products.map((item, index) => {
                        return (
                            <div key={index} className="bg-white shadow-lg rounded-lg max-w-75 h-112 overflow-hidden pb-3">
                                <img
                                    src={item.images[0]}
                                    alt="prodcut"
                                    className="w-full h-[50] object-cover"
                                />
                                <div className="p-3">
                                    <div className="flex justify-start gap-5 items-center">
                                        <h1 className="truncate font-bold">{item.title}</h1>
                                        <span className="text-indigo-500 font-extrabold">S/.{item.price}</span>
                                    </div>
                                    <p className="line-clamp-2">{item.description}</p>
                                </div>

                                <div className="flex justify-between items-center gap-3 px-3">
                                    <button
                                        className="text-white bg-slate-900 flex gap-2 items-center justify-center px-4 py-2 rounded-md font-bold w-full hover:bg-slate-950 cursor-pointer"
                                        onClick={() => {
                                            handlePopup(true)
                                            hadnleProduct(item)
                                        }}
                                    >
                                        <Eye
                                            className="text-indigo-500 -mt-[0.05rem]"
                                            size={20}
                                        /> Detalles
                                    </button>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="text-white bg-slate-900 flex gap-2 items-center justify-center px-4 py-2 rounded-md font-bold w-full hover:bg-slate-950 cursor-pointer"
                                    >
                                        <ShoppingCart
                                            className="text-indigo-500 -mt-[0.20rem]"
                                            size={20}
                                        /> Añadir
                                    </button>
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            {
                show &&
                <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-5">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row relative">

                        <button
                            onClick={() => {
                                handlePopup(false)
                                hadnleProduct(null)
                            }}
                            className="text-slate-700 rounded-full p-2 cursor-pointer absolute top-2 right-2"
                        >
                            <X />
                        </button>

                        <div className="md:w-1/2 bg-slate-100">
                            <img
                                src={product?.images[0]}
                                alt="product"
                                className="w-full h-64 md:h-full object-cover"
                            />
                        </div>

                        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md mb-3 inline-block">
                                    {product.category?.name || 'Producto'}
                                </span>
                                <h2 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{product.title}</h2>
                                <div className="text-3xl font-black text-slate-800 mb-4 border-b pb-4">
                                    S/. {product.price}
                                </div>
                                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <button
                                onClick={() => addToCart(product)}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 flex justify-center items-center gap-2 cursor-pointer"
                            >
                                <ShoppingCart size={20} /> Añadir al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Products