import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Recordings = () => {
    //http://localhost:8080/api/v1/get/
    const {course} = useOutletContext();

    const [recordings, setRecordings] = useState([]);

    useEffect(() => {
      getRecordings();
    },[]);

    const getRecordings = async () => {
      const response = await fetch(`https://consultingserver.onrender.com/api/v1/getProtected/getRecordings/${course.id}`)
      const data = await response.json();

      setRecordings(data);
    }

    /*
    { id: "dQw4w9WgXcQ", title: "Kickoff & Orientation" },
        { id: "9bZkp7q19f0", title: "Positioning Workshop" },
        { id: "uhLLvhDUdu0", title: "Pricing Deep Dive" },
    */

    return <>
        <section className="md:mb-15">
          <h2 className="mb-4 text-xl font-semibold">Session recordings</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recordings && recordings.map((v) => (
              <div key={v.id} className="overflow-hidden rounded-2xl border">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${v.code}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <div className="font-medium">{v.title}</div>
                </div>
              </div>
            ))}
            {recordings.length === 0 && (
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
                  No recordings yet
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Session recordings will appear here once they’re uploaded.
                </p>
              </div>
            )
            }
          </div>
        </section>
    </>
}

export default Recordings;