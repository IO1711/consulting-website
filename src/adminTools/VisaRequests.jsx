
const VisaRequests = () => {
    return <>
        <section className="bg-white rounded-2xl shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-[#04322f]">
                Visa Help Requests
              </h2>
              <p className="text-sm text-gray-600">
                Contact info, destination and purpose submitted by users.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#04322f0d] text-[#04322f]">
                    <th className="text-left p-3">Contact</th>
                    <th className="text-left p-3">Country</th>
                    <th className="text-left p-3">Purpose</th>
                    <th className="text-left p-3">Submitted</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["@ozoda", "Italy", "Study", "10 Nov", "Pending"],
                    ["+998 90 000 00 00", "Germany", "Work", "09 Nov", "Contacted"],
                    ["ozoda@example.com", "UAE", "Travel", "07 Nov", "Completed"],
                  ].map((r, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">{r[0]}</td>
                      <td className="p-3">{r[1]}</td>
                      <td className="p-3">{r[2]}</td>
                      <td className="p-3">{r[3]}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            r[4] === "Completed"
                              ? "bg-green-100 text-green-700"
                              : r[4] === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {r[4]}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 rounded-lg border hover:bg-[#04322f0f]">
                            View
                          </button>
                          <button className="px-3 py-1.5 rounded-lg border hover:bg-[#04322f0f]">
                            Assign
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
    </>
}

export default VisaRequests;