import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

const CoursePage = () => {
  // --- temporary test data (same shape as backend) ---
  /*const course = {
    id: 1,
    title: "Best course",
    startDate: "2025-11-19T00:00:00.000+00:00",
    endDate: "2025-11-28T00:00:00.000+00:00",
    description: "very short",
    about: "this is about",
    lengthInWeek: 2,
    currentProgress: 0,
  };*/

  const [course, setCourse] = useState({});

  const {courseId} = useParams();

  useEffect(() => {
    getCourseData()
  }, []);

  const getCourseData = async () => {
    const response = await fetch(`https://consultingserver.onrender.com/api/v1/getProtected/getCourse/${courseId}`)
    const data = await response.json();

    console.log("Fetched: " + JSON.stringify(data));
    setCourse(data);
  }
  
  const formatDate = (isoString) =>
    new Date(isoString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const TABS = [
    {
      name: "Overview",
      link: `/services/consulting/course/${course.id}`,
    },
    {
      name: "Recordings",
      link: `/services/consulting/course/${course.id}/recordings`,
    },
    {
      name: "Resources",
      link: `/services/consulting/course/${course.id}/resources`,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          {course.title}
        </h1>

        {/* Use description as a short subtitle */}
        {/*course.description && (
          <p className="mt-3 text-lg text-neutral-600">
            {course.description}
          </p>
        )*/}

        {/* Meta chips */}
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border px-3 py-1">
            {course.lengthInWeek} week
            {course.lengthInWeek > 1 ? "s" : ""}
          </span>
          <span className="rounded-full border px-3 py-1">
            {formatDate(course.startDate)} – {formatDate(course.endDate)}
          </span>
          {/* Static for now; you can replace with real field later */}
          <span className="rounded-full border px-3 py-1">
            Language: English
          </span>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="mb-1 flex items-end justify-between">
            <span className="text-sm font-medium">Cohort progress</span>
            <span className="text-sm text-neutral-600">
              {course.currentProgress}%
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-neutral-200">
            <div
              className="h-3 rounded-full bg-emerald-700"
              style={{ width: `${course.currentProgress}%` }}
              aria-valuenow={course.currentProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
            />
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="mb-6 flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <NavLink
            key={t.name}
            to={t.link}
            className={({ isActive }) =>
              isActive
                ? "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition border-emerald-800 bg-emerald-800 text-white"
                : "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition hover:border-neutral-400"
            }
            end
          >
            {t.name}
          </NavLink>
        ))}
      </nav>

      <Outlet context={{course}}/>
    </div>
  )
;
};

export default CoursePage;
