
const CheckDocs = () => {
    return <>
         <section className="max-w-3xl mx-auto mb-25 px-4 py-12">
      <h1 className="text-4xl font-semibold text-[#04322f] mb-8">
        Check documents
      </h1>

      <form
        action="/api/check-documents"
        method="post"
        encType="multipart/form-data"
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