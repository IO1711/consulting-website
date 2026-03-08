import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useBaseUrlStore } from "../stores/BaseUrlStore";
import { apiRequest } from "../lib/apiClient";
import { queryKeys } from "../lib/queryKeys";

const normalizeText = (value) => String(value ?? "").toLowerCase();

const SearchBar = ({ mobile = false }) => {
  const baseUrl = useBaseUrlStore((s) => s.baseUrl);
  const [query, setQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const shouldLoadData = !mobile || isMobileOpen;
  const trimmedQuery = query.trim();
  const normalizedQuery = normalizeText(trimmedQuery);

  const { data: courses = [], isLoading: isCoursesLoading } = useQuery({
    queryKey: queryKeys.courses(baseUrl),
    queryFn: () => apiRequest(baseUrl, "api/v1/get/allCourses"),
    enabled: shouldLoadData,
  });

  const { data: opportunities = [], isLoading: isOpportunitiesLoading } =
    useQuery({
      queryKey: queryKeys.opportunities(baseUrl),
      queryFn: () => apiRequest(baseUrl, "api/v1/get/allOpportunities"),
      enabled: shouldLoadData,
    });

  const courseResults = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return courses
      .filter((course) =>
        [course.title, course.description].some((field) =>
          normalizeText(field).includes(normalizedQuery)
        )
      )
      .slice(0, 6);
  }, [courses, normalizedQuery]);

  const opportunityResults = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return opportunities
      .filter((opportunity) =>
        [
          opportunity.country,
          opportunity.programType,
          opportunity.degreeReq,
          opportunity.description,
        ].some((field) => normalizeText(field).includes(normalizedQuery))
      )
      .slice(0, 6);
  }, [opportunities, normalizedQuery]);

  const isLoading = isCoursesLoading || isOpportunitiesLoading;
  const showResults = normalizedQuery.length > 0;

  const closeMobileSearch = () => {
    setIsMobileOpen(false);
    setQuery("");
  };

  useEffect(() => {
    if (!mobile || !isMobileOpen) {
      return;
    }

    inputRef.current?.focus();
  }, [mobile, isMobileOpen]);

  useEffect(() => {
    if (!mobile || !isMobileOpen) {
      return;
    }

    const onPointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        closeMobileSearch();
      }
    };

    const onEscape = (event) => {
      if (event.key === "Escape") {
        closeMobileSearch();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onEscape);
    };
  }, [mobile, isMobileOpen]);

  const handleResultClick = () => {
    if (mobile) {
      closeMobileSearch();
      return;
    }

    setQuery("");
  };

  const resultWindow = (
    <div
      className={clsx(
        "rounded-2xl border border-[#04322f22] bg-white shadow-lg",
        mobile
          ? "mt-3 max-h-[70vh] overflow-y-auto p-4"
          : "absolute right-0 z-50 mt-2 w-[32rem] max-w-[calc(100vw-2rem)] overflow-hidden"
      )}
    >
      {isLoading ? (
        <div className="p-4 text-sm text-neutral-600">Searching...</div>
      ) : (
        <div className={clsx("grid gap-5", mobile ? "" : "p-4 md:grid-cols-2")}>
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#04322f99]">
              Courses
            </h3>
            <div className="mt-2 space-y-2">
              {courseResults.length === 0 ? (
                <p className="text-sm text-neutral-500">No matching courses.</p>
              ) : (
                courseResults.map((course) => (
                  <Link
                    key={course.id}
                    to={`/services/consulting/course/${course.id}`}
                    onClick={handleResultClick}
                    className="block rounded-xl border border-transparent px-3 py-2 text-sm hover:border-[#04322f22] hover:bg-[#04322f08]"
                  >
                    <div className="font-medium text-neutral-900">{course.title}</div>
                    <div className="line-clamp-2 text-xs text-neutral-600">
                      {course.description}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#04322f99]">
              Opportunities
            </h3>
            <div className="mt-2 space-y-2">
              {opportunityResults.length === 0 ? (
                <p className="text-sm text-neutral-500">No matching opportunities.</p>
              ) : (
                opportunityResults.map((opportunity) => (
                  <Link
                    key={opportunity.id}
                    to={`/opportunities?opportunity=${opportunity.id}`}
                    onClick={handleResultClick}
                    className="block rounded-xl border border-transparent px-3 py-2 text-sm hover:border-[#04322f22] hover:bg-[#04322f08]"
                  >
                    <div className="font-medium text-neutral-900">
                      {opportunity.country}
                    </div>
                    <div className="text-xs text-neutral-600">
                      {opportunity.programType}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );

  if (mobile) {
    return (
      <div ref={wrapperRef} className="md:hidden">
        <button
          type="button"
          className="inline-flex h-[2.5em] w-[2.5em] items-center justify-center rounded-full hover:bg-[#04322f14]"
          aria-label="Open search"
          onClick={() => setIsMobileOpen(true)}
        >
          <img src="/search.png" className="icon" alt="" />
        </button>

        {isMobileOpen && (
          <div className="fixed inset-x-0 top-0 z-[70] border-b border-[#04322f22] bg-[#fffef8] p-4 shadow-md">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex items-center gap-3">
                <div className="flex flex-1 items-center rounded-full border border-[#04322f33] bg-white px-3">
                  <img src="/search.png" className="icon-small mr-2" alt="" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="h-11 w-full bg-transparent text-sm outline-none"
                    placeholder="Search courses and opportunities..."
                  />
                </div>
                <button
                  type="button"
                  className="rounded-full border border-[#04322f33] px-4 py-2 text-sm"
                  onClick={closeMobileSearch}
                >
                  Close
                </button>
              </div>

              {showResults && resultWindow}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative hidden md:block">
      <div className="flex h-11 w-[20rem] max-w-[40vw] items-center rounded-full border border-[#04322f33] bg-white px-3">
        <img src="/search.png" className="icon-small mr-2" alt="" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-full w-full bg-transparent text-sm outline-none"
          placeholder="Search courses and opportunities..."
        />
      </div>

      {showResults && resultWindow}
    </div>
  );
};

export default SearchBar;
