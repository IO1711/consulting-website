import ConsultingCard from "./ConsultingCard";

const Consulting = () => {

    const courses = [
    {
      id: 1,
      name: "Academic Writing & Research Methods",
      desc:
        "Structure your paper, craft strong arguments, and master citations, literature reviews, and peer-review basics.",
    },
    {
      id: 2,
      name: "Scholarship & Study Abroad Strategy",
      desc:
        "Build a competitive profile, shortlist programs, and prepare compelling motivation letters and CVs.",
    },
    {
      id: 3,
      name: "Career & Portfolio Coaching",
      desc:
        "Polish your CV/LinkedIn, plan skill growth, and prepare for interviews and portfolio presentations.",
    },
    {
      id: 4,
      name: "English for Professional Communication",
      desc:
        "Email etiquette, meeting language, and presentation skills tailored for international contexts.",
    },
    {
      id: 5,
      name: "Web/App Project Mentorship",
      desc:
        "From idea to MVP: scoping, UI hints, tech stack suggestions, and weekly progress feedback.",
    },
    {
      id: 6,
      name: "Grant/Proposal Writing",
      desc:
        "Design clear objectives, budgets, and impact sections that reviewers understand and trust.",
    },
  ];

    return <>
        <section className="w-full bg-[#fffef8] text-[#04322f]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Page title */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Consulting
          </h1>
          <p className="mt-4 text-lg/7 text-[#04322fcc]">
            Choose a course that fits your goals. Each card shows a short
            overview—tap “Join” to proceed.
          </p>
        </div>

        {/* Courses grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <ConsultingCard key={c.id} name={c.name} desc={c.desc}/>
          ))}
        </div>
      </div>
    </section>
    </>
}

export default Consulting;
