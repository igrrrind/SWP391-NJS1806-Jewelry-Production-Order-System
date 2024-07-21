import { useEffect, useState } from "react"
import SearchInterface from "./SearchInterface"
import { useSearchParams } from "react-router-dom"
import { useShipmentTracking } from "@/hooks/shipmentHooks"
import ResultsTracking from "./ResultsTracking"


const ShipmentTrackingPage = () => {
    const [orderId, setOrderId] = useState('')
    const [result, setResult] = useState(null);
    const [notice, setNotice] = useState(null);

    const {fetchShipmentOrderId} = useShipmentTracking()

    const {id} = useSearchParams()

    useEffect(() => {
        if(id) setOrderId(id)
    },[id])

    const handleSubmit = async () => {
        setNotice(null)
        console.log(orderId)
        const response = await fetchShipmentOrderId(orderId)
        if (response) {
            setResult(response)
            console.log(response)
        } else {
            setNotice("Order ID is invalid.")
        }

    }



    return (
        <main className="h-screen">
            <div className="flex flex-col items-center h-full">
                <h1 className="cormorant-garamond-medium text-4xl mt-20"> Track your shipment</h1>
                {result ? <ResultsTracking result={result} setResult={setResult}/> 
                : <SearchInterface setOrderId={setOrderId} handleSubmit={handleSubmit} nothingFound={notice}/>}

            </div>
        </main>
    )
}

export default ShipmentTrackingPage