import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBaseUrlStore } from "../stores/BaseUrlStore";
import Loader from "../utility/Loader";

const EditCourse = () => {

    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");   // 🔍 search state
    const navigate = useNavigate();
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      getAllCourses();
    }, []);

    const getAllCourses = async () => {
      const response = await fetch(`${baseUrl}api/v1/get/allCourses`);
      const data = await response.json();
      setCourses(data);
    };

    const handleEdit = (courseId) => {
      navigate(`/adminPage/editCourse/${courseId}`);
    };

    const handleAddLearners = (courseId) => {
      navigate(`/adminPage/addLearners/${courseId}`);
    }

    const handleManageRequests = (courseId) => {
      navigate(`/adminPage/manageJoinRequests/${courseId}`)
    }

    const handleDelete = async (courseId) => {
      setLoading(true);
      const response = await fetch(`${baseUrl}api/v1/admin/deleteCourse/${courseId}`, {
        method: "DELETE"
      });
      const data = await response.json();
      setLoading(false);
      getAllCourses();

      console.log(JSON.stringify(data));
    }

    // 🔎 COMPUTED FILTERED COURSES
    const filteredCourses = courses.filter((c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <>
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#04322f]">Courses</h2>

            {/* Search Input */}
            <div className="w-full max-w-xs">
              <input
                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
                placeholder="Search courses…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}  // 🔥 UPDATE SEARCH
              />
            </div>
          </div>

          {/* LIST OF FILTERED COURSES */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredCourses.map((c, i) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[#04322f]">{c.title}</h3>
                    <p className="text-sm text-gray-600">
                      {c.learners} learners • Cohort progress
                    </p>
                  </div>

                  <span className="text-xs px-2 py-1 rounded-full bg-[#04322f14] text-[#04322f]">
                    #{i + 1}
                  </span>
                </div>

                <div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#04322f]"
                      style={{ width: `${c.currentProgress}%` }}
                    />
                  </div>
                  <p className="text-xs mt-1 text-gray-600">{c.currentProgress}%</p>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl border text-[#04322f] hover:bg-[#04322f0f]"
                    onClick={() => handleEdit(c.id)}
                  >
                    Edit
                  </button>
                </div>
                
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl border text-[#04322f] hover:bg-[#04322f0f]"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                  {loading && <Loader/>}
                </div>
                
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl border text-[#04322f] hover:bg-[#04322f0f]"
                    onClick={() => handleAddLearners(c.id)}
                  >
                    Add learners
                  </button>
                  {loading && <Loader/>}
                </div>
                
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl border text-[#04322f] hover:bg-[#04322f0f]"
                    onClick={() => handleManageRequests(c.id)}
                  >
                    Manage requests
                  </button>
                  {loading && <Loader/>}
                </div>
              </div>
            ))}
          </div>
            
          {/* No results message */}
          {filteredCourses.length === 0 && (
            <p className="text-gray-500 mt-4">No courses found.</p>
          )}
        </section>
      </>
    );
};

export default EditCourse;
