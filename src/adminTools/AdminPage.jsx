
import { useState } from "react";
import AddOpportunity from "./AddOpportunity";
import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";
import DocRequests from "./DocRequests";
import VisaRequests from "./VisaRequests";

const AdminPage = () => {
  const TABS = [
    { key: "add-opportunity", label: "Add Opportunity" },
    { key: "add-course", label: "Add Course" },
    { key: "edit-courses", label: "Edit Courses" },
    { key: "doc-requests", label: "Document Check Requests" },
    { key: "visa-requests", label: "Visa Help Requests" },
  ];

  const [active, setActive] = useState(TABS[0].key);

  const TabButton = ({ tab }) => (
    <button
      onClick={() => setActive(tab.key)}
      className={`px-4 py-2 rounded-full text-sm md:text-base transition
        ${
          active === tab.key
            ? "bg-[#04322f] text-[#fffef8] shadow"
            : "text-[#04322f] hover:bg-[#04322f14]"
        }`}
      type="button"
    >
      {tab.label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#fffef8]">
      {/* Header */}
      <header className="bg-[#04322f] text-[#fffef8]">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-semibold">Admin Dashboard</h1>
          <p className="opacity-80 text-sm md:text-base">
            Manage opportunities, courses and user requests
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-[#fffef8] border-b">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap gap-2 py-3">
            {TABS.map((t) => (
              <TabButton key={t.key} tab={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Add Opportunity */}
        {active === "add-opportunity" && (
          <AddOpportunity/>
        )}

        {/* Add Course */}
        {active === "add-course" && (
          <AddCourse/>
        )}

        {/* Edit Courses */}
        {active === "edit-courses" && (
          <EditCourse/>
        )}

        {/* Document Check Requests */}
        {active === "doc-requests" && (
          <DocRequests/>
        )}

        {/* Visa Help Requests */}
        {active === "visa-requests" && (
          <VisaRequests/>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
