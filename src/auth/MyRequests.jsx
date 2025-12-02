import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/AuthStore";
import { useBaseUrlStore } from "../stores/BaseUrlStore";

const MyRequests = () => {

    const [docRequests, setDocRequests] = useState([]);
    const [visaRequests, setVisaRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useAuthStore((s) => s.token);
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);

    useEffect(() => {
        getDocRequests();
        getVisaRequests();
    }, []);

    const getDocRequests = async () => {
        try{
            const response = await fetch(`${baseUrl}api/v1/getProtected/getUserDocRequests`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            console.log(JSON.stringify(data));
            setDocRequests(data);
        } catch(e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const getVisaRequests = async () => {
        try{
            const response = await fetch(`${baseUrl}api/v1/getProtected/getUserVisaRequests`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            console.log(JSON.stringify(data));
            setVisaRequests(data);
        } catch(e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return <>
        <div className="max-w-xl mx-auto p-4 mt-6">
            
            {!loading && (docRequests.length === 0 && visaRequests.length === 0) && (
                <div className="text-gray-600">
                    You don't have any requests.
                </div>
            )}

            <h2 className="text-lg m-2 font-semibold text-[#032F2C]">Document check requests</h2>
            { !loading && docRequests.length > 0 && docRequests.map(request => {
                return <div key={request.id} className="bg-white shadow-sm rounded-lg p-4 mb-4 border border-gray-100">
                    <h2 className="text-lg m-2 font-semibold text-[#032F2C]">
                        {request.program}
                    </h2>
                    <p className="text-sm m-2 text-gray-500">Status: {request.status}</p>

                    <button className="rounded-xl m-2 bg-[#04322f] text-[#fffef8] px-6 py-2.5 font-medium hover:opacity-90 active:scale-[0.98] transition">
                        View
                    </button>
                </div>
            })
            }
            <h2 className="text-lg m-2 font-semibold text-[#032F2C]">Visa requests</h2>
            { !loading && visaRequests.length > 0 && visaRequests.map(request => {
                return <div key={request.id} className="bg-white shadow-sm rounded-lg p-4 mb-4 border border-gray-100">
                    <h2 className="text-lg m-2 font-semibold text-[#032F2C]">
                        {request.country}
                    </h2>
                    <p className="text-sm m-2 text-gray-500">Status: {request.purpose}</p>

                    <button className="rounded-xl m-2 bg-[#04322f] text-[#fffef8] px-6 py-2.5 font-medium hover:opacity-90 active:scale-[0.98] transition">
                        View
                    </button>
                </div>
            })
            }

        </div>
    </>
}

export default MyRequests;