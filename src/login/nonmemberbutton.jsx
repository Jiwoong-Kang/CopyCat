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

    function orderConfirm(){
        console.log(true);
        return true;
        // 여기는 나중에 채울 것이다
    };

    return (
        <>
            <div className="nonmemberorder">
                <div>
                    <input
                        type="text"
                        className={`number_area ${error !== null ? 'error' : ''}`}
                        placeholder="주문번호"
                        value={orderNumber}
                        onChange={handleOrderChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className={`order_area ${error !== null ? 'error' : ''}`}
                        placeholder="이메일"
                        value={userEmail}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-primary_order"
                        onClick={orderConfirm}
                        disabled={error!== null}
                    >
                        주문조회
                    </button>
                </div>
            </div>
        </>
    )
}

export {NonMemberButton};