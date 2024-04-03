import React, { useState } from 'react';
import '../index.scss'; 

const Counter = () => {
    const [months, setMonths] = useState(new Array(12).fill(''));
    const [average, setAverage] = useState(null);

    const monthNames = [
        "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
        "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
    ];

    const handleChange = (index, value) => {
        const newMonths = [...months];
        newMonths[index] = value.replace(/[^0-9]/g, ''); 
        setMonths(newMonths);
    };

    const handleCalculate = () => {
        const numbers = months.map(month => parseInt(month, 10)).filter(month => !isNaN(month));
        if (numbers.length === 0) {
            setAverage("proszę uzupełnić miesiące, w których ktoś był zatrudniony");
        } else {
            const total = numbers.reduce((acc, curr) => acc + curr, 0);
            const avg = total / numbers.length;
            setAverage(avg);
        }
    };
    

    return (
        <div className="container">
            <div className="column">
                <div className="row">
                    {months.slice(0, 6).map((month, index) => (
                        <div className="input-container" key={index}>
                            <input
                                type="number"
                                min="0"
                                value={month}
                                placeholder={monthNames[index]}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="column">
                <div className="row">
                    {months.slice(6).map((month, index) => (
                        <div className="input-container" key={index + 6}>
                            <input
                                type="number"
                                min="0"
                                value={month}
                                placeholder={monthNames[index + 6]}
                                onChange={(e) => handleChange(index + 6, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handleCalculate}>Policz średnią</button>
            {average && <div className="result">Średnia arytmetyczna zatrudnionych: {average}</div>}
        </div>
    );
};

export default Counter; 


