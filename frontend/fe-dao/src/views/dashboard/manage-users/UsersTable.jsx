import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { BadgeAlert, BadgeAlertIcon, Delete, LucideDelete, MoreHorizontal, RemoveFormatting, Trash, Trash2, TrashIcon, UserRoundCog } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { CustomCombobox } from "@/components/custom/custom-combobox";
import { useState } from "react";
import { usePutUser } from "@/hooks/userHooks";

const UsersTable = ({users, roles}) => {

    const [error, setError] = useState('');
    const [roleToUpdate, setRoleToUpdate] = useState(null);
    const {updateUser} = usePutUser();

    const navigate = useNavigate();

    const handleRoleChange = (value) => {
        if (value === roleToUpdate) {
            setRoleToUpdate(null)
            return
        }
        console.log("Selected role:", value)
        setRoleToUpdate(value);
        setError('');
    }


    const handleUpdate = async (user) => {
        if (!roleToUpdate) {
            setError("Choose a status before updating")
            return;
        }
        const userTobeUpdated = {...user, roleId: roleToUpdate}
        await updateUser(userTobeUpdated)
        navigate(0)
    }








    return (
            
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">UID</TableHead>
                                <TableHead className="hidden sm:table-cell">Name</TableHead>
                                <TableHead className="hidden sm:table-cell">Email</TableHead>
                                <TableHead className="hidden sm:table-cell">Phone</TableHead>
                                <TableHead className="hidden sm:table-cell">Role</TableHead>
                               {/* <TableHead className="hidden md:table-cell">Sales</TableHead> */}
                                <TableHead className="">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        
                            {users.map(user => (
                                <TableRow key={user.uid}>
                                    <TableCell>{user.uid}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{user.firstName} {user.lastName}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{user.phone}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{user.roleName}</TableCell>

                                                           
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className=" px-3"><UserRoundCog className="w-5 text-blue-600"/></Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                <DialogTitle>Update Role</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to the user's role. 
                                                </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">
                                                    Status
                                                    </Label>
                                                    <CustomCombobox 
                                                        items={roles} 
                                                        onSelect={(e) => handleRoleChange(e)} 
                                                        placeholder="Update the role..."
                                                        buttonClassName="custom-button-class"/>
                                                </div>
                                                <div>{error && <p className="text-red-600 text-sm">{error}</p>}</div>
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={() => handleUpdate(user)}>Update</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog> 
                                        <Button variant="outline" className=" px-3"><Trash2 className="text-red-600 font-medium w-5"/></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
    )
} 


export default UsersTable