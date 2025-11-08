import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const CoursePage = () => {
  // --- dummy data (replace with real) ---
  const course = {
    title: "Consulting Essentials — Cohort Autumn",
    subtitle: "From idea to offer: positioning, pricing, client pipeline.",
    language: "English",
    duration: "6 weeks",
    cadence: "2×/week • 90 min",
    progress: 42, // group progress %
  };

  // --- tabs ---
  const TABS = [
    {
        name:"Overview",
        link: "/services/consulting/course"
    }, 
    {
        name: "Recordings",
        link: "/services/consulting/course/recordings"
    }, 
    {
        name: "Resources",
        link: "/services/consulting/course/resources"
    }
    ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight">{course.title}</h1>
        <p className="mt-3 text-lg text-neutral-600">{course.subtitle}</p>

        {/* Meta chips */}
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border px-3 py-1">{course.duration}</span>
          <span className="rounded-full border px-3 py-1">{course.cadence}</span>
          <span className="rounded-full border px-3 py-1">Language: {course.language}</span>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="mb-1 flex items-end justify-between">
            <span className="text-sm font-medium">Cohort progress</span>
            <span className="text-sm text-neutral-600">{course.progress}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-neutral-200">
            <div
              className="h-3 rounded-full bg-emerald-700"
              style={{ width: `${course.progress}%` }}
              aria-valuenow={course.progress}
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
            className={({isActive})=> 
                (isActive ? "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition border-emerald-800 bg-emerald-800 text-white" 
                    : "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition hover:border-neutral-400")}
          end>
            {t.name}
          </NavLink>
        ))}
      </nav>
      <Outlet/>
    </div>
  );
};

export default CoursePage;
