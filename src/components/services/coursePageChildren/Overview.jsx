const Overview = () => {
  // --- temporary test data (same shape as backend) ---
  const course = {
    id: 1,
    title: "Best course",
    startDate: "2025-11-19T00:00:00.000+00:00",
    endDate: "2025-11-28T00:00:00.000+00:00",
    description: "very short",
    about: "this is about",
    lengthInWeek: 2,
    currentProgress: 0,
  };

  // Simple generated syllabus based on lengthInWeek.
  // Later you can replace this with real week-by-week data.
  const syllabus = Array.from({ length: course.lengthInWeek }, (_, i) => {
    const weekNumber = i + 1;
    return {
      wk: weekNumber,
      title: `Week ${weekNumber}`,
      items: 3,
    };
  });

  return (
    <>
      <section className="grid gap-8 lg:grid-cols-3 md:mb-36">
        {/* Left: description */}
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-xl font-semibold">About this course</h2>

          {/* Use "about" for the main paragraph, fall back to description */}
          <p className="leading-7 text-neutral-700">
            {course.about || course.description}
          </p>

          <h3 className="mt-8 mb-3 text-lg font-semibold">Details</h3>
          <ul className="space-y-2 text-neutral-700">
            <li>• Duration: {course.lengthInWeek} week(s)</li>
            <li>• Short description: {course.description}</li>
          </ul>
        </div>

        {/* Right: syllabus */}
        <aside className="rounded-2xl border p-5">
          <h3 className="mb-3 text-lg font-semibold">
            Syllabus (by week)
          </h3>
          <ul className="space-y-3">
            {syllabus.map((s) => (
              <li key={s.wk} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    Week {s.wk}: {s.title}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {s.items} sessions
                  </div>
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
  );
};

export default Overview;
