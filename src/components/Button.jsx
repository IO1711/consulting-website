import clsx from "clsx";

const Button = (props) => {

    const classes = clsx({
        "btn": true,
        ...props.className
    })

    return <>
        <button className={classes} type={props.type} disabled={props.disabled} onClick={props.onClick}>{props.children}</button>
    </>
}

export default Button;