import axios from "axios"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import Swal from 'sweetalert2'

export const useAppStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,
            login: async (email, password) => {
                try {
                    set({
                        isLoading: true
                    })
                    const respuesta = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
                        email: email,
                        password: password
                    })
                    if (respuesta.status === 201) {
                        console.log("respuesta.data: ", respuesta.data)
                        const profile = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
                            headers: {
                                Authorization: `Bearer ${respuesta.data.access_token}`
                            }
                        })
                        set({
                            user: profile.data
                        })
                    }
                }
                catch (err) {
                    console.log("err: ", err)
                    Swal.fire({
                        title: 'Error',
                        text: "Error al iniciar sesión, verifique sus credenciales",
                        icon: 'error',
                    })
                }
                finally {
                    set({
                        isLoading: false
                    })
                }
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isLoading: false,
                    error: null
                })
            },
            hasRole: (roles) => {
                const currentRole = get().user
                if (currentRole === null) {
                    return false
                }
                if (Array.isArray(roles)) {
                    const hasRole = roles?.includes(currentRole.role)
                    return hasRole
                }
                return currentRole.role === roles
            }
        }),
        {
            name: "info-profile",
            storage: createJSONStorage(() => localStorage)
        }
    )
)