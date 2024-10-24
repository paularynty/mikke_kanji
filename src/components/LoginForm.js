import { useNavigate } from "react-router-dom"; // for redirecting to profile page
import { useState } from "react";
// import AuthContext from "../AuthContext"; // for checking if user is authenticated
import React from "react";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  //const [user, setUser] = useState([]);
  const [password, setPassword] = useState("");
  const [pwordVisibility, setPwordVisibility] = useState(false);

  // const { setIsAuthenticated, setUser } = useContext(AuthContext); // Get auth state from context
  const navigate = useNavigate(); // direct to profile page after login

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const loginAttempt = (event) => {
    event.preventDefault();
    const userInfo = {
      username: username,
      password: password,
    };
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.auth_token) {
          localStorage.setItem('auth_token', data.auth_token); // Store the token in localStorage
          navigate("/profile"); // Redirect to profile page after successful login
        }
      })
      .catch((error) => alert(error.message));
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <section className="">
      <header className="w-28 mx-auto mb-5 font-bold text-pink-950 text-5xl">
        Login
      </header>
      <form onSubmit={loginAttempt}>
        <div>
          <label className="block mb-2 text-black" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            autoComplete="on"
            className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div>
          <label className="block mb-2 text-black" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            autoComplete="on"
            className="w-full p-2 mb-6 text-pink-700 border-b-2 border-pink-700 outline-none focus:bg-gray-300"
            type={pwordVisibility ? "text" : "password"}
            value={password}
            onChange={handlePassword}
          />
          <div>
            <label htmlFor="show-password">Show password </label>
            <input
              id="show-password"
              type="checkbox"
              value={pwordVisibility}
              onChange={() => setPwordVisibility((previous) => !previous)}
            />
          </div>
        </div>
        <button
          className="w-full text-2xl bg-pink-700 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded"
          type="submit"
        >
          Log in
        </button>
      </form>
    </section>
  );
};

export default LoginForm;

// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const LoginPage = () => {
//     //const router = useRouter();
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(''); // State for error messages
//     const [success, setSuccess] = useState(''); // State for success messages
//     const location = useLocation();
//     const message = location.state?.message;

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (message) {
//             setError(message);
//         }
//     }, [message]);

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(''); // Clear previous error
//         setSuccess(''); // Clear previous success

//         if (!username || !password) {
//             setError('Username and password are required.');
//             return;
//         }

//         try {
//             const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             const data = await response.json(); // Assuming response is JSON

//             if (response.ok) {

//                 // If login is successful, store login status and username in localStorage
//                 localStorage.setItem('auth_token', data.auth_token);
//                 //console.log(data.auth_token)

//                 // If login is successful, show success message5
//                 setSuccess('Login successful! Redirecting to the home page ...');

//                 setTimeout(() => {
//                     navigate('/'); // Redirect to the homepage or another route
//                 }, 3000);
                
//             } else {
//                 // If there's an error, display the error message returned by the server
//                 setError(data.message || 'Login failed. Please try again.');
//             }
//         } catch (err) {
//             // Handle network or unexpected errors
//             setError('An error occurred. Please try again later.');
//             console.error('Login error:', err);
//         }
//     };

//     return (
//         <div className="container text-center">
//              <h2 style={{textAlign: 'center'}}>Sign in</h2>
//             {/* Display success or error messages */}
//             {success && <p style={{ color: 'green' }}>{success}</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <div className="row justify-content-md-center">
//                 <form className="col col-lg-6" onSubmit={handleLogin}>
//                     <div className="mb-3">
//                         <label htmlFor="username" className="form-label">Username</label>
//                         <input
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                             className="form-control"
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="form-control"
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary">Login</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;