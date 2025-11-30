import { useNavigate } from "react-router-dom";

const ConsultingCard = (props) => {

    const navigate = useNavigate();

    const handleJoin = () => {
        navigate(`/services/consulting/course/${props.id}`);
    }

    return <>
        <div
              className="group relative flex flex-col rounded-2xl border border-[#04322f1a] bg-white/80 p-6 shadow-sm ring-1 ring-transparent transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#04322f1a]"
            >
              {/* simple icon */}
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#04322f08] ring-1 ring-[#04322f12]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3a7 7 0 0 0-4 12v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2a7 7 0 0 0-4-12Z"
                    stroke="#04322f"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 19h6M10 22h4"
                    stroke="#04322f"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-medium">{props.name}</h3>
              <p className="mt-2 text-sm/6 text-[#04322fb3]">{props.desc}</p>

              <div className="mt-6 flex items-end justify-between gap-3">
                <span className="text-xs uppercase tracking-wide text-[#04322f80]">
                  Course
                </span>
                <button
                  type="button"
                  onClick={handleJoin}
                  className="inline-flex items-center justify-center rounded-xl border border-[#04322f] px-4 py-2 text-sm font-medium text-[#04322f] transition hover:bg-[#04322f] hover:text-[#fffef8] active:scale-[0.99]"
                >
                  Join
                </button>
              </div>

              {/* subtle hover highlight */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition group-hover:ring-[#04322f1f]" />
            </div>
    </>
}

export default ConsultingCard;