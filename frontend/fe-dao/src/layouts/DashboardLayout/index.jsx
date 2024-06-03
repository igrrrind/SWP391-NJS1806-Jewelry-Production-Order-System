import { Outlet } from 'react-router-dom'
import Sidenav from './Sidenav/Sidenav'


const DashboardLayout = () => {
    return (
        <div className='flex bg-stone-300 w-screen' >
        <Sidenav/>
        <Outlet>
        </Outlet>
        </div>
    )
}

export default DashboardLayout