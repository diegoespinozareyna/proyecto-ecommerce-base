import { Activity } from "lucide-react";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import LoginForm from "../../components/Login/LoginForm";

const Login = () => {

    const navigate = useNavigate()

    const { login, user, isLoading } = useAppStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("el email es: ", email);
        console.log("el password es: ", password);

        await login(email, password);

    }

    useEffect(() => {
        if (user !== null) {
            navigate("/products")
        }
    }, [user])

    return (
        <LoginForm handleSubmit={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} isLoading={isLoading} />
    )
}

export default Login