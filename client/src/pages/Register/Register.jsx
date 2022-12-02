import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./Register.module.scss";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post("/auth/register", {
                username,
                email,
                password,
            });
            res.data && window.location.replace("/login");
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className={styles.register}>
            <span className={styles.registerTitle}>Register</span>

            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    className={styles.registerInput}
                    placeholder="Enter your username..."
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="text"
                    className={styles.registerInput}
                    placeholder="Enter your email..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    className={styles.registerInput}
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.registerButton} type="submit">
                    Register
                </button>
            </form>

            <button className={styles.registerLoginButton}>
                <Link className="link" to="/login">
                    <span>LOGIN</span>
                </Link>
            </button>

            {error && (
                <span style={{ color: "red", marginTop: "10px" }}>
                    Something went wrong!
                </span>
            )}
        </div>
    );
}
