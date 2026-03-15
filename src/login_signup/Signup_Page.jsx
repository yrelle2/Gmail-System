import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login_Page.css'; // assuming same styles

function Signup_Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost/gmail_system/src/api/signup.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Signup successful – redirect to login page
                alert('Signup successful! Please login.');
                navigate('/login');
            } else {
                // Show error message from server
                setError(data.message || 'Signup failed');
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
                <h1>Signup</h1>
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
                        minLength="6"
                    /><br />
                    <input
                        type="submit"
                        value={loading ? 'Signing up...' : 'Sign Up'}
                        disabled={loading}
                    />
                </form>
                <h4>Already have an account? <Link to="/login">Login</Link></h4>
            </div>
        </div>
    );
}

export default Signup_Page;