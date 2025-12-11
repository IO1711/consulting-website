import { useState } from "react";
import { useBaseUrlStore } from "../stores/BaseUrlStore";
import { useAuthStore } from "../stores/AuthStore";

const AddOpportunity = () => {
  const [newOpportunity, setNewOpportunity] = useState({
    country: "",
    programType: "",
    ageReq: "", // example: 28-35
    degreeReq: "",
    startDate: "",
    regDeadline: "",
    description: "",
    link: ""
  });
  const baseUrl = useBaseUrlStore((s) => s.baseUrl);
  const token = useAuthStore((s) => s.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOpportunity((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}api/v1/admin/saveOpportunity`, {
      method: "POST",
      headers : {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newOpportunity)
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(JSON.stringify(data))
    })
  };

  return (
    <section className="bg-[#fffef8] rounded-3xl shadow-md border border-[#04322f22] p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#04322f] mb-6 tracking-tight">
        Add New Opportunity
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Country */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#04322f] mb-1">
              Country
            </label>
            <input
              name="country"
              value={newOpportunity.country}
              onChange={handleChange}
              className="rounded-xl border border-[#04322f33] bg-white px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#04322f55] transition"
              placeholder="e.g., Italy"
            />
          </div>

          {/* Program Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#04322f] mb-1">
              Program Type
            </label>
            <select
              name="programType"
              value={newOpportunity.programType}
              onChange={handleChange}
              className="rounded-xl border border-[#04322f33] bg-white px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#04322f55] transition"
            >
              <option value="">Select type</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Internship">Internship</option>
              <option value="Conference">Conference</option>
              <option value="Grant">Grant</option>
            </select>
          </div>

          {/* Age Requirement */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#04322f] mb-1">
              Age Requirement
            </label>
            <input
              name="ageReq"
              value={newOpportunity.ageReq}
              onChange={handleChange}
              className="rounded-xl border border-[#04322f33] bg-white px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#04322f55]"
              placeholder="e.g., 18–30"
            />
          </div>

          {/* Degree Requirement */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#04322f] mb-1">
              Degree Requirement
            </label>
            <input
              name="degreeReq"
              value={newOpportunity.degreeReq}
              onChange={handleChange}
              className="rounded-xl border border-[#04322f33] bg-white px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#04322f55]"
              placeholder="e.g., Bachelor’s, Master’s"
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#04322f] mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={newOpportunity.startDate}
              onChange={handleChange}
              className="rounded-xl border border-[#04322f33] bg-white px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#04322f55]"
            />
          </div>

          {/* Registration Deadline */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#04322f] mb-1">
              Registration Deadline
            </label>
            <input
              type="date"
              name="regDeadline"
              value={newOpportunity.regDeadline}
              onChange={handleChange}
              className="rounded-xl border border-[#04322f33] bg-white px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#04322f55]"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-[#04322f] mb-1">
              Short Description
            </label>
            <textarea
              rows="4"
              name="description"
              value={newOpportunity.description}
              onChange={handleChange}
              className="rounded-xl border border-[#04322f33] bg-white px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#04322f55]"
              placeholder="Brief summary of the opportunity..."
            />
          </div>

          {/* Link */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-[#04322f] mb-1">
              Official Link
            </label>
            <input
              name="link"
              value={newOpportunity.link}
              onChange={handleChange}
              className="rounded-xl border border-[#04322f33] bg-white px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#04322f55]"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-[#04322f] text-[#fffef8] px-6 py-2.5 font-medium hover:opacity-90 active:scale-[0.98] transition"
          >
            Save Opportunity
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddOpportunity;
