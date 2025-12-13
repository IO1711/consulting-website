import { useEffect, useState } from "react";
import Footer from "../Footer";
import GrantDetails from "./GrantDetails";
import GrantItem from "./GrantItem";
import { useBaseUrlStore } from "../../stores/BaseUrlStore";
import Loader from "../../utility/Loader";

const Opportunities = () => {
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [opportunities, setOpportunities] = useState([]);
    const [grantDetails, setGrantDetails] = useState({
        country: "",
        programType: "",
        startDate: "",
        regDLine: "",
        ageReq: "",
        majorReq: "",
        description: "",
        link: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOpportunities();
    }, []);

    const getOpportunities = async () => {
        const response = await fetch(`${baseUrl}api/v1/get/allOpportunities`);
        const data = await response.json();
        console.log(JSON.stringify(data));
        setOpportunities(data);
        setLoading(false);
    }


    const updateGrantDetails = (country, programType, startDate, regDLine, ageReq, majorReq, description, link) => {

        setGrantDetails({
            country : country,
            programType : programType,
            startDate : startDate,
            regDLine : regDLine,
            ageReq : ageReq,
            majorReq : majorReq,
            description : description,
            link : link
        })

        setDetailsOpen(true);
    }

    return <>
        <div className="w-full bg-cover bg-position-[center_top_35rem] px-10 py-30 md:py-50 rounded-4xl bg-[#04322f]/60"
            style={{backgroundImage: `url(/opportunitiesPoster-2-mask2.png)`}}>
            <div className="text-white text-4xl md:text-7xl">Opportunities</div>
        </div>

        <div className="my-8 md:grid md:grid-cols-4 md:gap-16">
            {loading && <Loader/>}
            {!loading && opportunities.length === 0 && 
                <div>
                    There no new opportunities currently.
                </div>
            }
            {opportunities && opportunities.map(opportunity => 
                <GrantItem key={opportunity.id} opportunity={opportunity} country={opportunity.country} programType={opportunity.programType} startDate={new Date(opportunity.startDate).toLocaleDateString()} regDLine={new Date(opportunity.regDeadline).toLocaleDateString()} ageReq={opportunity.ageReq} majorReq={opportunity.degreeReq} onClick={updateGrantDetails}/>    
            )}
        </div>


        

        <GrantDetails isHidden={detailsOpen} closeDetails={() => setDetailsOpen(false)} grantDetails={grantDetails}/>
    </>
}

export default Opportunities;