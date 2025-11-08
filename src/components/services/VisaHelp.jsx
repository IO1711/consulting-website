
const VisaHelp = () => {
    return <>
        <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-center text-[#04322f]">
        Visa Help
      </h1>

      <p className="mt-4 mb-10 text-center text-lg text-black/70">
        Share your details and we will help you prepare your visa application.
      </p>

      <form
        action="/api/visa-help"
        method="post"
        className="space-y-8 rounded-2xl border border-black/10 bg-white p-8 shadow-sm"
      >
        {/* CONTACT INFO */}
        <div className="space-y-3">
          <label className="text-lg font-medium text-[#04322f]">
            Contact information
          </label>

          <input
            type="text"
            name="telegram"
            placeholder="Telegram username"
            className="w-full rounded-xl border border-black/20 px-4 py-3 placeholder-black/40 focus:border-[#04322f] focus:outline-none"
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp number"
            className="w-full rounded-xl border border-black/20 px-4 py-3 placeholder-black/40 focus:border-[#04322f] focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded-xl border border-black/20 px-4 py-3 placeholder-black/40 focus:border-[#04322f] focus:outline-none"
          />
        </div>

        {/* DESTINATION COUNTRY */}
        <div>
          <label className="text-lg font-medium text-[#04322f]">
            Destination country
          </label>
          <input
            type="text"
            name="country"
            placeholder="e.g., Germany, Italy, South Korea..."
            className="mt-2 w-full rounded-xl border border-black/20 px-4 py-3 placeholder-black/40 focus:border-[#04322f] focus:outline-none"
          />
        </div>

        {/* PURPOSE */}
        <div className="space-y-3">
          <label className="text-lg font-medium text-[#04322f]">
            Purpose of travel
          </label>

          <div className="space-y-2">
            <label className="flex items-center gap-3 text-black/80">
              <input
                type="radio"
                name="purpose"
                value="study"
                className="h-4 w-4 accent-[#04322f]"
              />
              Study
            </label>

            <label className="flex items-center gap-3 text-black/80">
              <input
                type="radio"
                name="purpose"
                value="work"
                className="h-4 w-4 accent-[#04322f]"
              />
              Work
            </label>

            <label className="flex items-center gap-3 text-black/80">
              <input
                type="radio"
                name="purpose"
                value="travel"
                className="h-4 w-4 accent-[#04322f]"
              />
              Travel
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full rounded-xl bg-[#04322f] px-6 py-3 text-lg font-medium text-[#fffef8] hover:opacity-95 active:scale-[0.98]"
        >
          Submit request
        </button>
      </form>
    </section>
    </>
}

export default VisaHelp;
