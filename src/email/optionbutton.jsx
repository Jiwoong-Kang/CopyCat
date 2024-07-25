import React, {useState} from 'react';


const OptionButton = ({setEmailDomain}) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [directInput, setDirectInput] = useState('');
    const [isButton, setIsButton] = useState(true);

    const options = [
        'naver.com', 
        'hanmail.net', 
        'daum.net', 
        'gmail.com', 
        'nate.com', 
        'outlook.com', 
        'icloud.com', 
        '직접입력'
    ];

    const openOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleButtonClick = () => {
        openOptions();
        setIsButton(prevState => !prevState);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowOptions(false);
        setEmailDomain(option);
    };

    const handleDirectInputChange = (e) => {
        setDirectInput(e.target.value);
        setEmailDomain(e.target.value);
    };

    return (
        <div className="options-container">
            <div className="input-button-combined">
                {isButton ? ( 
                    <button type="button" className="open-options-button" onClick={handleButtonClick}>
                        선택해주세요  ▼
                    </button>
                    ) : selectedOption === "직접입력"? (
                        <input 
                            type="text"
                            className="email_area"
                            placeholder='입력해주세요'
                            value={directInput}
                            onChange={handleDirectInputChange}
                        />
                    ) : (
                        <input 
                            type="text"
                            className="email_area"
                            placeholder='입력해주세요'
                            value={selectedOption}
                            readOnly
                            onFocus={openOptions}
                        />
                    )}               
            </div>    
            {showOptions && (
                <div className="options">
                <ul>
                    {options.map(option => (
                        <li key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            </div>
            )}
            
        </div>
    );
};

export default OptionButton;