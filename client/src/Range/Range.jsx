import React, { useState } from 'react';
import './Range.css'; // Import CSS for styling

function Range({ changeData, updateRange, maxRange }) {
    const [value, setValue] = useState(0); // Initial value for the slider

    // Function to handle changes in the slider value
    const handleChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setValue(newValue);
        updateRange(newValue); // передаем новое значение диапазона в Map компонент
        changeData();
    };

    return (
        <div className="range-wrapper">
            <div className="range-slider">
                <input
                    type="range"
                    min="0"
                    max={maxRange}
                    value={value}
                    onChange={handleChange}
                    className="slider"
                />
                <div className="line-indicators">
                    {[...Array(maxRange + 1)].map((_, index) => (
                        <div key={index} className="line-label"></div>
                    ))}
                </div>
                <div className="date-indicators">
                    <div className="date-label">Неделю назад</div>
                    <div className="date-label">6 дней назад</div>
                    <div className="date-label">5 дней назад</div>
                    <div className="date-label">4 дня назад</div>
                    <div className="date-label">3 дня назад</div>
                    <div className="date-label">2 дня назад</div>
                    <div className="date-label">Вчера</div>
                    <div className="date-label">Сегодня</div>
                </div>
            </div>
        </div>
    );
}

export default Range;