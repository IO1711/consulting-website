import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const NewsItem = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(`Title: ${props.newsTitle} and Image: ${props.imageName}`);
    }, []);

    return <>
        <div className="flex flex-1 h-50 md:h-100 mb-8 md:flex-col md:mx-4" data-aos="fade-up" data-aos-once="true" onClick={() => navigate("/opportunities")}>
            <div className="flex-1 flex items-center justify-center hoverColor">{props.newsTitle}</div>
            <div className={`bg-center bg-cover flex-1 rounded-4xl md:flex-3`}
                style={{backgroundImage: `url(/${props.imageName})`}}></div>
        </div>
    </>
}

export default NewsItem;