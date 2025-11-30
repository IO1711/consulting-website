const Notes = ({ requestId, notes, setNotes, onSave }) => {
  const handleTitleChange = (index, value) => {
    const updated = [...notes];
    updated[index] = { ...updated[index], title: value };
    setNotes(updated);
  };

  const handleNoteChange = (index, value) => {
    const updated = [...notes];
    updated[index] = { ...updated[index], note: value };
    setNotes(updated);
  };

  const handleAddNote = () => {
    setNotes([...notes, { title: "", note: "" }]);
  };

  const handleRemoveNote = (index) => {
    const updated = [...notes];
    updated.splice(index, 1);
    setNotes(updated);
  };

  return (
    <section className="mt-4 border-t pt-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#04322f] uppercase tracking-wide">
            Internal notes
          </h3>
          <p className="text-xs text-gray-500">
            These notes are linked to request ID&nbsp;
            <span className="font-mono font-medium">{requestId}</span>.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNote}
          className="text-xs px-3 py-1.5 rounded-lg border text-[#04322f] hover:bg-[#04322f0f]"
        >
          + Add note
        </button>
      </div>

      {notes.length === 0 && (
        <p className="text-xs text-gray-500">
          No notes added yet. Click “+ Add note” to create one.
        </p>
      )}

      <div className="space-y-3">
        {notes.map((item, index) => (
          <div
            key={index}
            className="border rounded-2xl p-3 bg-gray-50/60 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                Note #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveNote(index)}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                Remove
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  value={item.title || ""}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  className="rounded-xl border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#04322f33] bg-white"
                  placeholder="e.g., Grammar issues in Motivation Letter"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">Note</label>
                <textarea
                  value={item.note || ""}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                  rows={3}
                  className="rounded-xl border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#04322f33] bg-white resize-y"
                  placeholder="Write your detailed note here…"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSave}
          disabled={notes.length === 0}
          className="px-4 py-2 rounded-xl bg-[#04322f] text-[#fffef8] text-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Save notes
        </button>
      </div>
    </section>
  );
};

export default Notes;
