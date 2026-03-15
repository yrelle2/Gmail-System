import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // if you want to redirect after login
import './Login_Page.css';

function Login_Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // optional, for redirection

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form submission (page reload)

        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost/myapp/api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Login successful – you can store user info, redirect, etc.
                console.log('Login successful', data);
                // Example redirect to dashboard
                navigate('/dashboard');
            } else {
                // Login failed – show error message from server
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error – please check your connection.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="box">
                <h1>Login</h1>
                {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    /><br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br />
                    <input
                        type="submit"
                        value={loading ? 'Logging in...' : 'Login'}
                        disabled={loading}
                    />
                </form>
                <h4>Haven't signed up yet?  <Link to="/signup" >signup</Link></h4>
            </div>
        </div>
    );
}

export default Login_Page;