

const GrantItem = (props) => {

    const setGrantDetails = () => {
        props.onClick(props.country, props.programType, props.startDate, props.regDLine, props.ageReq, props.majorReq)
    }

    return <>
        <div className="flex flex-row my-8 p-1 hoverBorder" onClick={setGrantDetails}>
            <div className="flex-1 flex flex-col">
                <div className="h-55 rounded-4xl bg-cover"
                style={{backgroundImage: `url(/korea.jpg)`}}>
                    
                </div>
                <div className="text-bold">
                    {props.country}
                </div>
            </div>

            <div className="flex-1 p-3">
                <ul>
                    <li className="flex justify-start flex-col">
                        <span className="font-bold">Program type:</span> <span>{props.programType}</span>
                    </li>
                    <li className="flex justify-start flex-col">
                        <span className="font-bold">Start date:</span> <span>{props.startDate}</span>
                    </li>
                    <li className="flex justify-start flex-col">
                        <span className="font-bold">Registration deadline:</span> <span>{props.regDLine}</span>
                    </li>
                    <li className="flex justify-start flex-col">
                        <span className="font-bold">Age requirement:</span> <span>{props.ageReq}</span>
                    </li>
                    <li className="flex justify-start flex-col">
                        <span className="font-bold">Degree:</span> <span>{props.majorReq}</span>
                    </li>
                </ul>
            </div>
        </div>
    </>
}

export default GrantItem;