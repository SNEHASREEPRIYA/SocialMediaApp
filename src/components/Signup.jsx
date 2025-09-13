import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && name) {
      signup({ email, password, name });
      alert("Signup successful!");
      navigate('/');
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="mb-3">
        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default Signup;
