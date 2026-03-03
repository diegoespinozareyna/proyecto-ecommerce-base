import { Activity } from "lucide-react"

const LoginForm = ({ handleSubmit, email, setEmail, password, setPassword, isLoading }) => {

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200"
            >

                <div className="space-y-4">

                    <div>
                        <label className="block text-slate-700 font-bold mb-2 text-sm">
                            Correo
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 font-bold mb-2 text-sm">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center h-12 disabled:bg-slate-400 cursor-pointer"
                >
                    {
                        isLoading ?
                            <Activity className="h-5 w-5 text-indigo-600 animate-spin" />
                            :
                            'Entrar a la tienda'
                    }
                </button>
            </form>
        </div>
    )
}

export default LoginForm