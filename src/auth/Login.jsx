
import { useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";

const Login = () => {

    const setAuthToken = useAuthStore((s) => s.login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        setAuthToken(data.token);
    }

    return <>
        <Link to="/">Home</Link>
        <form onSubmit={handleLogin}>
            <input type="text" name="email" onChange={(event) => setEmail(event.target.value)} className="border"/>
            <input type="password" name="password" onChange={(event) => setPassword(event.target.value)} className="border"/>
            <Button type="submit">Login</Button>
        </form>
    </>
}

export default Login;