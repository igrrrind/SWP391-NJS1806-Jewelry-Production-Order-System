import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'
import Zalo from '../../assets/Logo Zalo.svg'


const MainLayout = () => {
    return (
        <>  
            <a
                className='fixed bottom-5 right-5 w-16 z-50 hover:scale-110 transition'
                href="#"
            >
                <img src={Zalo} alt="zaloIcon" />
            </a>
            <Navbar/>
            <Footer/>
        </>
    )
}

export default MainLayout