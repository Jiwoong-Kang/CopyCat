import React, { useState, useEffect} from 'react';
import Warning from '../warning';

function Robot(){

    const [error, setError] = useState(null);
    const [timeWarning, setTimeWarning] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(()=>{
        const timer = setTimeout(()=> {
            setTimeWarning(true);
        }, 60000);

        return ()=> clearTimeout(timer);
    },[])

    useEffect(()=>{
        if(timeWarning){
            setError(8);
        }else{
            setError(null);
        }
    },[timeWarning]); 

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    

    return(
        <div className="robot">
            <label>
                <input type="checkbox" className="robotBox"/>
                {' '}
                I'm not a robot
            </label>
            { error !== null && <Warning value={error} /> }
        </div>
    );
};

export {Robot};


