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
            setAverage("Proszę uzupełnić miesiące, w których ktoś był zatrudniony");
        } else {
            const total = numbers.reduce((acc, curr) => acc + curr, 0);
            const avg = total / numbers.length;
            setAverage(avg);
        }
    };

    const handleClearInputs = () => {
        setMonths(new Array(12).fill(''));
        setAverage(null); 
    };

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            handleCalculate();
        }
    };

    return (
        <div className="container">
                    <h1 className="heading">Kalkulator średniej liczby zatrudnionych</h1>
                <p>pracowników w danym roku kalendarzowym</p>
            <div className="column">
                <div className="row">
                    {months.map((month, index) => (
                        <div className="input-container" key={index}>
                            <input
                                type="number"
                                min="0"
                                value={month}
                                placeholder={monthNames[index]}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="buttons">
            <button onClick={handleCalculate}>Policz średnią</button>
            <button onClick={handleClearInputs} className="clear-button">Wyczyść</button>
            </div>
            {average !== null && ( 
                <div className="result">{!isNaN(average) ? `Średnia arytmetyczna zatrudnionych: ${average}` : average}</div>
            )}
        </div>
    );
};

export default Counter;
