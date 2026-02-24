import axios from "axios"
import { Activity } from "lucide-react"
import { useEffect, useState } from "react"

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await axios.get("https://api.escuelajs.co/api/v1/products?limit=20&offset=0")
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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Activity className="h-20 w-20 text-indigo-600 animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-start h-screen p-5 ">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Catálogo de Productos
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                    products.map((item, index) => {
                        return <>
                            <div key={index} className="bg-white shadow-lg rounded-lg max-w-75 h-100 overflow-hidden">
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
                            </div>
                        </>
                    })
                }
            </div>
        </div>
    )
}

export default Products