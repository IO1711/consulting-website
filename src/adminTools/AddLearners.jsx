import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBaseUrlStore } from "../stores/BaseUrlStore";
import { useAuthStore } from "../stores/AuthStore";

const AddLearners = () => {
    const { courseId } = useParams();
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);
    const token = useAuthStore((s) => s.token);

    useEffect(() => {
        getLearners();
        getCourseData();
    }, []);

    const [course, setCourse] = useState({});

    const [allLearners, setAllLearners] = useState([]);
    const [enrolledLearners, setEnrolledLearners] = useState([]);

    const [selectedLearners, setSelectedLearners] = useState([]);

    // NEW: Search state
    const [searchTerm, setSearchTerm] = useState("");

    // NEW: Filtered list
    const filteredLearners = allLearners.filter((u) => {
        const full = `${u.firstname} ${u.lastname} ${u.email}`.toLowerCase();
        return full.includes(searchTerm.toLowerCase());
    });

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleAdd = (u) => {
        const payload = { id: u.id, email: u.email, courseId };

        setSelectedLearners(prev => [...prev, payload]);
        setEnrolledLearners(prev => [...prev, u]);
        setAllLearners(prev => prev.filter(l => l.id !== u.id)); 
    };

    const getCourseData = async () => {
        const response = await fetch(`${baseUrl}api/v1/getProtected/getCourse/${courseId}`);
        const data = await response.json();
        console.log(JSON.stringify(data));
        setCourse(data);
    }

    const getLearners = async () => {
        const response = await fetch(`${baseUrl}api/v1/admin/getAllUsers`);
        const data = await response.json();

        const enrolledResponse = await fetch(`${baseUrl}api/v1/getProtected/getLearners/${courseId}`);
        const enrolledData = await enrolledResponse.json();

        console.log(JSON.stringify(data));
        setAllLearners(data);
        setEnrolledLearners(enrolledData);
    }    

    const handleSave = async () => {
        if (selectedLearners.length === 0) return;

        setSaving(true);
        setSaved(false);

        try {
            await fetch(`${baseUrl}api/v1/admin/saveLearners`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(selectedLearners),
            });

            setSaved(true);
            setSelectedLearners([]);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* LEFT PANEL */}
            <div className="md:col-span-1 space-y-6">
                {/* COURSE INFO */}
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">{course.title}</h2>
                    <p className="text-gray-600 mt-2">{course.description}</p>
                    <p className="text-gray-600 mt-2">Course progress: {course.currentProgress}%</p>
                </div>

                {/* ENROLLED LEARNERS */}
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Enrolled Learners</h3>

                    {enrolledLearners.map((u) => (
                        <div key={u.id} className="flex items-center gap-3 p-3 bg-gray-50 border rounded-lg">
                            <img src={u.avatar ? `/${u.avatar}` : "/avatar1.png"} className="w-10 h-10 rounded-full" />
                            <div>
                                <p>{u.firstname} {u.lastname}</p>
                                <p className="text-sm text-gray-600">{u.email}</p>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleSave}
                        disabled={saving || selectedLearners.length === 0}
                        className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                    {saved && <p className="text-green-600 text-sm mt-2">Saved successfully!</p>}
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Learners</h2>

                {/* 🔍 SEARCH BAR */}
                <input
                    type="text"
                    placeholder="Search learners by name or email..."
                    className="w-full mb-4 p-2 border rounded-lg focus:ring focus:ring-blue-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {filteredLearners.length === 0 && (
                    <p className="text-gray-500">No learners found.</p>
                )}

                <div className="space-y-3">
                    {filteredLearners.map((u) => (
                        <div key={u.id} className="flex items-center justify-between p-4 border bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <img src={u.avatar ? `/${u.avatar}` : "/avatar1.png"} className="w-12 h-12 rounded-full" />
                                <div>
                                    <p className="font-medium">{u.firstname} {u.lastname}</p>
                                    <p className="text-sm text-gray-600">{u.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleAdd(u)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                            >
                                Add to Course
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AddLearners;





/*
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);

    useEffect(() => {
        getLearners();
    }, []);

    const getLearners = async () => {
        const response = await fetch(`${baseUrl}api/v1/admin/getAllUsers`);
        const data = await response.json();

        console.log(JSON.stringify(data));
    }
*/