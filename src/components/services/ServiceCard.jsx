import { Link } from "react-router-dom";

const ServiceCard = (props) => {
    return <>
        <Link to={props.link} className="mb-12 rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="mx-auto mb-5 h-24 w-24">
                <img
                    src={`${props.iconImage}`}
                    alt=""
                    className="h-full w-full object-contain"
                />
            </div>

            <h3 className="text-2xl font-semibold text-[#04322f]">{props.title}</h3>

            <p className="mt-3 text-lg text-black/70">
                {props.description}
            </p>

            {/* Long description (only on md+) */}
            <p className="mt-4 hidden text-base text-black/70 md:block">
                {props.fullDescription}
            </p>
        </Link>
    </>
}

export default ServiceCard;