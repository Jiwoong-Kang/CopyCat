import React, {useState} from "react";
import emailjs from 'emailjs-com';

function EmailButton({userEmail, error}){
    const [isEmailSent, setIsEmailSent] = useState(false);
    const sendVerificationEmail = () => {
        const templateParams = {
            to_email : userEmail,
            from_name: "Jiwoong",
            message: "인증됐습니다."
        };

        emailjs.send(
            'test-service',
            'test-template',
            templateParams,
            'PpLJNi5o3oxZphRek'
        )
        .then((response) => {
            console.log("이메일이 성공적으로 보내졌습니다:", response);
            setIsEmailSent(true);
        })
        .catch((error) => {
            console.error('이메일 보내기 실패:', error);
        });
    };

    const handleVerification = () => {
        sendVerificationEmail();
    };

    return (
        <div>
            {isEmailSent ? (
                <p>
                    인증 이메일이 성공적으로 발송되었습니다. 이메일을
                    확인해주세요!
                </p>
            ) : (
                <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={handleVerification}
                    disabled={error !== null}
                >
                    이메일 인증하기
                </button>
            )}
        </div>
    );
}

export default EmailButton;