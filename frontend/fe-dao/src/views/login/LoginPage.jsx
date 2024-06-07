import Logo from '../../assets/logo-cropped.svg';
import './login.css'
import '../../App.css'
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import { useAuth } from '../../contexts/AuthContext';




const LoginPage = () => {

  const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    const { loginWithEmailAndPassword, loginWithGoogle } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await loginWithEmailAndPassword(email, password);
            navigate("/");
        } catch (error) {
            setNotice("You entered a wrong username or password.");
            console.log(error);
          }
    }

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
        <div className = "text-red-600" role = "alert">
            { notice }    
        </div>
    }
    <h1 className='cormorant-garamond-regular  text-5xl p-5'>Login</h1>
        <span>Don&apos;t have an account? <Link to="./signup"  className='underline'>Click here to create an account.</Link></span>
        <div className='m-4 w-full'>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" value = { email } onChange = { (e) => setEmail(e.target.value) } required/>
        </div>
        
        <div className='m-4 w-full'>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Password" value = { password } onChange = { (e) => setPassword(e.target.value) }required/>
        </div>
        

        <Button type="submit" className="w-full" onClick = {handleLogin}>
          Sign In
        </Button>
        <div className='m-4'>or</div>
        <GoogleButton onClick={handleGoogleLogin} style={customStyles}></GoogleButton>

    </div>
    </form>

   

  </div>
  );
};

export default LoginPage;


