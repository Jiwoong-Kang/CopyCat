import React, { useEffect, useState } from "react";
import Warning from '../warning';
import { Member } from "./member";
import { SnsLogin } from "./snsLogin";
import { NonMember } from "./nonmember";
import { NavLink, useNavigate} from "react-router-dom";

function Login(){
    return(
        <>
            <div className="allLogin"> 
                <NavLink to ="/" className="todayhome">오늘의 집</NavLink>
                <Member />
                <SnsLogin />
                <NonMember />
            </div>
        </>
    );
}

export {Login}