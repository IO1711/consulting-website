import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/AuthStore";
import { useNavigate } from "react-router-dom";
import { useBaseUrlStore } from "../../stores/BaseUrlStore";
import { apiRequest } from "../../lib/apiClient";

const CheckDocs = () => {

    const token = useAuthStore((s) => s.token);
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [program, setProgram] = useState("");
    const [comment, setComment] = useState("");
    const baseUrl = useBaseUrlStore((s) => s.baseUrl);

    const createDocRequestMutation = useMutation({
      mutationFn: (formData) =>
        apiRequest(baseUrl, "api/v1/request/docRequest", {
          method: "POST",
          token,
          body: formData,
        }),
    });

    const handleFileChange = (e) => {
      const selected = e.target.files ? Array.from(e.target.files) : [];
      setFiles(selected);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(token==="") {
        navigate("/login");
        return;
      };
      if(!files || files.length === 0) {
        alert("Please choose file(s)");
        return;
      }

      const formData = new FormData();
      files.forEach(file => {
        formData.append("files", file);
      });
      formData.append("program", program);
      formData.append("comment", comment);

      console.log("Submitting payload: ", {
        files,
        program: program,
        comment: comment
      });

      await createDocRequestMutation.mutateAsync(formData);
    }


    return <>
         <section className="max-w-3xl mx-auto mb-25 px-4 py-12">
      <h1 className="text-4xl font-semibold text-[#04322f] mb-8">
        Check documents
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Program name / target */}
        <div>
          <label
            htmlFor="program"
            className="block text-sm font-medium mb-2 text-[#04322f]"
          >
            Program (what you’re preparing for)
          </label>
          <input
            id="program"
            name="program"
            type="text"
            required
            onChange={(e) => setProgram(e.target.value)}
            placeholder="e.g., Erasmus+ KA171, NSP Slovakia, Fulbright…"
            className="w-full rounded-xl border border-neutral-300 bg-[#fffef8] px-4 py-3 outline-none focus:ring-2 focus:ring-[#04322f]/30"
          />
        </div>

        {/* Files */}
        <div>
          <label
            htmlFor="files"
            className="block text-sm font-medium mb-2 text-[#04322f]"
          >
            Document files
          </label>
          <input
            id="files"
            name="files"
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-[#04322f] file:px-4 file:py-2 file:text-[#fffef8] hover:file:opacity-90"
            // optionally: accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          />
          <p className="mt-2 text-xs text-neutral-500">
            You can attach multiple files (PDF, DOCX, images, etc.).
          </p>
        </div>

        {/* Additional info */}
        <div>
          <label
            htmlFor="info"
            className="block text-sm font-medium mb-2 text-[#04322f]"
          >
            Additional info
          </label>
          <textarea
            id="info"
            name="info"
            rows="5"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Deadlines, special instructions, what to focus on, links…"
            className="w-full rounded-xl border border-neutral-300 bg-[#fffef8] px-4 py-3 outline-none focus:ring-2 focus:ring-[#04322f]/30"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-2xl bg-[#04322f] px-6 py-3 text-[#fffef8] shadow-sm hover:opacity-95"
          >
            Submit for review
          </button>
          <button
            type="reset"
            className="rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-neutral-800 hover:bg-neutral-50"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
    </>
}

export default CheckDocs;
