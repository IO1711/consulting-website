
const AddCourse = () => {
    return <>
        <section className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-[#04322f] mb-4">
              New Course
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Course Title</label>
                <input
                  className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
                  placeholder="e.g., Academic Writing B1–B2"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Level</label>
                <select className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]">
                  <option>A2</option>
                  <option>B1</option>
                  <option>B2</option>
                  <option>C1</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
                />
              </div>
              <div className="md:col-span-2 flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Short Description</label>
                <textarea
                  rows="3"
                  className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
                  placeholder="One–two sentences…"
                />
              </div>
              <div className="md:col-span-2 flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Syllabus (optional)</label>
                <textarea
                  rows="5"
                  className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
                  placeholder="Topics, weeks, materials…"
                />
              </div>
            </div>
            <div className="pt-4">
              <button
                type="button"
                className="rounded-xl bg-[#04322f] text-[#fffef8] px-5 py-2.5 hover:opacity-90"
              >
                Save Course
              </button>
            </div>
          </section>
    </>
}

export default AddCourse;