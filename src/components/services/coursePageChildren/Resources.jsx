import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBaseUrlStore } from "../../../stores/BaseUrlStore";
import { useAuthStore } from "../../../stores/AuthStore";

const Resources = () => {

    const {courseId} = useParams();
    const [content, setContent] = useState(null);
    const [resources, setResources] = useState([]);
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);
    const token = useAuthStore((s) => s.token);

    useEffect(() => {
      getResources();
    },[]);

    const getResources = async () => {
      const verificationRes = await fetch(`${baseUrl}api/v1/getProtected/verifyStudent/${courseId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const verificationData = await verificationRes.json();

      if(verificationData.isEnrolled){
        const response = await fetch(`${baseUrl}api/v1/getProtected/getResources/${courseId}`, {
          headers : {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await response.json();

        setContent(
          <section className="md:mb-30">
            <h2 className="mb-3 text-xl font-semibold">Resources</h2>
            <ul className="divide-y rounded-2xl border">
              {data && data.map((r, i) => (
                <li key={i} className="flex items-center justify-between p-4">
                  <span>{r.filename}</span>
                  <a
                    href={`http://localhost:8080/api/v1/get/downloadResource/${encodeURIComponent(r.filename)}`}
                    className="rounded-full border px-3 py-1 text-sm hover:bg-neutral-50"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </li>
              ))}
              {data.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border p-10 text-center bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>

                  <h3 className="text-lg font-semibold text-gray-700 mb-1">
                    No resources yet
                  </h3>
                  <p className="text-gray-500 max-w-sm">
                    Course resources will appear here once they’re uploaded.
                  </p>
                </div>
              )
              }
            </ul>
          </section>
          
        );
      } else if(!verificationData.isEnrolled){
        setContent(
          <div className="flex flex-col items-center justify-center p-10 text-center bg-gray-50 rounded-2xl border max-w-xl mx-auto mt-10 mb-35">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-gray-400 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 10V7a4 4 0 10-8 0v3M5 10h14v10H5V10z" />
            </svg>

            <h2 className="text-xl font-semibold">Access Restricted</h2>
            <p className="text-gray-500">You must enroll to view course resources.</p>
          </div>
        );
      }

      
    }

    /*
    { name: "Cohort Handbook (PDF)" },
        { name: "Sales Call Script (DOC)" },
        { name: "Offer Calculator (Sheet)" },
    */

    return <>
        {content}
    </>
}

export default Resources;