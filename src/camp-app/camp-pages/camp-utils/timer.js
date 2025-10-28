import React, { useState } from 'react';

const TimeInput = (time , setTime) => {
   

    const handleInputChange = (event) => {
        const value = event.target.value;


        if (/^[0-9:]*$/.test(value) && value.length <= 11) {

            let formattedValue = value.replace(/[^0-9:]/g, '');


            if (formattedValue.length > 2 && formattedValue[2] !== ':') {
                formattedValue = formattedValue.slice(0, 2) + ':' + formattedValue.slice(2);
            }
            if (formattedValue.length > 5 && formattedValue[5] !== ':') {
                formattedValue = formattedValue.slice(0, 5) + ':' + formattedValue.slice(5);
            }
            if (formattedValue.length > 8 && formattedValue[8] !== ':') {
                formattedValue = formattedValue.slice(0, 8) + ':' + formattedValue.slice(8);
            }

            setTime(formattedValue);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {

            const newValue = time?.slice(0, -1);
            setTime(newValue);
        }
    };

    return (
        <div className='form_field'>
            <label className='form_label'>Enter Time (hh:mm:ss:ms): </label>
            <input
               className='form_input'
                type="text"
                // value={time}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                maxLength={11}
                placeholder="00:00:00:00"
            />
        </div>
    );
};

export default TimeInput;
