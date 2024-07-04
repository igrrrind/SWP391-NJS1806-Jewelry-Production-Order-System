import { Outlet } from 'react-router-dom'
import Sidenav from './Sidenav/Sidenav'


const DashboardLayout = () => {
    return (
        <div className='flex min-h-screen w-full flex-col bg-muted/40' >
        <Sidenav/>
        </div>
    )
}

export default DashboardLayout