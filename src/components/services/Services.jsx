import { useState } from "react";
import { useAuthStore } from "../../stores/AuthStore";
import Button from "../Button";
import ServiceCard from "./ServiceCard";
import { useBaseUrlStore } from "../../stores/BaseUrlStore";

const Services = () => {

    const token = useAuthStore((s) => s.token);
    const [apiRes, setApiRes] = useState("");
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);
    
    const testApi = async () => {

        const res = await fetch(`${baseUrl}api/v1/get/`, {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });

        const data = await res.json();

        setApiRes(JSON.stringify(data));
    }

    const servicesLibrary = [
        {
            id: 1,
            title: "Consulting",
            iconImage: "consulting.png",
            description: "1-on-1 strategy for study, job, and scholarship goals.",
            fullDescription: `We review your profile, map scholarship options, clarify deadlines,
                prepare your timeline, and show what documents you need to work on first.`,
            link: "/services/consulting"
        },
        {
            id: 2,
            title: "Check documents",
            iconImage: "contract.png",
            description: "Review of CV, motivation letter, SoP, and forms.",
            fullDescription: `You get clear edits for structure, clarity, grammar, tone, formatting,
                and alignment with your chosen program’s requirements.`,
            link: "/services/checkdocs"
        },
        {
            id: 3,
            title: "Help with visa",
            iconImage: "visa.png",
            description: "Guidance for visa requirements and application flow.",
            fullDescription: `We help with document lists, financial proof, cover letters, and mock
                Q&A so your file is complete and ready for submission.`,
            link: "/services/visahelp"
        }
    ]

    return <>
        <section className="mx-auto max-w-6xl px-4 py-16">
            <h1 className="mb-12 text-center text-5xl font-semibold">Services</h1>

            <h3 className="mb-12 text-center text-xl">Select a service</h3>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                {servicesLibrary.map(service => {
                    return <ServiceCard key={service.id} link={service.link} title={service.title} iconImage={service.iconImage} description={service.description} fullDescription={service.fullDescription}/>
                })}
            </div>
        </section>

    </>
}


export default Services;
