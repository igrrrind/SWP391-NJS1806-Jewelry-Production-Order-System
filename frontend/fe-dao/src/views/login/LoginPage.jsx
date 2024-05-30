import Logo from '../../assets/logo-cropped.svg';
import './login.css'
import '../../App.css'
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';


const LoginPage = () => {
  return (
  <div>
    <header className="bg-white font-sans shadow-sm">
    <div className="container mx-auto flex items-center justify-center">
      <div className="logo p-8">
        <img src={Logo} alt="" className='w-28'/>
      </div>
    </div>
    </header>

    <div className='containe flex flex-col justify-center items-center mx-auto mt-20 max-w-md'>
        <h1 className='cormorant-sc-regular text-5xl p-5'>Login</h1>
        <p>Don&apos;t have an account? <span className='underline'>Create an account.</span></p>
        <div className='m-4 w-full'>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" required/>
        </div>
        
        <div className='m-4 w-full'>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Password" c/>
        </div>
        

        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <div className='m-4'>or</div>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>


        
    </div>

   

  </div>
  );
};

export default LoginPage;


