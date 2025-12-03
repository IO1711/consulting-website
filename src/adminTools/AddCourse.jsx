import { useState } from "react";
import { useBaseUrlStore } from "../stores/BaseUrlStore";
import SuccessTick from "../utility/SuccessTick";
import Loader from "../utility/Loader";

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    about: "",
    langauge: "",
    price: ""
  });
  const baseUrl = useBaseUrlStore((s) => s.baseUrl);
  const [loading, setLoading] = useState(false);
  const [showTick, setShowTick] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setLoading(true);
    console.log(courseData);
    fetch(`${baseUrl}api/v1/admin/saveCourse`, {
      method: "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(courseData)
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(JSON.stringify(data));
      setLoading(false);
      setShowTick(true);
      setTimeout(() => {
        setShowTick(false);
      }, 3000);
    })
  };

  return (
    <>
      <section className="bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-[#04322f] mb-4">
          New Course
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Course Title</label>
            <input
              name="title"
              value={courseData.title}
              onChange={handleChange}
              className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
              placeholder="e.g., Academic Writing B1–B2"
            />
          </div>

          {/* Level (removed because not required in your JSON) */}
          
          {/* Start Date */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={courseData.startDate}
              onChange={handleChange}
              className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={courseData.endDate}
              onChange={handleChange}
              className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
            />
          </div>

          {/* Language */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Language</label>
            <input
              name="language"
              value={courseData.language}
              onChange={handleChange}
              className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
              placeholder="English, Uzbek"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={courseData.price}
              onChange={handleChange}
              className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
              placeholder="400 000, 500 000"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Short Description</label>
            <textarea
              rows="3"
              name="description"
              value={courseData.description}
              onChange={handleChange}
              className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
              placeholder="One–two sentences…"
            />
          </div>

          {/* About / Syllabus */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Syllabus (optional)</label>
            <textarea
              rows="5"
              name="about"
              value={courseData.about}
              onChange={handleChange}
              className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
              placeholder="Topics, weeks, materials…"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-[#04322f] text-[#fffef8] px-5 py-2.5 hover:opacity-90"
            disabled={loading}
          >
            Save Course
          </button>
          {loading && <Loader/>}
          {showTick && <SuccessTick message={"Course saved"}/>}
        </div>
      </section>
    </>
  );
};

export default AddCourse;
