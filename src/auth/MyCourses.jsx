import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/AuthStore";
import { useBaseUrlStore } from "../stores/BaseUrlStore";

const MyCourses = () => {
  const token = useAuthStore((s) => s.token);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = useBaseUrlStore((s) => s.baseUrl);

  useEffect(() => {
    getUserCourses();
  }, []);

  const getUserCourses = async () => {
    try {
      const response = await fetch(
        `${baseUrl}api/v1/getProtected/getUserCourses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      console.log("My courses:", data);
      setCourses(data);
    } catch (err) {
      console.error("Error loading courses:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4">
      
      {/* Loading state */}
      {loading && <div className="text-gray-600">Loading your courses...</div>}

      {/* Empty state */}
      {!loading && courses.length === 0 && (
        <div className="text-gray-600">
          You don't have any courses yet.
        </div>
      )}

      {/* Courses list */}
      {!loading &&
        courses.length > 0 &&
        courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-sm rounded-lg p-4 mb-4 border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-[#032F2C]">
              {course.courseName}
            </h2>
            <p className="text-sm text-gray-500">Progress: {course.progress}%</p>

            <button className="mt-2 px-4 py-1 bg-[#032F2C] text-white text-sm rounded hover:bg-[#05413D]">
              Continue
            </button>
          </div>
        ))}
    </div>
  );
};

export default MyCourses;
