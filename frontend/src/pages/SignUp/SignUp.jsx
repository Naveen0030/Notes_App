import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import PasswordInput from '../../components/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const SignUp = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp  = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if(!name.trim()){
      setError("Please enter your full name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }

    if(!password || password.length < 6){
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    //Signup API call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,  
      });

      // Handle successful registration response
      if(response.data && response.data.error === false && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        navigate("/dashboard");
      } else if(response.data && response.data.error === true){
        setError(response.data.message || "Registration failed. Please try again.");
      } else {
        setError("Invalid response from server. Please try again.");
      }

    } catch(error){
      console.error("Signup error:", error);
      
      // Handle specific error cases
      if(error.response){
        if(error.response.status === 409){
          setError("An account with this email already exists. Please login instead.");
        } else if(error.response.status === 400){
          setError(error.response.data.message || "Please check your input and try again.");
        } else if(error.response.status === 500){
          setError("Server error. Please try again later.");
        } else {
          setError(error.response.data.message || "Registration failed. Please try again.");
        }
      } else if(error.request){
        setError("Network error. Please check your internet connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
        <div className='w-full max-w-md'>
          <div className='bg-white rounded-2xl shadow-large border border-gray-200 p-8'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-display font-bold text-gray-800 mb-2'>
                Create Account
              </h1>
              <p className='text-gray-600'>
                Join NotesApp and start organizing your thoughts
              </p>
            </div>

            <form onSubmit={handleSignUp} className='space-y-6'>
              <div>
                <label className='input-label'>Full Name</label>
                <input 
                  type='text' 
                  placeholder='Enter your full name' 
                  className='form-input' 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className='input-label'>Email Address</label>
                <input 
                  type='email' 
                  placeholder='Enter your email' 
                  className='form-input' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className='input-label'>Password</label>
                <PasswordInput 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className='bg-red-50 border border-red-200 rounded-xl p-4'>
                  <p className='text-red-700 text-sm'>{error}</p>
                </div>
              )}

              <button 
                type='submit' 
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  isLoading 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-primary to-accent text-white hover:from-accent hover:to-primary transform hover:-translate-y-1 shadow-soft hover:shadow-medium'
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className='mt-8 text-center'>
              <p className='text-gray-600'>
                Already have an account?{" "}
                <Link to="/login" className='font-semibold text-primary hover:text-accent transition-colors duration-200'>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp