import React, { useEffect, useState } from "react";
import Warning from '../warning';
import { Member } from "./member";
import { SnsLogin } from "./snsLogin";
import { NonMember } from "./nonmember";
import { NavLink, useNavigate} from "react-router-dom";
import './login.css';

function Login(){
    return(
        <>
            <div className="allLogin"> 
                <NavLink to ="/" className="todayhome">오늘의 집</NavLink>
                <div className="loginelement">
                    <Member />
                </div>
                <div className="loginelement">
                    <SnsLogin />
                </div>
                <div className="loginelement">
                    <NonMember />
                </div>
            </div>
        </>
    );
}

export {Login}