// Sensor/Sensor.js
import React, { useState } from 'react';
import "./Sensor.css";

function Sensor() {
    // const [email, setEmail] = useState('');

    
    // value={email}
    // onChange={(e) => setEmail(e.target.value)}
    const [name, setSensorNumber] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // email,
        const sensorData = {            
            name,
            longitude,
            latitude
          };
      
          try {
            const response = await fetch('http://127.0.0.1:8000/api/sensors/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sensorData),
            });
      
            if (response.ok) {
              const result = await response.json();
              console.log('Sensor added successfully:', result);
              // Clear form fields
              setSensorNumber('');
              setLongitude('');
              setLatitude('');
            } else {
              console.error('Error adding sensor:', response.statusText);
            }
          } catch (error) {
            console.error('Network error:', error);
          }
    };

    return (
        <div>
            <div className="sensor_body">
                <div className="sensor_body__header">
                    <img src={`${process.env.PUBLIC_URL}/img/sensorBg.jpg`} alt="" />
                    <h1>Подключите датчик и внесите свой вклад в создание чистого города!</h1>
                </div>
                <div className="sensor-form__container">
                    <form onSubmit={handleSubmit} className='sensor-form'>
                        <div>

                            <input
                                type="email"
                                placeholder='Введите ваш email'
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setSensorNumber(e.target.value)}
                                placeholder='Введите номер контроллера метеостанции'
                                required
                            />
                        </div>
                        <div className="sensor-coordinates">
                            <div>
                                <input
                                    type="text"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                    placeholder='Широта'
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                    placeholder='Долгота'
                                    required
                                />
                            </div>
                        </div>

                        <button className='btn' type="submit">Добавить датчик</button>
                    </form>
                    <div className="sensor-page_desc">
                        <p>Введите ваши контактные данные, номер датчика и координаты расположения датчика</p>
                        <p>Станьте частью растущего сообщества, которое стремится улучшить качество воздуха в нашем городе. Подключите любой датчик по измерению загрязнений в атмосферном воздухе и внесите свой вклад в мониторинг экологической обстановки Кузбасса</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Sensor;
