import clsx from "clsx";
import Button from "../Button";

const GrantDetails = (props) => {

    const classes = clsx(
        "fixed top-5 left-5 md:top-10 md:left-10 h-[90%] w-[90%] md:w-[95vw] z-50 transform transition-transform duration-500 rounded-4xl border border-deep-forest-green bg-baby-powder",
        {
            "opacity-0 scale-95 pointer-events-none" : !props.isHidden,
            "opacity-100 scale-100": props.isHidden
        }
    )

    

    return <>
     <div className={classes}>
            
            <Button onClick={props.closeDetails}>Close</Button>
            <div>{JSON.stringify(props.grantDetails)}</div>
        </div>
    </>
}

export default GrantDetails;