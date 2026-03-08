import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useBaseUrlStore } from "../stores/BaseUrlStore";
import { useAuthStore } from "../stores/AuthStore";
import Loader from "../utility/Loader";
import { apiRequest } from "../lib/apiClient";
import { queryKeys } from "../lib/queryKeys";

const ManageJoinRequests = () => {
    const { courseId } = useParams();

    const [requests, setRequests] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);
    const token = useAuthStore((s) => s.token);
    const queryClient = useQueryClient();

    const { data: course = null, isLoading: isCourseLoading } = useQuery({
        queryKey: queryKeys.course(baseUrl, courseId),
        queryFn: () =>
            apiRequest(baseUrl, `api/v1/get/getCourse/${courseId}`, { token }),
        enabled: Boolean(courseId),
    });

    const { data: joinRequestsData = [], isLoading: isRequestsLoading } = useQuery({
        queryKey: queryKeys.joinRequests(baseUrl, courseId, token),
        queryFn: () =>
            apiRequest(baseUrl, `api/v1/admin/getCourseJoinRequests/${courseId}`, {
                token,
            }),
        enabled: Boolean(courseId && token),
    });

    useEffect(() => {
        setRequests(joinRequestsData);
    }, [joinRequestsData]);

    const rejectRequestMutation = useMutation({
        mutationFn: (requestId) =>
            apiRequest(baseUrl, `api/v1/admin/deleteCourseJoinRequest/${requestId}`, {
                method: "DELETE",
                token,
            }),
        onSuccess: (_, requestId) => {
            queryClient.setQueryData(
                queryKeys.joinRequests(baseUrl, courseId, token),
                (prev = []) => prev.filter((item) => item.id !== requestId)
            );
        },
    });

    const saveApprovedMutation = useMutation({
        mutationFn: (payload) =>
            apiRequest(baseUrl, "api/v1/admin/saveLearners", {
                method: "POST",
                token,
                body: payload,
            }),
        onSuccess: () => {
            setApprovedUsers([]);
            queryClient.invalidateQueries({
                queryKey: queryKeys.learners(baseUrl, courseId, token),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.course(baseUrl, courseId),
            });
        },
    });

    const handleApprove = (req) => {
        const approved = {
            id: req.userId,
            email: req.email,
            courseId: courseId
        };

        setApprovedUsers(prev => [...prev, approved]);
        setRequests(prev => prev.filter(r => r.userId !== req.userId));
        queryClient.setQueryData(
            queryKeys.joinRequests(baseUrl, courseId, token),
            (prev = []) => prev.filter((item) => item.userId !== req.userId)
        );
    };

    const handleReject = async (req) => {
        await rejectRequestMutation.mutateAsync(req.id);
        setRequests(prev => prev.filter(r => r.userId !== req.userId));
    };

    const handleSaveApproved = async () => {
        if (approvedUsers.length === 0) return;
        await saveApprovedMutation.mutateAsync(approvedUsers);
    };

    const getButtonStyle = (disabled = false) => ({
        backgroundColor: disabled ? "#4F6F6A" : "#003B36",
        cursor: disabled ? "not-allowed" : "pointer",
    });

    const loading = isCourseLoading || isRequestsLoading;

    if (!course && loading) return <div className="p-6">Loading...</div>;
    if (!course) return <div className="p-6">Could not load course.</div>;

    return <>
        {loading && <Loader/>}
        {!loading && <div className="max-w-7xl mx-auto mt-10 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#fffef8]">

            {/* LEFT SIDE */}
            <div className="md:col-span-1 space-y-6">

                {/* COURSE INFORMATION */}
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">{course.title}</h2>

                    <div className="mt-4 text-gray-700 space-y-1">
                        <p><span className="font-semibold">Start:</span> {new Date(course.startDate).toLocaleDateString()}</p>
                        <p><span className="font-semibold">End:</span> {new Date(course.endDate).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Progress:</span> {course.currentProgress}%</p>
                    </div>
                </div>

                {/* APPROVED USERS */}
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Approved Learners</h3>

                    {approvedUsers.length === 0 ? (
                        <p className="text-gray-500">No approved users.</p>
                    ) : (
                        <div className="space-y-3">
                            {approvedUsers.map((u) => (
                                <div key={u.id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                    <p className="text-gray-800 font-medium">{u.email}</p>
                                    <p className="text-sm text-gray-600">ID: {u.id}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* SAVE CHANGES BUTTON */}
                    <button
                        onClick={handleSaveApproved}
                        disabled={approvedUsers.length === 0}
                        className="w-full mt-4 py-2 text-white rounded-lg font-medium transition-colors"
                        style={getButtonStyle(approvedUsers.length === 0)}
                        onMouseOver={(e) => approvedUsers.length > 0 && (e.currentTarget.style.backgroundColor = "#002F2C")}
                        onMouseOut={(e) => approvedUsers.length > 0 && (e.currentTarget.style.backgroundColor = "#003B36")}
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            {/* RIGHT SIDE — REQUEST LIST */}
            <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Requests</h2>

                {requests.length === 0 ? (
                    <p className="text-gray-500">No pending requests.</p>
                ) : (
                    <div className="space-y-4">
                        {requests.map((req) => (
                            <div
                                key={req.userId}
                                className="p-4 border border-gray-200 bg-gray-50 rounded-lg flex flex-col gap-3"
                            >
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {req.firstname} {req.lastname}
                                    </p>
                                    <p className="text-gray-600">{req.email}</p>
                                </div>

                                <div className="text-gray-700 space-y-1 text-sm">
                                    <p><span className="font-semibold">School:</span> {req.school}</p>
                                    <p><span className="font-semibold">Degree:</span> {req.degree}</p>
                                    <p><span className="font-semibold">Major:</span> {req.major}</p>
                                    <p><span className="font-semibold">Year:</span> {req.year}</p>
                                </div>

                                {/* BUTTONS */}
                                <div className="flex gap-3 mt-2">

                                    {/* APPROVE */}
                                    <button
                                        onClick={() => handleApprove(req)}
                                        className="px-4 py-2 text-white rounded-lg font-medium"
                                        style={getButtonStyle()}
                                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#002F2C")}
                                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#003B36")}
                                    >
                                        Approve
                                    </button>

                                    {/* REJECT */}
                                    <button
                                        onClick={() => handleReject(req)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                                    >
                                        Reject
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>}
    </>;
};

export default ManageJoinRequests;
