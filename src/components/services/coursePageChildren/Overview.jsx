

const Overview = () => {

    const syllabus = [
        { wk: 1, title: "Positioning & ICP", items: 3 },
        { wk: 2, title: "Offers & Pricing", items: 4 },
        { wk: 3, title: "Lead Gen Basics", items: 5 },
        { wk: 4, title: "Sales Calls", items: 4 },
        { wk: 5, title: "Delivery Systems", items: 4 },
        { wk: 6, title: "Portfolio & Next Steps", items: 3 },
    ];

    return <>
        <section className="grid gap-8 lg:grid-cols-3">
          {/* Left: description */}
          <div className="lg:col-span-2">
            <h2 className="mb-3 text-xl font-semibold">About this course</h2>
            <p className="leading-7 text-neutral-700">
              Learn how to define your consulting niche, craft compelling offers, price with
              confidence, and build a simple, repeatable client pipeline. We work in short
              workshops + weekly implementation sprints so you ship real assets every week.
            </p>

            <h3 className="mt-8 mb-3 text-lg font-semibold">What you’ll build</h3>
            <ul className="space-y-2 text-neutral-700">
              <li>• Clear positioning statement and ICP notes</li>
              <li>• Productized offer page with pricing tiers</li>
              <li>• Simple outreach system + first 20 leads</li>
              <li>• Call script and objection notes</li>
            </ul>
          </div>

          {/* Right: syllabus */}
          <aside className="rounded-2xl border p-5">
            <h3 className="mb-3 text-lg font-semibold">Syllabus (by week)</h3>
            <ul className="space-y-3">
              {syllabus.map((s) => (
                <li key={s.wk} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Week {s.wk}: {s.title}</div>
                    <div className="text-sm text-neutral-500">{s.items} sessions</div>
                  </div>
                  <div className="h-2 w-24 rounded-full bg-neutral-200">
                    <div className="h-2 w-1/2 rounded-full bg-neutral-400" />
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </section>
    </>
}

export default Overview;