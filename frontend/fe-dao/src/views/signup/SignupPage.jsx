import Logo from '../../assets/logo-cropped.svg';
import '../../App.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; 
import { Button } from '@/components/ui/button';
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { usePostUser } from '@/hooks/userHooks';
import { useForm } from 'react-hook-form';
import { commonPasswords } from '@/config/commonPasswords';


const SignupPage = () => {
  const navigate = useNavigate();
  const { signupWithEmailAndPassword, loginWithGoogle, currentUser } = useAuth();
  const [notice, setNotice] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const { response, loading, error } = usePostUser(user);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password", "");



  const handleSignup = useCallback(async (data) => {
    if (data.password !== data.confirmPassword) {
      setNotice("Passwords do not match.");
      return;
    }

    try {
      await signupWithEmailAndPassword(data.email, data.password, data.firstName, data.lastName);
      setSuccess(true);
    } catch (error) {
      setNotice("Check your fields and try again to create an account.");
      console.log(error);
    }
  }, [signupWithEmailAndPassword]);

  const handleGoogleLogin = useCallback(async () => {
    try {
      await loginWithGoogle();
      setSuccess(true);
    } catch (error) {
      setNotice("Failed to sign in with Google.");
      console.log(error);
    }
  }, [loginWithGoogle]);

  useEffect(() => {
    if (success && currentUser) {
      const newUser = {
        uid: currentUser.uid,
        firstName: watch("firstName"),
        lastName: watch("lastName"),
        email: watch("email"),
        phone: watch("phone"),
        roleId: 1,
      };
      setUser(newUser);
    }
  }, [success, currentUser, watch]);

  useEffect(() => {
    if (response) {
      navigate('/customer-signup');
    } else if (error) {
      setNotice('Failed to create user account, please try again.');
    }
  }, [response, error, navigate]);

  const customStyles = {
    color: 'white',
    borderRadius: '5px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='pb-10'>
      <header className="bg-white font-sans shadow-sm">
        <div className="container mx-auto flex items-center justify-center">
          <div className="logo p-8">
            <img src={Logo} alt="" className="w-28"/>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit(handleSignup)}>
        <div className="container flex flex-col justify-center items-center mx-auto mt-20 max-w-md">
          {notice && (
            <div className="text-red-600" role="alert">
              {notice}
            </div>
          )}
          <h1 className="cormorant-garamond-regular text-5xl p-5">Sign Up</h1>
          <span>Already have an account? <Link to="/login" className="underline">Click here to login.</Link></span>

          <div className="w-full flex justify-between mt-6 space-x-4">
            <div className="w-full">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                type="text" 
                id="firstName" 
                placeholder="First Name" 
                {...register("firstName", { required: "First Name is required" })} 
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>

            <div className="w-full">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                type="text" 
                id="lastName" 
                placeholder="Last Name" 
                {...register("lastName", { required: "Last Name is required" })} 
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="m-4 w-full">
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="Email" 
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address"
                }
              })} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="m-4 w-full">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              type="tel" 
              id="phone" 
              placeholder="Phone" 
              {...register("phone", { 
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/, 
                  message: "Enter a valid phone number"
                }
              })} 
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div className="m-4 w-full relative">
            <Label htmlFor="password">Password<p className='font-normal text-muted-foreground mb-2'>Requires at least 8 characters</p></Label>
            <Input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              placeholder="Password" 
              {...register("password", { 
                required: "Password is required",  
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters"
              }, validate: value => 
              !commonPasswords.includes(value) || "Password is too common. Please enter a more secure one"
              })} 
            />
            <FontAwesomeIcon 
              icon={showPassword ? faEyeSlash : faEye} 
              onClick={toggleShowPassword} 
              className="absolute top-9 right-3 cursor-pointer" 
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="m-4 w-full relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              type={showConfirmPassword ? "text" : "password"} 
              id="confirmPassword" 
              placeholder="Confirm Password" 
              {...register("confirmPassword", { required: "Confirm Password is required" })} 
            />
            <FontAwesomeIcon 
              icon={showConfirmPassword ? faEyeSlash : faEye} 
              onClick={toggleShowConfirmPassword} 
              className="absolute top-9 right-3 cursor-pointer" 
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" className="w-full mt-10" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          <div className="m-4">or</div>
          <GoogleButton onClick={handleGoogleLogin} style={customStyles} disabled={loading}/>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
