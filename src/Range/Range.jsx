import React, { useState } from 'react';
import './Range.css'; // Import CSS for styling

function Range({changeData}) {
    const [value, setValue] = useState(14); // Initial value for the slider

    // Function to handle changes in the slider value
    const handleChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        const step = 15 / 15;
        const nearestStep = Math.round(newValue / step) * step;
        setValue(event.target.value);
        if (nearestStep !== value) {
            setValue(nearestStep);
            changeData();
          }
    };

    return (
            <div className="range-wrapper">
                <div className="range-slider">
                    <input
                        type="range"
                        min="0"
                        max="14"
                        value={value}
                        onChange={handleChange}
                        className="slider"
                    />
                    {/* <div className="slider-value">{value}</div> */}
                    <div className="line-indicators">
                    {[...Array(15)].map((_, index) => (
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
