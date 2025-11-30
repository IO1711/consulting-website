import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Resources = () => {

    const {course} = useOutletContext();

    const [resources, setResources] = useState([]);

    useEffect(() => {
      getResources();
    },[]);

    const getResources = async () => {
      const response = await fetch(`https://consultingserver.onrender.com/api/v1/getProtected/getResources/${course.id}`)
      const data = await response.json();

      console.log("Resources: " + JSON.stringify(data));
      setResources(data);
    }

    /*
    { name: "Cohort Handbook (PDF)" },
        { name: "Sales Call Script (DOC)" },
        { name: "Offer Calculator (Sheet)" },
    */

    return <>
        <section className="md:mb-30">
          <h2 className="mb-3 text-xl font-semibold">Resources</h2>
          <ul className="divide-y rounded-2xl border">
            {resources && resources.map((r, i) => (
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
            {resources.length === 0 && (
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
    </>
}

export default Resources;