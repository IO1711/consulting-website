import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useBaseUrlStore } from "../../../stores/BaseUrlStore";
import { useAuthStore } from "../../../stores/AuthStore";
import { apiRequest } from "../../../lib/apiClient";
import { queryKeys } from "../../../lib/queryKeys";

const Recordings = () => {
  const { courseId } = useParams();
  const baseUrl = useBaseUrlStore((s) => s.baseUrl);
  const token = useAuthStore((s) => s.token);

  const { data: verificationData, isLoading: isVerificationLoading } = useQuery({
    queryKey: queryKeys.verifyStudent(baseUrl, courseId, token),
    queryFn: () =>
      apiRequest(baseUrl, `api/v1/getProtected/verifyStudent/${courseId}`, {
        token,
      }),
    enabled: Boolean(courseId && token),
  });

  const isEnrolled = Boolean(verificationData?.isEnrolled);

  const { data: recordings = [], isLoading: isRecordingsLoading } = useQuery({
    queryKey: queryKeys.recordings(baseUrl, courseId, token),
    queryFn: () =>
      apiRequest(baseUrl, `api/v1/getProtected/getRecordings/${courseId}`, {
        token,
      }),
    enabled: Boolean(courseId && token && isEnrolled),
  });

  if (isVerificationLoading || (isEnrolled && isRecordingsLoading)) {
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  if (!isEnrolled) {
    return (
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
        <p className="text-gray-500">You must enroll to view session recordings.</p>
      </div>
    );
  }

  return (
    <section className="md:mb-30">
      <h2 className="mb-4 text-xl font-semibold">Session recordings</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recordings.map((v) => (
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

            <h3 className="text-lg font-semibold text-gray-700 mb-1">No recordings yet</h3>
            <p className="text-gray-500 max-w-sm">
              Session recordings will appear here once they&apos;re uploaded.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recordings;
