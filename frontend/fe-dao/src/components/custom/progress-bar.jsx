import { Progress } from "../ui/progress"

const ProgressBarUtil = ({currentStep}) => {
    const progressPercentage = (currentStep / 5) * 100; // assuming there are 4 steps
    return (
    <div className='w-full mb-4 '><Progress className="bg-green-100" value={progressPercentage}/> </div>
    )
} 

export default ProgressBarUtil
