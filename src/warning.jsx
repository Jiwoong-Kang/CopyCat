import React, {useState, useEffect} from 'react'

const Warning = ({value}) => {
    const [warning, setWarning] = useState(false);
    
    const revealWarning = () => {
        setWarning(null);
    }

    const errors = ['필수 입력 항목입니다.', '이메일 형식이 올바르지 않습니다.', 
    '확인을 위해 비밀번호를 한번 더 입력해주세요.', '비밀번호가 일치하지 않습니다.', 
    '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.', '2자 이상 입력해주세요.', 
    '사용 중인 별명입니다.','필수 항목에 동의해주세요.',
    'Verification expired. Check the checkbox again.'];


    const errorselection = (value) => {
        if (value >= 0 && value < errors.length){
            setWarning(errors[value]) 
        }else{
            revealWarning;
        }
    }

    useEffect(() => {
        errorselection(value);
    }, [value, errorselection]);

    return (
        <div className="warning">
            {warning}
        </div>
    );
};

export default Warning


