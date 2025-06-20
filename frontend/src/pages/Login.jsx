import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/login', form);
            setMessage(res.data.message);
            localStorage.setItem('user', JSON.stringify(res.data.user));
        } catch (err) {
            setMessage(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="form-control mb-3"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="btn btn-primary w-100" style={{backgroundColor: '#9d1347', border: 'none'}}>Login</button>
            </form>
        </div>
    );
}

export default Login;

