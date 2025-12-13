import clsx from "clsx";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const GrantDetails = (props) => {


  const classes = clsx(
    // container panel
    "fixed top-5 left-5 md:top-10 md:left-1/2 md:-translate-x-1/2 md:w-[900px] h-[90%] w-[90%] md:h-[85%] z-50 transform transition-transform duration-500 rounded-3xl border border-deep-forest-green bg-baby-powder shadow-2xl overflow-hidden",
    {
      "opacity-0 scale-95 pointer-events-none": !props.isHidden,
      "opacity-100 scale-100": props.isHidden,
    }
  );

  // graceful fallbacks so the UI never looks empty while you wire data
  const {
    country = "Republic of Korea",
    programType = "Government Scholarship",
    startDate = "September 2026",
    regDLine = "March 15, 2026",
    ageReq = "Under 25 (at start)",
    majorReq = "Bachelor / Any Major",
    link = "", // if you pass a real link you can handle navigation yourself
    description =
      "A fully-funded program supporting international students with tuition, monthly stipend, and language preparation.",
    image = "/korea.jpg",
  } = props.grantDetails || {};

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/40 transition-opacity duration-300 z-40",
          {
            "opacity-0 pointer-events-none": !props.isHidden,
            "opacity-100": props.isHidden,
          }
        )}
        onClick={props.closeDetails}
      />

      {/* Panel */}
      <div className={classes}>
        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 h-14 flex items-center justify-between px-5 md:px-6 border-b border-deep-forest-green/30 bg-baby-powder/80 backdrop-blur">
          <h3 className="text-lg md:text-xl font-semibold text-deep-forest-green">
            {country}
          </h3>
          <Button onClick={props.closeDetails}>Close</Button>
        </div>

        {/* Content area */}
        <div className="h-full pt-16 md:pt-[4.25rem] overflow-y-auto">
          {/* Hero */}
          <div className="relative">
            <img
              src={`/${country}.png`}
              alt={country}
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-sm md:text-base bg-baby-powder text-deep-forest-green">
                {programType}
              </span>
              <span className="px-3 py-1 rounded-full text-sm md:text-base bg-baby-powder/90 text-deep-forest-green/90">
                {majorReq}
              </span>
              <span className="px-3 py-1 rounded-full text-sm md:text-base bg-baby-powder/90 text-deep-forest-green/90">
                Age: {ageReq}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 md:p-8 space-y-8">
            {/* Brief */}
            <section className="bg-white rounded-2xl border border-deep-forest-green/20 p-5 md:p-6">
              <h4 className="text-base md:text-lg font-semibold text-deep-forest-green mb-2">
                About this program
              </h4>
              <p className="text-neutral-700 leading-relaxed">{description}</p>
            </section>

            {/* Facts */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-deep-forest-green/20 bg-white p-5">
                <div className="text-sm text-neutral-500">Start date</div>
                <div className="mt-1 text-lg font-medium text-deep-forest-green">
                  {startDate}
                </div>
              </div>
              <div className="rounded-2xl border border-deep-forest-green/20 bg-white p-5">
                <div className="text-sm text-neutral-500">Registration deadline</div>
                <div className="mt-1 text-lg font-medium text-deep-forest-green">
                  {regDLine}
                </div>
              </div>
            </section>

            {/* Actions */}
            <section className="flex flex-wrap items-center gap-3">
              {/* Keep behavior up to you; this button is just visual */}
              <Button
                onClick={() => window.open(link, "_blank")}
                disabled={!link}
              >
                {link ? "Open official page" : "Official page (coming soon)"}
              </Button>

              {/*<div className="text-sm text-neutral-500">
                Save or share options can go here later.
              </div>*/}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrantDetails;
