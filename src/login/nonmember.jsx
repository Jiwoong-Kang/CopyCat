import React, {useEffect, useState} from "react";
import Warning from "../warning";
import { NonMemberButton } from "./nonmemberbutton";

function NonMember(){
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    return(
        <div className="orderlist">
            <hr className="line"/>
            <div onClick={toggleVisibility} style={{cursor:'pointer'}}>
                비회원 주문 조회하기
            </div>
            {isVisible && (
                <NonMemberButton />
            )}
        </div>
    );
};

export {NonMember};