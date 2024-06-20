import { Button } from "@/components/ui/button"
import { ArrowRightToLine } from "lucide-react"
import { useNavigate } from "react-router-dom"

const HeroCustomizePage = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/customize/start')
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-4 bg-white rounded-lg text-3xl flex flex-col items-center space-y-6">
                <h1 className="cormorant-garamond-medium">Describe your design, we'll handle the rest</h1>
                <Button size="lg"  variant="outline" className="rounded-none bg-zinc-900 pt-6 pb-6 text-white border-black w-32" onClick={handleClick}> <ArrowRightToLine/> &nbsp; START</Button>
            </div>
        </div>
    )

}
export default HeroCustomizePage
