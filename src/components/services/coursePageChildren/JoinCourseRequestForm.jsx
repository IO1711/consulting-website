import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../../stores/AuthStore";
import SuccessTick from "../../../utility/SuccessTick";
import { useBaseUrlStore } from "../../../stores/BaseUrlStore";
import { apiRequest } from "../../../lib/apiClient";

const JoinCourseRequestForm = () => {
    const { courseId } = useParams();
    const token = useAuthStore((s) => s.token);
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);
    const [formData, setFormData] = useState({
        courseId: courseId,
        school: "",
        degree: "",
        major: "",
        year: "",
    });

    const [success, setSuccess] = useState(false);

    const degreeOptions = ["Bachelors", "Masters", "PhD"];
    const yearOptions = [1, 2, 3, 4, 5, 6, 7];

    const joinRequestMutation = useMutation({
        mutationFn: (payload) =>
            apiRequest(baseUrl, "api/v1/request/joinCourse", {
                method: "POST",
                token,
                body: payload,
            }),
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        await joinRequestMutation.mutateAsync(formData);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 700);
    };

    const loading = joinRequestMutation.isPending;

    return (
        <div className="max-w-xl mx-auto mt-10 mb-15 bg-[#fffef8] shadow-md p-8 rounded-xl border border-gray-200">

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Join Course Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* SCHOOL */}
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">School</label>
                    <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring focus:ring-green-200"
                        placeholder="Your university or school"
                    />
                </div>

                {/* DEGREE */}
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Degree</label>
                    <select
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg bg-white"
                    >
                        <option value="">Select degree</option>
                        {degreeOptions.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                {/* MAJOR */}
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Major</label>
                    <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:ring focus:ring-green-200"
                        placeholder="Your major or field"
                    />
                </div>

                {/* YEAR */}
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Year of Study</label>
                    <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg bg-white"
                    >
                        <option value="">Select year</option>
                        {yearOptions.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                {/* COURSE ID */}
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Course ID</label>
                    <input
                        type="text"
                        value={courseId}
                        disabled
                        className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 rounded-lg text-white font-medium transition-colors"
                    style={{
                        backgroundColor: loading ? "#4F6F6A" : "#003B36",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                    onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = "#002F2C")}
                    onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = "#003B36")}
                >
                    {loading ? "Submitting..." : "Submit Request"}
                </button>

                {success && (
                    <SuccessTick message={"Your request has been sent"}/>
                )}
            </form>
        </div>
    );
};

export default JoinCourseRequestForm;
