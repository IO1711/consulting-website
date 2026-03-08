import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GrantDetails from "./GrantDetails";
import GrantItem from "./GrantItem";
import { useBaseUrlStore } from "../../stores/BaseUrlStore";
import Loader from "../../utility/Loader";
import { apiRequest } from "../../lib/apiClient";
import { queryKeys } from "../../lib/queryKeys";
import { useSearchParams } from "react-router-dom";

const Opportunities = () => {
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);
    const [searchParams, setSearchParams] = useSearchParams();
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [activeOpportunityId, setActiveOpportunityId] = useState(null);
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
    const { data: opportunities = [], isLoading: loading } = useQuery({
        queryKey: queryKeys.opportunities(baseUrl),
        queryFn: () => apiRequest(baseUrl, "api/v1/get/allOpportunities"),
    });


    const formatDate = (isoDate) =>
      isoDate ? new Date(isoDate).toLocaleDateString() : "";

    const updateGrantDetails = (opportunity) => {
        setGrantDetails({
            country : opportunity.country,
            programType : opportunity.programType,
            startDate : formatDate(opportunity.startDate),
            regDLine : formatDate(opportunity.regDeadline),
            ageReq : opportunity.ageReq,
            majorReq : opportunity.degreeReq,
            description : opportunity.description,
            link : opportunity.link
        })

        setActiveOpportunityId(String(opportunity.id));
        setDetailsOpen(true);
    }

    const closeDetails = () => {
      setDetailsOpen(false);
      setActiveOpportunityId(null);

      if (searchParams.get("opportunity")) {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete("opportunity");
        setSearchParams(nextParams, { replace: true });
      }
    };

    useEffect(() => {
      const queryOpportunityId = searchParams.get("opportunity");

      if (!queryOpportunityId || opportunities.length === 0) {
        return;
      }

      if (detailsOpen && activeOpportunityId === queryOpportunityId) {
        return;
      }

      const selectedOpportunity = opportunities.find(
        (opportunity) => String(opportunity.id) === queryOpportunityId
      );

      if (selectedOpportunity) {
        updateGrantDetails(selectedOpportunity);
      }
    }, [
      searchParams,
      opportunities,
      detailsOpen,
      activeOpportunityId,
    ]);

    return <>
        <div className="w-full bg-cover bg-position-[center_top_35rem] px-10 py-30 md:py-50 rounded-4xl bg-[#04322f]/60"
            style={{backgroundImage: `url(/optimized/heroes/opportunities-hero.jpg)`}}>
            <div className="text-white text-4xl md:text-7xl">Opportunities</div>
        </div>
        {loading && <div className="mt-20 mb-40 flex justify-center items-center text-center text-gray-600"><Loader/></div>}
        {!loading && opportunities.length === 0 && 
            <div className="mt-20 mb-40 flex justify-center items-center text-center text-gray-600">
                There are no new opportunities currently.
            </div>
        }

        {opportunities && <div className="my-8 md:grid md:grid-cols-4 md:gap-16">
            
            {opportunities.map(opportunity => 
                <GrantItem key={opportunity.id} opportunity={opportunity} country={opportunity.country} programType={opportunity.programType} startDate={formatDate(opportunity.startDate)} regDLine={formatDate(opportunity.regDeadline)} ageReq={opportunity.ageReq} majorReq={opportunity.degreeReq} onClick={updateGrantDetails}/>    
            )}
        </div>}


        

        <GrantDetails isHidden={detailsOpen} closeDetails={closeDetails} grantDetails={grantDetails}/>
    </>
}

export default Opportunities;
