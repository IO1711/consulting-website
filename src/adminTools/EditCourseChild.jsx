import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBaseUrlStore } from "../stores/BaseUrlStore";
import { useAuthStore } from "../stores/AuthStore";
import { apiRequest } from "../lib/apiClient";
import { queryKeys } from "../lib/queryKeys";

const EditCourseChild = () => {
  const { courseId } = useParams();
  const [file, setFile] = useState(null);
  const baseUrl = useBaseUrlStore((s) => s.baseUrl);
  const effectiveCourseId = courseId ?? "1";
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  const saveRecordingsMutation = useMutation({
    mutationFn: (payload) =>
      apiRequest(baseUrl, "api/v1/admin/saveRecordings", {
        method: "POST",
        token,
        body: payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.recordings(baseUrl, effectiveCourseId, token),
      });
    },
  });

  const saveResourceMutation = useMutation({
    mutationFn: (payload) =>
      apiRequest(baseUrl, "api/v1/admin/saveResource", {
        method: "POST",
        token,
        body: payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.resources(baseUrl, effectiveCourseId, token),
      });
    },
  });

  // ---- Form 1: list of { code, courseId } ----
  const [recordings, setRecordings] = useState([
    { code: "", courseId: Number(effectiveCourseId) }
  ]);

  const handleRecordingChange = (index, field, value) => {
    setRecordings(prev => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        [field]: value
      };
      return copy;
    });
  };

  const handleAddRecordingRow = () => {
    setRecordings(prev => [
      ...prev,
      { code: "", courseId: Number(effectiveCourseId) }
    ]);
  };

  const handleRemoveRecordingRow = (index) => {
    setRecordings(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitRecordings = (e) => {
    e.preventDefault();

    const payload = recordings.map(r => ({
      code: r.code,
      courseId: Number(effectiveCourseId)
    }));

    // For now just log it – replace with your real API call
    console.log("Submitting recordings payload:", payload);

    saveRecordingsMutation.mutate(payload);
  };

  // ---- Form 2: file upload ----


const handleFileChange = (e) => {
  const selected = e.target.files?.[0] ?? null;
  setFile(selected);
};

const handleSubmitFile = (e) => {
  e.preventDefault();
  if (!file) {
    alert("Please choose a file first.");
    return;
  }

  // Build multipart/form-data with the exact keys:
  // { "file": MultipartFile, "courseId": long }
  const formData = new FormData();
  formData.append("file", file);                        // <-- "file"
  formData.append("courseId", String(effectiveCourseId)); // <-- "courseId" as text (Long on backend)

  console.log("Submitting multipart payload:", {
    file,
    courseId: Number(effectiveCourseId),
  });

  saveResourceMutation.mutate(formData);
};


  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-[#04322f] mb-4">
        Edit Course (ID: {effectiveCourseId})
      </h1>

      {/* --- Form 1: codes + courseId --- */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#04322f22] p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#04322f] mb-4">
          Add / Edit Recordings
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          This will submit an array like:
          <code className="bg-gray-100 px-2 py-1 rounded ml-1 text-xs">
            [&#123; "code": "string", "courseId": {effectiveCourseId} &#125;]
          </code>
        </p>

        <form onSubmit={handleSubmitRecordings} className="space-y-4">
          {recordings.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[1.5fr_auto] gap-3 items-end border border-gray-200 rounded-xl p-3"
            >
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">
                  Recording Code
                </label>
                <input
                  type="text"
                  value={item.code}
                  onChange={(e) =>
                    handleRecordingChange(index, "code", e.target.value)
                  }
                  placeholder="e.g., WEEK1-SESSION1"
                  className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  courseId will be sent as{" "}
                  <span className="font-mono">{effectiveCourseId}</span>
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                {recordings.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRecordingRow(index)}
                    className="px-3 py-2 text-sm rounded-lg border border-red-200 text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={handleAddRecordingRow}
              className="px-4 py-2 text-sm rounded-xl border border-[#04322f33] text-[#04322f]"
            >
              + Add another code
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium rounded-xl bg-[#04322f] text-white hover:bg-[#032521]"
            >
              Submit recordings
            </button>
          </div>
        </form>
      </section>

      {/* --- Form 2: file upload --- */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#04322f22] p-6">
        <h2 className="text-lg font-semibold text-[#04322f] mb-4">
            Upload Course File
        </h2>
        <p className="text-sm text-gray-600 mb-2">
            This will send a <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
            multipart/form-data
            </code>{" "}
            request shaped like:
        </p>
        <pre className="text-xs bg-gray-50 p-2 rounded mb-4 overflow-x-auto">
            {`{
        "file": "<MultipartFile>",
        "courseId": ${effectiveCourseId}
        }`}
        </pre>

        <form onSubmit={handleSubmitFile} className="space-y-4">
            <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">
                Choose file
            </label>
            <input
                type="file"
                onChange={handleFileChange}
                className="rounded-xl border px-3 py-2 bg-white"
            />
            {file && (
                <p className="text-xs text-gray-500 mt-1">
                Selected: {file.name}
                </p>
            )}
            </div>

            <div className="flex justify-end">
            <button
                type="submit"
                className="px-5 py-2 text-sm font-medium rounded-xl bg-[#04322f] text-white hover:bg-[#032521]"
            >
                Upload file
            </button>
            </div>
        </form>
        </section>

    </section>
  );
};

export default EditCourseChild;
