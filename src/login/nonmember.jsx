import React, {useEffect, useState} from "react";
import Warning from "../warning";
import { NonMemberButton } from "./nonmemberButton";

function NonMember(){
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    return(
        <>
            <div onClick={toggleVisibility} style={{cursor:'pointer'}}>비회원 주문 조회하기</div>
            {isVisible && (
                <NonMemberButton />
            )}
        </>
    );
};

export {NonMember};