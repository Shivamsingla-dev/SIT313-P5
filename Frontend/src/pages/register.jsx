
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import "./Auth.css";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(result.user, {
                displayName: `${firstName.trim()} ${lastName.trim()}`,
            });

            await setDoc(doc(db, "users", result.user.uid), {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: result.user.email,
                createdAt: serverTimestamp(),
            });

            navigate("/");
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered.");
            } else if (err.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else {
                setError("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>Create Account</h1>
                <p>Join the DEV@Deakin community</p>

                <form onSubmit={handleRegister}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        required
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        required
                    />

                    <label htmlFor="registerEmail">Email</label>
                    <input
                        id="registerEmail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="registerPassword">Password</label>
                    <input
                        id="registerPassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        minLength={6}
                        required
                    />

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </section>
        </main>
    );
}

export default Register;
