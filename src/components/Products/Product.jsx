import { Eye, ShoppingCart } from "lucide-react"

const Product = ({ item, handlePopup, hadnleProduct, addToCart }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg max-w-75 h-112 overflow-hidden pb-3">
            <img
                src={item?.images[0]}
                alt="prodcut"
                className="w-full h-75 object-cover"
            />
            <div className="p-3">
                <div className="flex justify-start gap-5 items-center">
                    <h1 className="truncate font-bold">{item?.title}</h1>
                    <span className="text-indigo-500 font-extrabold">S/.{item?.price}</span>
                </div>
                <p className="line-clamp-2">{item?.description}</p>
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
}

export default Product