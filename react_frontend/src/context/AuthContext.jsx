import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null)
    const navigate = useNavigate()


    const decodeUser = (token)=>{
        try {
            const decoded = jwtDecode(token)
            if(!decoded.exp || decoded.exp * 1000 < Date.now()){
                return null;
            }

            return{
                id: decoded.user.id,
                name: decoded.user.name,
                email: decoded.user.email,
                age: decoded.user.age,
                role: decoded.user.role
            }
        } catch {
            return null
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token)return

        const userLogued = decodeUser(token)
        if(userLogued){
        setUser(userLogued)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }else{
            localStorage.removeItem('token')
            delete axios.defaults.headers.common["Authorization"]
            setUser(null)
        }
    },[])

    const login = async (credentials)=>{
        try {
            // const response = await axios.post('http://localhost:3003/auth/login',credentials)
            const {data, status} = await authService.login(credentials)

            if(status === 200){
                const token = data?.token

                localStorage.setItem('token', token)
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

                const userLogued = decodeUser(token)

                if(!userLogued){
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common["Authorization"]
                    alert("Token invalido o esta expirado")
                    return
                }

                setUser(userLogued)
                navigate('/')
            }else{
                alert('Las credenciales son erroneas')
            }
        } catch (error) {
            alert("Hubo error al iniciar sesion:" + error.message)
        }
    }

    const register = async (userData) =>{
        try {
            const response = await axios.post('http://localhost:3003/auth/register', userData)
            if(response.status === 201){
                alert("Usuario creado exitosamente")
                navigate('/inicio-sesion')
            }else{
                alert(response.message)
            }
        } catch (error) {
            alert("Hubo un error al registrar el usuario:" + error.message)
        }
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem('token')
        delete axios.defaults.headers.common["Authorization"]
        navigate('/inicio-sesion')
    }

    const forgotPassword = async (email) =>{
        try {
            await axios.post('http://localhost:3003/auth/forgotPassword', {email})
            alert("Revisa tu correo electronico")
            return true;
        } catch (error) {
            console.error(error.response.data || error)
            return false
        }
    }

    const resetPassword = async (id, token, newPassword) =>{
        try {
            const body = {
                id: Number(id),
                token,
                newPassword
            }

            await axios.post('http://localhost:3003/auth/resetPassword', body)
            alert("Contraseña actualizada correctamente")
            navigate('/inicio-sesion')
            return true
        } catch (error) {
            console.error(error.response.data || error)
            alert("Error al actualizar la contraseña: " + error.message)
            return false
        }
    }

    return(
        <AuthContext.Provider value={{user, setUser, register, login, logout, forgotPassword, resetPassword}}>
            {children}
        </AuthContext.Provider>
    )
}