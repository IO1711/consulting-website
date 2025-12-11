import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBaseUrlStore } from "../stores/BaseUrlStore";
import { useAuthStore } from "../stores/AuthStore";

const DocRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const baseUrl = useBaseUrlStore((s) => s.baseUrl);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    fetchDocRequests();
  }, []);

  const fetchDocRequests = async () => {
    try {
      const response = await fetch(
        `${baseUrl}api/v1/admin/getDocRequests`,
        {
          headers : {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch doc requests");
      }
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    }
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

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const d = new Date(isoString);
    return d.toLocaleDateString(); // e.g. 24/11/2025
  };

  const handleEdit = (request) => {
    navigate(`/adminPage/docRequests/${request.id}`);
  }

  return (
    <>
      <section className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-[#04322f]">
            Document Check Requests
          </h2>
          <p className="text-sm text-gray-600">
            Users uploaded files to be reviewed.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#04322f0d] text-[#04322f]">
                <th className="p-3">Name</th>
                <th className="p-3">Program</th>
                <th className="p-3">Files</th>
                <th className="p-3">Submitted</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">
                    {r.firstname} {r.lastname}
                  </td>
                  <td className="p-3">{r.program}</td>

                  {/* You can replace "-" with real file count once backend returns it */}
                  <td className="p-3">{r.files}</td>

                  <td className="p-3">{formatDate(r.submittedAt)}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusClasses(
                        r.status
                      )}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="flex justify-center p-3">
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg border hover:bg-[#04322f0f]" onClick={() => handleEdit(r)}>
                        View
                      </button>
                      <button className="px-3 py-1.5 rounded-lg border hover:bg-[#04322f0f]">
                        Notes
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-4 text-center text-gray-500 text-sm"
                  >
                    No document check requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default DocRequests;
