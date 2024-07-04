import { useParams } from "react-router-dom"

export const PaymentErrorPage = () => {
    const {errMsg} = useParams()
    return(
        <div className="m-8 flex justify-center ">
        <div className="mb-8 flex flex-col justify-center">
            <h1 className="cormorant-garamond-bold text-2xl mb-4">Payment Error</h1>
            <p className="text-red-600 mb-4">There was an error processing your payment. Please try again later.</p>
            <p className="text-gray-600">Error Message: {errMsg}</p>
        </div>
    </div>
    )
}
