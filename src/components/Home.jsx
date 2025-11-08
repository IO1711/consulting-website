import Aos from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";
import NewsItem from "./microComponents/NewsItem";
import Footer from "./Footer";
import { Link } from "react-router-dom";


const Home = () => {


    useEffect(() => {
        Aos.init({
            once: true,
            mirror: false,
            duration: 800
        });
    }, [])

    return <>
        <div className="w-full bg-cover bg-center bg-[url(/posterNew.png)] px-10 py-30 md:py-50 rounded-4xl">
            
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
                        <div></div>
                    </div>
                </div>
            </div>
        
        </div>

        <div className="w-full">
            <div className="w-full flex mt-8 justify-center flex-col">
                <div className="flex-1 text-4xl md:text-6xl">Latest</div>
                <Link to="/opportunities" className="flex-1 text-base font-sans my-4 flex flex-row justify-center items-center hoverColor">View more</Link>
            </div>
            <div className="md:flex md:flex-row md:p-4">
                <NewsItem imageName="slovakia.webp" newsTitle="NSP Slovakia"/>
                <NewsItem imageName="germany.webp" newsTitle="Bachelors in Germany"/>
                <NewsItem imageName="korea.jpg" newsTitle="Masters in Korea"/>
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