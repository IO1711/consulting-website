import { useNavigate } from "react-router-dom";
import { getCountryCardImageSrc } from "../../lib/imageVariants";


const NewsItem = (props) => {
    const navigate = useNavigate();
    const imageSrc = getCountryCardImageSrc(props.country || props.newsTitle);

    return <>
        <div className="flex flex-1 h-50 md:h-100 mb-8 md:flex-col md:mx-4" data-aos="fade-up" data-aos-once="true" onClick={() => navigate("/opportunities")}>
            <div className="flex-1 flex items-center justify-center hoverColor">{props.newsTitle}</div>
            <div
                className="bg-center bg-cover flex-1 rounded-4xl md:flex-3"
                style={{backgroundImage: `url(${imageSrc})`}}
            ></div>
        </div>
    </>
}

export default NewsItem;
