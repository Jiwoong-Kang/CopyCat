import React, {useState, useEffect} from "react";
import Warning from '../warning';

function Checkbox({ value, checked, onChange, link }) {
    return (
        <div className="total_checkbox">
            <label className="total_checkbox">
                <input type="checkbox" className="checkBox" checked={checked} onChange={onChange} />
                {" "}
                <span className="check_content">{value}</span>
            </label>
            { link && (
                <a href={link}>
                    <div className="arrow">
                        &rarr;
                    </div>
                </a>
            )}
        </div>
    );
}

function AllCheckbox({ value, checked, onChange }) {
    return (
        <label className="total_checkbox">
            <input type="checkbox" className="checkBox" checked={checked} onChange={onChange} />
            {" "}<b>{value}</b>
        </label>
    );
}


function Check({onError}) {
    const [allChecked, setAllChecked] = useState(false);
    const [checkboxes, setCheckboxes] = useState({
        allcheck: false,
        over14: false,
        howTouse: false,
        collection: false,
        marketing : false,
        event: false
    });

    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);


    const handleallcheckchange = (e) => {
        handleAllChange(e.target.value);
        setShowError(true);
    }
    
    const handleAllChange = () => {
        const newState = !allChecked;
        setAllChecked(newState);
        setCheckboxes({
            allcheck: newState,
            over14: newState,
            howToUse: newState,
            collection: newState,
            marketing : newState,
            event: newState
        });
    };

    const handleCheckboxChange = (name) => {
        setCheckboxes((prevState) => {
            const newState = !prevState[name];
                return {
                    ...prevState,
                    [name]: newState,
                };
        });
    };


    useEffect(()=>{
        if(showError){
            let currentError = null;
            const requiredCheckboxes = ["over14","howToUse","collection"];
            const allChecked = requiredCheckboxes.every(checkbox => checkboxes[checkbox]);
            if (!allChecked){
                currentError = 7;
                setError(7);
            }else{
                setError(null);
            }
            onError(currentError);
        }
    },[showError, checkboxes]);

    return (
        <>
            <p className={`title ${error !== null ? 'error' : ''}`}>약관동의</p>
            <div className="main_border">
                <AllCheckbox value="전체동의" checked={allChecked} onChange={handleallcheckchange} />
                <hr />
                <Checkbox value="만 14세 이상입니다(필수)" checked={checkboxes.over14} onChange={()=>handleCheckboxChange('over14')} />
                <Checkbox value="이용약관(필수)" checked={checkboxes.howToUse} onChange={()=>handleCheckboxChange('howToUse')} link="https://ohou.se/usepolicy" />
                <Checkbox value="개인정보수집 및 이용동의(필수)" checked={checkboxes.collection} onChange={()=>handleCheckboxChange('collection')} link="https://ohou.se/privacy?type=register"/>
                <Checkbox value="개인정보 마케팅 활용 동의(선택)" checked={checkboxes.marketing} onChange={()=>handleCheckboxChange('marketing')} link="https://ohou.se/privacy?type=register_marketing"/>
                <Checkbox value="이벤트,쿠폰,특가 알림 메일 및 SMS 등 수신(선택)" checked={checkboxes.event} onChange={()=>handleCheckboxChange('event')} />
            </div>
            {error && <Warning value={error} />} 
        </>
    )
}

export {Check};