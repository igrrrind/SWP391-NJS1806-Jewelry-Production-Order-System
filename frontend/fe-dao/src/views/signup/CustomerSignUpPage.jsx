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
import { Controller, useForm } from 'react-hook-form';
import { useAllProvince } from '@/hooks/provinceApiHooks';
import { usePostCustDetails } from '@/hooks/customerDetailHooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import sex from '@/config/sex';


const CustomerSignUpPage = () => {
  const navigate = useNavigate();
  const { currentUser, customerDetails } = useAuth();
  const { postDetails, response, loading } = usePostCustDetails()
  const [notice, setNotice] = useState('');
  
  const { register, handleSubmit, watch, resetField,control, formState: { errors } } = useForm();

  const { provinces } = useAllProvince();
  const [towns, setTowns] = useState([]);

  const selectedProvince = watch('province')



  useEffect(()=> {
    const province = provinces?.find(prov => prov.Name === selectedProvince);
    if (province) {
        setTowns(province.District);
        
    } else {
        setTowns([]);
    }

  },[selectedProvince])

  const onSubmit = async (data) => {
     console.log(data)
     data.uid = currentUser.uid   
     await postDetails(data)
     if (response) {
        navigate('/');
     } else if (error) {
        setNotice('Failed to create user account, please try again.');
     }
  }



  return (
    <div className='pb-10'>
      <header className="bg-white font-sans shadow-sm">
        <div className="container mx-auto flex items-center justify-center">
          <div className="logo p-8">
            <Link to="/"><img src={Logo} alt="" className="w-28"/></Link>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}> 
        <div className="container flex flex-col justify-center items-center mx-auto mt-20 max-w-lg">
          <h1 className="cormorant-garamond-regular text-4xl p-5">Customer Information</h1>
          <span className='text-center'>This is the last step! Complete and start ordering now! </span>

          

         <div className="grid gap-3 w-full">

                <div className="w-full flex justify-between mt-6 space-x-4">
                    <div className="w-full">
                    <Label htmlFor="sex">Sex </Label>
                    <Controller
                        control={control}
                        name="sex"
                        rules={{ required: "This field is required" }}
                        render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="border w-full border-stone-800" id="sex" aria-label="Select sex">
                            <SelectValue placeholder="Select sex" />
                            </SelectTrigger>
                            <SelectContent>
                            {sex.sexes.map((s) => (
                                <SelectItem value={s.sex} key={s.id}>
                                <p className="text-md">{s.sex}</p>
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        )}
                    />
                    {errors.sex && <p className="text-red-500 text-xs mt-1">{errors.sex.message}</p>}
                    </div>
                </div>

                <div className="w-full">
                <Label htmlFor="birthday">Birthday</Label>
                    <Input 
                        type="date" 
                        id="birthday" 
                        placeholder="Birthday" 
                        {...register("birthday", { required: "This field is required" })} 
                    />
                    {errors.birthday && <p className="text-red-500 text-xs mt-1">{errors.birthday.message}</p>}
                </div>



                <div className="w-full">
                    <Label htmlFor="shippingAddress">Shipping address</Label>
                    <Input
                        className="w-full"
                        type="text"
                        id="addressLine"
                        placeholder="Shipping address"
                        {...register("addressLine", { required: "This field is required" })} 
                    />
                    {errors.addressLine && <p className="text-red-500 text-xs mt-1">{errors.addressLine.message}</p>}
                </div>


                <div className="w-full">
                <Label htmlFor="city">Province/City</Label>
                <Controller
                        control={control}
                        name="province"
                        rules={{ required: "This field is required" }}
                        render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="border w-full border-stone-800" id="province/city" aria-label="Select province/city">
                            <SelectValue placeholder="Select province/city" />
                            </SelectTrigger>
                            <SelectContent>
                            {provinces?.map((province) => (
                                <SelectItem value={province.Name} key={province.Name}>
                                <p className="text-md">{province.Name}</p>
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        )}
                    />
                    {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province.message}</p>}
                </div>


                <div className="w-full">
                    <Label htmlFor="town">District/Town</Label>
                    <Controller
                        control={control}
                        name="districtTown"
                        rules={{ required: "This field is required" }}
                        render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} disabled={!watch('province')}>
                            <SelectTrigger className="border w-full border-stone-800" id="town" aria-label="Select district/town">
                            <SelectValue placeholder="Select district/town" />
                            </SelectTrigger>
                            <SelectContent>
                            {towns.map((town) => (
                                <SelectItem value={town.Name} key={town.Name}>
                                <p className="text-md">{town.Name}</p>
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        )}
                    />
                    {errors.town && <p className="text-red-500 text-xs mt-1">{errors.town.message}</p>}
                </div>

            

            </div>
          <Button type="submit" className="w-full mt-10" disabled={loading}>
                Finish
          </Button> 
          {notice && <p className='text-red-500 text-sm'>notice</p>}      
        </div>
      </form>
    </div>
  );
};

export default CustomerSignUpPage;
