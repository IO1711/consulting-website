import { useParams } from "react-router-dom";
import { useBaseUrlStore } from "../stores/BaseUrlStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/AuthStore";


const RequestPage = () => {

    const {requestId} = useParams();
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);
    const token = useAuthStore((s) => s.token);
    const [request, setRequest] = useState({});
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getRequestDetails()
        getNotes()
    }, []);

    const getRequestDetails = async () => {
        const response = await fetch(`${baseUrl}api/v1/getProtected/getDocRequest/${requestId}`, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        console.log(JSON.stringify(data));
        setRequest(data);
    }

    const getNotes = async () => {
        const response = await fetch(`${baseUrl}api/v1/getProtected/getDocCheckNotes/${requestId}`, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        console.log(JSON.stringify(data));
        setNotes(data);
        //console.log("Request ID: " + requestId);
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* LEFT SIDE — REQUEST INFO */}
            <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Request Details
                </h2>

                {/* Basic Data */}
                <div className="space-y-2 text-gray-700">
                    <p><span className="font-semibold">Program:</span> {request.program}</p>
                    <p><span className="font-semibold">Name:</span> {request.firstname} {request.lastname}</p>
                    <p>
                        <span className="font-semibold">Submitted:</span>{" "}
                        {new Date(request.submittedAt).toLocaleString()}
                    </p>

                    <p>
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                request.status === "COMPLETED"
                                    ? "bg-green-100 text-green-700"
                                    : request.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {request.status}
                        </span>
                    </p>

                    {request.comment && (
                        <p>
                            <span className="font-semibold">Admin Comment:</span>{" "}
                            {request.comment}
                        </p>
                    )}
                </div>

                {/* FILES */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Attached Files ({request.files})</h3>

                    <div className="space-y-2">
                        {request.allFiles?.map((file) => (
                            <div
                                key={file.id}
                                className="p-3 bg-gray-50 border border-gray-200 rounded-md flex items-center justify-between"
                            >
                                <span className="text-gray-700">{file.filename}</span>

                                <button
                                    className="text-blue-600 hover:underline text-sm"
                                    onClick={() => alert("Download not implemented yet")}
                                >
                                    Download
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE — NOTES */}
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Notes
                </h2>

                {notes.length === 0 && (
                    <p className="text-gray-500">No notes found.</p>
                )}

                <div className="space-y-4">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                        >
                            <h3 className="font-semibold text-gray-800">{note.title}</h3>
                            <p className="text-gray-600 mt-1">{note.note}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RequestPage;


/*
const {requestId} = useParams();
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);
    const token = useAuthStore((s) => s.token);

    useEffect(() => {
        getNotes()
    });

    const getNotes = async () => {
        const response = await fetch(`${baseUrl}api/v1/getProtected/getDocCheckNotes/${requestId}`, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        console.log(JSON.stringify(data));
        //console.log("Request ID: " + requestId);
    }
*/