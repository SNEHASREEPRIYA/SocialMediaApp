import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const success = login(email, password);
      if (success) {
        alert("Login successful!");
        navigate('/');
      } else {
        alert("Login failed. Please sign up first.");
      }
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
