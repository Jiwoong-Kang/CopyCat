import React,{ useState, useEffect }from "react";
import Warning from "../warning";

function NonMemberButton(){
    const [orderNumber, setOrderNumber] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(null);

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
        setShowError(true)
    };

    const handleOrderChange = (e) => {
        setOrderNumber(e.target.value);
        setShowError(true);
    };

    return (
        <>
            <div className="nonmemberorder">
                <div>
                    <input
                        type="text"
                        className={`input_area ${error !== null ? 'error' : ''}`}
                        placeholder="주문번호"
                        value={orderNumber}
                        onChange={handleOrderChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className={`input_area ${error !== null ? 'error' : ''}`}
                        placeholder="이메일"
                        value={userEmail}
                        onChange={handleEmailChange}
                    />
                </div>
            </div>
        </>
    )
}

export {NonMemberButton};