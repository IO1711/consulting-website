
const Resources = () => {

    const resources = [
        { name: "Cohort Handbook (PDF)" },
        { name: "Sales Call Script (DOC)" },
        { name: "Offer Calculator (Sheet)" },
    ];

    return <>
        <section>
          <h2 className="mb-3 text-xl font-semibold">Resources</h2>
          <ul className="divide-y rounded-2xl border">
            {resources.map((r, i) => (
              <li key={i} className="flex items-center justify-between p-4">
                <span>{r.name}</span>
                <button className="rounded-full border px-3 py-1 text-sm hover:bg-neutral-50">
                  View
                </button>
              </li>
            ))}
          </ul>
        </section>
    </>
}

export default Resources;