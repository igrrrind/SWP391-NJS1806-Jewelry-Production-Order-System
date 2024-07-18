import { useAllUsers } from "@/hooks/userHooks";
import UsersTable from "./UsersTable";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAllRoles } from "@/hooks/rolesHooks";
import { useEffect, useState } from "react";
import { CustomCombobox } from "@/components/custom/custom-combobox";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";


const ManageUsersPage = () => {
    const [roleIdQuerry, setRoleIdQuerry] = useState('');
    const { users,loading} = useAllUsers(roleIdQuerry);
    const [searchRole, setSearcRole] = useState(null)
    const { roles } = useAllRoles();
    const [rolesSelect, setRolesSelect] = useState(null)



    useEffect(()=>{
        if(roles){
            const formattedRoles = roles.map(role => ({
                value: role.roleId,
                label: role.roleName,
              }))
              setRolesSelect(formattedRoles)
              console.log(roles)

        }

    },[roles])

    const handleSelect = (value) => {
        if (value === roleIdQuerry) {
            setRoleIdQuerry('')
            return
        }
        setRoleIdQuerry(value)
    }

    const navigate = useNavigate(); 
    const handleClick = () => navigate('/dashboard/add-product'); 

    return (
        <main className="p-4 xl:flex flex-1 xl:space-x-4">
                <div className="flex-1">
                    {rolesSelect&&
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>Manage Users</CardTitle>
                            <div className='flex justify-between align-middle'>
                            <CardDescription>
                                Create, edit role and update existing user 

                            </CardDescription>
                            </div>
                         </CardHeader>
                         <CardContent>
                            <div className="grid grid-cols-4 mb-4 gap-4">
                                <div className="p-2 border flex items-center space-x-4">
                                    <div className="w-full text-sm font-semibold">Filter by Role:</div> 
                                    <CustomCombobox
                                        items={rolesSelect}
                                        onSelect={handleSelect}
                                        placeholder="Select a role..."
                                        buttonClassName="custom-button-class"
                                    /> 
                               </div>    

                               <div className="p-2 border flex items-center space-x-4">
                              <div><Input placeholder="Enter a name..."/></div><Button variant="outline"><SearchIcon/></Button>
                               </div>    
                            </div>
                            <UsersTable users={users} roles={rolesSelect}/>
                         </CardContent>
                
                    </Card>
                    }
                </div>
        </main>
    )
} 

export default ManageUsersPage;