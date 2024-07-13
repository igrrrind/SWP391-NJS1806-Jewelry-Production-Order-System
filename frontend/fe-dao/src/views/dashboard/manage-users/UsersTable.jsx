import { Badge } from "@/components/ui/badge";


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
import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const UsersTable = ({users}) => {

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
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit User Info</DropdownMenuItem>
                                        <DropdownMenuItem>Delete User</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
    )
} 


export default UsersTable