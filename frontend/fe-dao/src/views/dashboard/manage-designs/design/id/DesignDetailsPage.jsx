import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDesignById, usePutDesign } from "@/hooks/designHooks";
import CustomCalendar from "@/components/custom/custom-calendar";
import ImageUploadComponent from "@/components/custom/images-upload";
import { toast } from 'react-toastify';
import DesignGallery from "./DesignGallery";
import { useOrderById, usePutOrder } from "@/hooks/orderHooks";
import { debounce } from 'lodash';
import { Label } from "@/components/ui/label";

const DesignDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { design } = useDesignById(id);
    const { order } = useOrderById(design?.orderId);
    const [designDetails, setDesignDetails] = useState({
        
        description: "",
        designatedCompletion: null,
        designId: 0,
        orderCustomId: 0,
        orderId: 0

    });

    const { updateOrderStatus } = usePutOrder();
    const { updateDesign } = usePutDesign();

    useEffect(() => {
        if (design) {
            console.log(design)
            setDesignDetails({
                description: design.description,
                designatedCompletion: design.designatedCompletion,
                designId: design.designId,
                orderCustomId: id,
                orderId: design.orderId
            });
        }
    }, [design]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDesignDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSelectDate = (date) => {
        setDesignDetails(prevDetails => ({
            ...prevDetails,
            designatedCompletion: date
        }));
    };

    // Debounced update function
    const debouncedUpdateDesignStatus = useCallback(
        debounce((newDetails) => {
            updateDesign(newDetails);
            toast.success('Design details updated');
        }, 500),
        []
    );

    useEffect(() => {
        if (designDetails.description !== "" || designDetails.designatedCompletion) {
            
            debouncedUpdateDesignStatus(designDetails);
        }
    }, [designDetails]);

    const handleSubmit = async () => {
        await updateOrderStatus(order, 4);
        navigate("/dashboard/manage-designs");
        toast.success(`Design sent successfully!`);
    };

    const handleRefresh = () => {
        navigate(0);
    };

    return (
        <div>
            <main className="flex-1 p-4 xl:flex xl:space-x-4 overflow-auto">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Design Proposal For Item #{design?.orderCustomId}</CardTitle>
                        <CardDescription>
                            Submit your design proposal. Once sent, editing is disabled until the user disproves of the design.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={designDetails.description}
                                    onChange={handleChange}
                                    placeholder="Enter the design description"
                                />
                            </div>
                            <div>
                                <Label htmlFor="designatedCompletion">Designated Completion Date</Label>
                                <div>
                                    <CustomCalendar
                                        selectedDate={designDetails.designatedCompletion}
                                        onSelectDate={handleSelectDate}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Image Upload</Label>
                                <div className="border p-4 rounded-md text-center text-gray-500">
                                    <ImageUploadComponent mainDirectory="designs" subfolder={id} onUpload={handleRefresh} />
                                </div>
                            </div>
                            <div>
                                <Label>Uploaded Images</Label>
                                <DesignGallery customId={id} />
                            </div>
                            <div className="flex space-y-4 justify-center flex-col items-center">
                                <div>
                                    <Button variant="default" onClick={handleSubmit}>Send Proposal</Button>
                                </div>
                                <div>
                                    <Link to="/dashboard/manage-designs">
                                        <Button variant="outline">Return</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default DesignDetailsPage;
