import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Notes from "./utilities/Notes";
import { useBaseUrlStore } from "../stores/BaseUrlStore";
import { useAuthStore } from "../stores/AuthStore";


const DocRequestChild = () => {
  const [request, setRequest] = useState({});
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const baseUrl = useBaseUrlStore((s) => s.baseUrl);
  const token = useAuthStore((s) => s.token);

  const { requestId } = useParams();

  const actionButtonText = {
    PENDING : "Start review",
    REVIEWING : "Mark as completed",
    COMPLETED : "Review completed"
  }

  const newStatus = {
    PENDING : "REVIEWING",
    REVIEWING : "COMPLETED"
  }

  useEffect(() => {
    getRequestData();
  }, []);

  const getRequestData = async () => {
    const response = await fetch(
      `${baseUrl}api/v1/admin/getDocRequest/${requestId}`,
      {
        headers : {
          "Authorization": `Bearer ${token}`
        }
      }
    );
    const data = await response.json();
    console.log("Request data: " + JSON.stringify(data));
    setRequest(data);
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return "-";
    const d = new Date(isoString);
    return d.toLocaleString();
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "REVIEWING":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Parent prepares payload for backend here
  const handleSaveNotes = async () => {
    if (!request.id || notes.length === 0) return;

    const payload = notes.map((n) => ({
      docCheckId: request.id, // long
      title: n.title,
      note: n.note,
    }));

    console.log("Notes payload to send:", payload);

    // post the payload
    
    const res = await fetch(`${baseUrl}api/v1/admin/saveDocCheckNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      console.log(data);
    }
    
  };

  const editRequestStatus = async (requestId, status) => {
    if(status==="COMPLETED"){
      console.log("This request is completed");
      return;
    }

    const payload = {
      requestId : requestId,
      status : newStatus[status]
    }

    const response = await fetch(`${baseUrl}api/v1/admin/editDocCheckStatus`, {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b pb-4">
        <div>
          <h2 className="text-xl font-semibold text-[#04322f]">
            Document Check Request
          </h2>
          <p className="text-sm text-gray-600">
            From{" "}
            <span className="font-medium">
              {request.firstname} {request.lastname}
            </span>{" "}
            • Program: <span className="font-medium">{request.program}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(
              request.status
            )}`}
          >
            {request.status}
          </span>
          <span className="text-xs text-gray-500">
            Request ID: <span className="font-mono">{request.id}</span>
          </span>
        </div>
      </div>

      {/* Main details */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Request & applicant info */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#04322f] uppercase tracking-wide">
            Request details
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Applicant</span>
              <span className="font-medium text-gray-800">
                {request.firstname} {request.lastname}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Program</span>
              <span className="font-medium text-gray-800">
                {request.program}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Submitted at</span>
              <span className="text-gray-800">
                {formatDateTime(request.submittedAt)}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Status</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(
                  request.status
                )}`}
              >
                {request.status}
              </span>
            </div>
          </div>

          {request.comment && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-[#04322f] mb-1">
                Applicant comment
              </p>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                {request.comment}
              </p>
            </div>
          )}
        </div>

        {/* Right: Files */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#04322f] uppercase tracking-wide">
            Submitted files
          </h3>

          <div className="border rounded-2xl divide-y">
            {request.allFiles?.map((file, idx) => (
              <div
                key={file.id}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#04322f0f] flex items-center justify-center text-xs font-semibold text-[#04322f]">
                    {idx + 1}
                  </div>
                  <span className="truncate">{file.filename}</span>
                </div>

                <button className="text-xs px-3 py-1.5 rounded-lg border text-[#04322f] hover:bg-[#04322f0f]">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="pt-4 border-t flex flex-wrap gap-2 justify-end">
        <button className="px-4 py-2 rounded-xl border text-gray-700 hover:bg-gray-50 text-sm">
          Back to list
        </button>
        <button
          type="button"
          onClick={() => setShowNotes((prev) => !prev)}
          className="px-4 py-2 rounded-xl border text-[#04322f] hover:bg-[#04322f0f] text-sm"
          disabled={!request.id}
        >
          {showNotes ? "Hide notes" : "Add notes"}
        </button>
        <button className="px-4 py-2 rounded-xl bg-[#04322f] text-[#fffef8] hover:opacity-90 text-sm" 
        disabled={request.status==="COMPLETED"}
        onClick={() => editRequestStatus(request.id, request.status)}
        >
          {actionButtonText[request.status]}
        </button>
      </div>

      {/* Add notes should add a Notes component here */}
      {showNotes && (
        <Notes
          requestId={request.id}
          notes={notes}
          setNotes={setNotes}
          onSave={handleSaveNotes}
        />
      )}
    </section>
  );
};

export default DocRequestChild;
