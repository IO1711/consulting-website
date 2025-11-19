
const Recordings = () => {

    const recordings = [
        { id: "dQw4w9WgXcQ", title: "Kickoff & Orientation" },
        { id: "9bZkp7q19f0", title: "Positioning Workshop" },
        { id: "uhLLvhDUdu0", title: "Pricing Deep Dive" },
    ];

    return <>
        <section className="md:mb-15">
          <h2 className="mb-4 text-xl font-semibold">Session recordings</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recordings.map((v) => (
              <div key={v.id} className="overflow-hidden rounded-2xl border">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <div className="font-medium">{v.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
    </>
}

export default Recordings;