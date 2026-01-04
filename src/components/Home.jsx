import Aos from "aos";
import "aos/dist/aos.css"
import { useEffect, useState } from "react";
import NewsItem from "./microComponents/NewsItem";
import { Link } from "react-router-dom";
import { useBaseUrlStore } from "../stores/BaseUrlStore";

const Home = () => {
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        getOpportunities();
        Aos.init({
            once: true,
            mirror: false,
            duration: 800
        });
    }, [])

    const getOpportunities = async () => {
        const response = await fetch(`${baseUrl}api/v1/get/allOpportunities`);
        const data = await response.json();

        // sort by id descending (latest first)
        const sorted = data.sort((a, b) => b.id - a.id);

        // take latest 3
        const latestThree = sorted.slice(0, 3);
        console.log(latestThree);
        setOpportunities(latestThree);
    }

    return <>
        <div className="w-full bg-cover bg-center bg-[url(/posterNew.webp)] px-10 py-30 md:py-50 rounded-4xl">
            <div className="flex text-[#ffffff]">
                <div className="flex-[0_0_70%] md:flex-[0_0_35%]">
                    <div className="flex">
                        <div className="w-fit text-xl bg-[#495f11] px-3 rounded-full">Be the best</div>
                    </div>
                    <div className="text-5xl md:text-7xl text-left my-4">
                        Start with us for the brighter future
                    </div>
                    <div>
                        <div className="w-fit text-xl bg-[#b94e31] px-3 py-2 rounded-full defaultHover">Join us</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full">
            <div className="w-full flex mt-8 justify-center flex-col">
                <div className="flex-1 text-4xl md:text-6xl">Latest</div>
                <Link to="/opportunities" className="flex-1 text-base font-sans my-4 flex flex-row justify-center items-center hoverColor">
                    View more
                </Link>
            </div>

            <div className="md:flex md:flex-row md:p-4">
                {opportunities.length > 0 && opportunities.map((opportunity) => (
                    <NewsItem
                        key={opportunity.id}
                        imageName={`${opportunity.country}.png`}
                        newsTitle={opportunity.country}
                    />
                ))}

                {opportunities.length === 0 && (
                    <div className="text-center text-gray-600 w-full py-10">
                        No new opportunities currently.
                    </div>
                )}
            </div>
        </div>

        <div className="w-full">
            <div className="text-4xl md:text-6xl md:mb-6">Services</div>
            <div className="flex flex-col md:flex-row">
                <Link to="/services/consulting" className="flex md:flex-1 items-center flex-col my-6 md:text-2xl">
                    <img src="/consulting.png" className="w-[25%] mb-4"/>
                    <div>Consulting</div>
                </Link>
                <Link to="/services/checkdocs" className="flex md:flex-1 items-center flex-col my-6 md:text-2xl">
                    <img src="/contract.png" className="w-[25%] mb-4"/>
                    <div>Check documents</div>
                </Link>
                <Link to="/services/visahelp" className="flex md:flex-1 items-center flex-col my-6 md:text-2xl">
                    <img src="/visa.png" className="w-[25%] mb-4"/>
                    <div>Help with visa</div>
                </Link>
            </div>
        </div>
    </>
}

export default Home;
