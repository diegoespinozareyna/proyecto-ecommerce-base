import { Activity, Edit, Mail, Save, Shield, User, X } from "lucide-react"
import { useAppStore } from "../../store/useAppStore"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

const Profile = () => {

    const { user, apiUrl, updateUser } = useAppStore()

    const [isShowPopUp, setIsShowPopUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar
    })

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.patch(`${apiUrl}/users/${user?.id}`, formData)
            console.log("response: ", response)
            if (response?.status === 200) {
                Swal.fire({
                    title: 'Perfil actualizado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                })
                setIsShowPopUp(false)
                updateUser(response.data)
            }
        }
        catch (error) {
            console.log("error", error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log("formData: ", formData)
    }, [formData])

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 relative">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden relative">

                <div className="h-32 bg-linear-to-r from-indigo-500 to-purple-600"></div>

                <div className="px-8 pb-8">

                    <div className="relative flex justify-between items-end -mt-16 mb-8">
                        <img
                            src={user.avatar}
                            alt="Perfil"
                            className="w-32 h-32 rounded-full border-4 border-white object-cover bg-slate-100 shadow-md"

                        />
                        <button
                            onClick={() => setIsShowPopUp(true)}
                            className="bg-slate-900 hover:bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Edit size={18} /> Editar Perfil
                        </button>
                    </div>

                    <h1 className="text-3xl font-black text-slate-900 mb-1">{user.name}</h1>
                    <p className="text-slate-500 flex items-center gap-2 mb-6">
                        <Mail size={16} /> {user.email}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                                <Shield size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Rol de Cuenta</p>
                                <p className="font-bold text-slate-800 capitalize">{user.role}</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                                <User size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">ID Interno</p>
                                <p className="font-bold text-slate-800 font-mono">#{user.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                isShowPopUp &&
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden relative">

                        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                            <h2 className="text-xl font-bold text-slate-800">Editar Información</h2>
                            <button
                                onClick={() => setIsShowPopUp(false)}
                                className="text-slate-400 hover:text-slate-800 bg-white p-1.5 rounded-full shadow-sm border border-slate-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleUpdateProfile}
                            className="p-6 space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(event) => handleInputChange(event)}
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(event) => handleInputChange(event)}
                                    required
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">URL de Foto de Perfil (Avatar)</label>
                                <input
                                    type="url"
                                    name="avatar"
                                    value={formData.avatar}
                                    onChange={(event) => handleInputChange(event)}
                                    placeholder="link de imagen"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsShowPopUp(false)}
                                    className="w-1/2 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-1/2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-xl transition-all shadow-md flex justify-center items-center gap-2"
                                >
                                    {loading ? <Activity className="animate-spin" size={20} /> : <><Save size={20} /> Guardar Cambios</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }

        </div>
    )
}

export default Profile