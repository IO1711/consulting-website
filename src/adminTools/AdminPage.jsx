
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import TabButton from "./utilities/TapButton";

const AdminPage = () => {
  const TABS = [
    { key: "", label: "Add Opportunity" },
    { key: "addCourse", label: "Add Course" },
    { key: "editCourse", label: "Edit Courses" },
    { key: "docRequests", label: "Document Check Requests" },
    { key: "visaRequests", label: "Visa Help Requests" },
  ];

  

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
              <TabButton key={t.key} tab={t}/>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPage;

/*

        {active === "add-opportunity" && (
          <AddOpportunity/>
        )}

        
        {active === "add-course" && (
          <AddCourse/>
        )}

        
        {active === "edit-courses" && (
          <EditCourse/>
        )}

        
        {active === "doc-requests" && (
          <DocRequests/>
        )}

        
        {active === "visa-requests" && (
          <VisaRequests/>
        )}
*/
