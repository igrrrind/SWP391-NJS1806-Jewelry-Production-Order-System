import Logo from '../../assets/logo-cropped.svg';
import '../../App.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; 
import { Button } from '@/components/ui/button';
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const SignupPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState("");
  const { signupWithEmailAndPassword, loginWithGoogle } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotice("Passwords do not match.");
      return;
    }

    try {
      await signupWithEmailAndPassword(email, password, firstName, lastName);
      navigate("/");
    } catch (error) {
      setNotice("Check your fields and try again to create an account.");
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setNotice("Failed to sign in with Google.");
      console.log(error);
    }
  };

  const customStyles = {
    color: 'white',
    borderRadius: '5px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%'
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <header className="bg-white font-sans shadow-sm">
        <div className="container mx-auto flex items-center justify-center">
          <div className="logo p-8">
            <img src={Logo} alt="" className='w-28'/>
          </div>
        </div>
      </header>

      <form action="">
        <div className='containe flex flex-col justify-center items-center mx-auto mt-20 max-w-md'>
          { "" !== notice &&
            <div className="text-red-600" role="alert">
              { notice }
            </div>
          }
          <h1 className='cormorant-garamond-regular text-5xl p-5'>Sign Up</h1>
          <span>Already have an account? <Link to="/login" className='underline'>Click here to login.</Link></span>
          
          <div className='w-full flex justify-between mt-6 space-x-4'>
          <div className='w-full'>
            <Label htmlFor="first-name">First Name</Label>
            <Input type="text" id="first-name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
          </div>

          <div className='w-full'>
            <Label htmlFor="last-name">Last Name</Label>
            <Input type="text" id="last-name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
          </div>
          </div>

          <div className='m-4 w-full'>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          
          <div className='m-4 w-full relative'>
            <Label htmlFor="password">Password</Label>
            <Input type={showPassword ? "text" : "password"} id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={toggleShowPassword} className="absolute top-9 right-3 cursor-pointer"/>
          </div>
          
          <div className='m-4 w-full relative '>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input type={showConfirmPassword ? "text" : "password"} id="confirm-password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} onClick={toggleShowConfirmPassword} className="absolute top-9 right-3 cursor-pointer"/>
          </div>
          
          <Button type="submit" className="w-full mt-10" onClick={handleSignup}>
            Sign Up
          </Button>
          <div className='m-4'>or</div>
          <GoogleButton onClick={handleGoogleLogin} style={customStyles}></GoogleButton>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
