const GrantItem = (props) => {
  const setGrantDetails = () => {
    props.onClick(
      props.country,
      props.programType,
      props.startDate,
      props.regDLine,
      props.ageReq,
      props.majorReq
    );
  };

  return (
    <>
      <div
        onClick={setGrantDetails}
        className="group cursor-pointer overflow-hidden rounded-2xl bg-[#fffef8] ring-1 ring-black/5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-[#04322f]/30"
      >
        {/* Image / banner */}
        <div className="relative h-44 md:h-56 w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(/korea.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
          <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-[#04322f] px-3 py-1 text-xs font-semibold tracking-wide text-[#fffef8]">
            {props.country}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div className="space-y-0.5">
              <div className="text-sm text-neutral-500">Program type</div>
              <div className="font-medium text-neutral-900">
                {props.programType}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="text-sm text-neutral-500">Start date</div>
              <div className="font-medium text-neutral-900">
                {props.startDate}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="text-sm text-neutral-500">
                Registration deadline
              </div>
              <div className="font-medium text-neutral-900">
                {props.regDLine}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="text-sm text-neutral-500">Age requirement</div>
              <div className="font-medium text-neutral-900">
                {props.ageReq}
              </div>
            </div>

            <div className="space-y-0.5 sm:col-span-2">
              <div className="text-sm text-neutral-500">Degree</div>
              <div className="font-medium text-neutral-900">
                {props.majorReq}
              </div>
            </div>
          </div>

          {/* subtle bottom affordance */}
          <div className="mt-5 flex items-center justify-end gap-2 text-sm text-[#04322f] opacity-80 group-hover:opacity-100">
            <span className="font-semibold">Details</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              ›
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrantItem;
