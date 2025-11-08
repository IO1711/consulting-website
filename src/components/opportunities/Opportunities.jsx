import { useState } from "react";
import Footer from "../Footer";
import GrantDetails from "./GrantDetails";
import GrantItem from "./GrantItem";

const Opportunities = () => {

    const [detailsOpen, setDetailsOpen] = useState(false)
    const [grantDetails, setGrantDetails] = useState({
        country: "",
        programType: "",
        startDate: "",
        regDLine: "",
        ageReq: "",
        majorReq: ""
    })

    const updateGrantDetails = (country, programType, startDate, regDLine, ageReq, majorReq) => {

        setGrantDetails({
            country : country,
            programType : programType,
            startDate : startDate,
            regDLine : regDLine,
            ageReq : ageReq,
            majorReq : majorReq
        })

        setDetailsOpen(true);
    }

    return <>
        <div className="w-full bg-cover bg-position-[center_top_35rem] px-10 py-30 md:py-50 rounded-4xl bg-[#04322f]/60"
            style={{backgroundImage: `url(/opportunitiesPoster-2-mask2.png)`}}>
            <div className="text-white text-4xl md:text-7xl">Opportunities</div>
        </div>

        <div className="my-8 md:grid md:grid-cols-4 md:gap-16">
            <GrantItem country="Korea" programType="Bachelor's study" startDate="12.10.2026" regDLine="17.11.2025" ageReq="15-18" majorReq="highschool" onClick={updateGrantDetails}/>
            <GrantItem country="Korea1" programType="Bachelor's study" startDate="12.10.2026" regDLine="17.11.2025" ageReq="15-18" majorReq="highschool" onClick={updateGrantDetails}/>
            <GrantItem country="Korea2" programType="Bachelor's study" startDate="12.10.2026" regDLine="17.11.2025" ageReq="15-18" majorReq="highschool" onClick={updateGrantDetails}/>
            <GrantItem country="Korea3" programType="Bachelor's study" startDate="12.10.2026" regDLine="17.11.2025" ageReq="15-18" majorReq="highschool" onClick={updateGrantDetails}/>
            <GrantItem country="Korea4" programType="Bachelor's study" startDate="12.10.2026" regDLine="17.11.2025" ageReq="15-18" majorReq="highschool" onClick={updateGrantDetails}/>
        </div>


        

        <GrantDetails isHidden={detailsOpen} closeDetails={() => setDetailsOpen(false)} grantDetails={grantDetails}/>
    </>
}

export default Opportunities;