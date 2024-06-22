import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import 'boosted/dist/css/boosted.min.css';
import logo from '../Images/orange.png';


function Login() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email,
          Password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        localStorage.setItem('token', data.User);
        setLoginStatus('success');
        setTimeout(() => {
          navigate('/Tasks');
        }, 1000);
      } else {
        setLoginStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginStatus('error');
    }
  }
  return (
    <div className="login-container" >
      <div className="login-box">
        <div className="logo-container">
        <img src={logo} alt="Logo" className='logo'/>
        </div>
        {loginStatus === 'success' && (
          <div className="alert alert-success" role="alert">
            <span className="alert-icon"><span className="visually-hidden">Success</span></span>
            <p>Log In Successfull Welcome</p>
          </div>
        )}
        {loginStatus === 'error' && (
          <div className="alert alert-danger" role="alert">
            <span className="alert-icon"><span className="visually-hidden">Error</span></span>
            <p>Error Occured While Trying To Log In</p>
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email :</label>
            <input type="email" className="form-control input-box" value={Email} onChange={(e) => setEmail(e.target.value)} id="inputEmail" required/>
          </div>
          <div className="form-group">
            <label>Password :</label>
            <input type="password" className="form-control input-box" value={Password} onChange={(e) => setPassword(e.target.value)} id="inputPassword" required/>
          </div>
          <button type="button" className="btn btn-primary"onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
    
  );
}

export default Login;