
const EditCourse = () => {
    return <>
        <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#04322f]">Courses</h2>
              <div className="w-full max-w-xs">
                <input
                  className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#04322f33]"
                  placeholder="Search courses…"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Academic Writing B1–B2", learners: 28, progress: 40 },
                { title: "IELTS Speaking Club", learners: 52, progress: 70 },
                { title: "Web Dev Basics", learners: 18, progress: 15 },
              ].map((c, i) => (
                <div
                  key={i}
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
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-gray-600">{c.progress}%</p>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl border text-[#04322f] hover:bg-[#04322f0f]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-[#04322f] text-[#fffef8] hover:opacity-90"
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
    </>
}

export default EditCourse;