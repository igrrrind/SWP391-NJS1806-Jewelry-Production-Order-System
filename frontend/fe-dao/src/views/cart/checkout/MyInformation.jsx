import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Link } from "react-router-dom";

function MyInformation() {

    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [phone,setPhone] = useState(null);

    return (
        <>
             <div className="flex items-center justify-between ">
             <h1 className="cormorant-garamond-regular text-3xl">My Information</h1>
            <h2 className="text-sm mt-2 text-right	">Having an account makes placing an order faster. <Link to="/login"  className='underline'>Click here to sign up</Link></h2>
            </div>
            <Separator className="mt-4 mb-4"/>
            <div className="">
                    <div className="grid gap-3">
                        <div className="flex items-center justify-between space-x-6">
                            <Label htmlFor="customer">Customer</Label>
                            <Input className="w-2/3" type="text" id="customer" placeholder="Customer Name" value = { name } onChange = { (e) => setName(e.target.value) } required/>
                        </div>

                        <div className="flex items-center justify-between space-x-6">
                            <Label htmlFor="email">Email</Label>
                            <Input className="w-2/3"  type="email" id="email" placeholder="Email" value = { email } onChange = { (e) => setEmail(e.target.value) } required/>
                        </div>

                        <div className="flex items-center justify-between space-x-6">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input className="w-2/3"  type="tel" id="phone" placeholder="Phone" value = { phone } onChange = { (e) => setPhone(e.target.value) } required/>
                        </div>
                    </div>
                </div>
        </>
    )

}

export default MyInformation