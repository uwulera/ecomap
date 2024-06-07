// map.js
import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import './Map.css';
import Range from '../Range/Range';
import Modal from '../Modal/Modal';

export default function Map() {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [sensors, setSensors] = useState([]);
    const [windSpeed, setWindSpeed] = useState(10);
    const [rotation, setRotation] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('PM2,5');
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const changeData = () => {
        const newWindSpeed = Math.floor(Math.random() * 10) + 1;
        const randomDegree = Math.floor(Math.random() * 361);

        setRotation(randomDegree);
        setWindSpeed(newWindSpeed);
    };

    useEffect(() => {
        const fetchPollutionData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/pollutions/');
                console.log('Server response:', response.data);

                const features = response.data.map(item => ({
                    type: "Feature",
                    properties: {
                        concentration: item.concentration,
                        label: item.label,
                    },
                    geometry: {
                        type: "MultiPolygon",
                        coordinates: item.coordinates,
                    }
                }));

                features.sort((a, b) => a.properties.concentration - b.properties.concentration);

                setGeoJsonData({
                    type: "FeatureCollection",
                    features: features,
                });
            } catch (error) {
                console.error('Error fetching pollution data:', error);
            }
        };

        const fetchSensorsData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/sensors/');
                console.log('Sensors response:', response.data);
                setSensors(response.data);
            } catch (error) {
                console.error('Error fetching sensors data:', error);
            }
        };

        fetchPollutionData();
        fetchSensorsData();
    }, []);

    useEffect(() => {
        if (mapContainerRef.current) {
            if (mapRef.current) {
                mapRef.current.remove();
            }

            const map = L.map(mapContainerRef.current, {
                zoom: 12,
                center: [55.3718, 86.0596],
            });

            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            if (geoJsonData) {
                const rawData = JSON.parse(JSON.stringify(geoJsonData));
                console.log('Adding data to map:', rawData);

                L.geoJSON(rawData, {
                    style: (feature) => ({
                        color: getColor(feature.properties.concentration),
                        fillColor: getColor(feature.properties.concentration),
                        weight: 2,
                        fillOpacity: 0.5,
                    }),
                    onEachFeature: (feature, layer) => {
                        layer.bindPopup(`
              <div>
                <h3>Concentration: ${feature.properties.concentration}</h3>
                <p>Label: ${feature.properties.label}</p>
              </div>
            `);
                    },
                }).addTo(map);
            }

            const sensorIcon = L.icon({
                iconUrl: 'sensor_marker.png',
                iconSize: [24, 24],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
            });

            sensors.forEach(sensor => {
                const marker = L.marker([sensor.latitude, sensor.longitude], { icon: sensorIcon }).addTo(map);
                marker.bindPopup(`<b>${sensor.name}</b><br>Долгота: ${sensor.longitude}<br>Широта: ${sensor.latitude}`);
            });
        }
    }, [geoJsonData, sensors]);

    const getColor = (d) => {
        return d > 350 ? '#FF0000' :
            d > 300 ? '#FF4500' :
                d > 250 ? '#FF8C00' :
                    d > 200 ? '#FFD700' :
                        d > 150 ? '#ADFF2F' :
                            d > 100 ? '#7FFF00' :
                                d > 50 ? '#00FF7F' :
                                    '#00FF00';
    };

    return (
        <div className="map-container">
            <div className="map-info">
                <div className="map-btns">
                    <button onClick={() => { changeData(); handleButtonClick('PM2,5'); }} className={activeButton === 'PM2,5' ? "active-btn" : ""}>PM2,5</button>
                    <button onClick={() => { changeData(); handleButtonClick('PM10'); }} className={activeButton === 'PM10' ? "active-btn" : ""}>PM10</button>
                    <button onClick={() => { changeData(); handleButtonClick('CO2'); }} className={activeButton === 'CO2' ? "active-btn" : ""}>CO2</button>
                </div>
                <div className="wind-info">
                    <p>{windSpeed} м/c</p>
                    <img src="../img/windArrow.png" alt="" width={50} style={{ transform: `rotate(${rotation}deg)` }} />
                </div>
            </div>
            <div id="legend">
                <ul>
                    <li>
                        <span style={{ backgroundColor: '#92f0c0' }} className="color"></span>
                        <span className="only-landscape">Хорошо</span>
                    </li>
                    <li>
                        <span style={{ backgroundColor: '#c4ec8c' }} className="color"></span>
                        <span className="only-landscape">Приемлемо</span>
                    </li>
                    <li>
                        <span style={{ backgroundColor: '#eed353' }} className="color"></span>
                        <span className="only-landscape">Повышенный</span>
                    </li>
                    <li>
                        <span style={{ backgroundColor: '#ee7e2e' }} className="color"></span>
                        <span className="only-landscape">Вредно</span>
                    </li>
                    <li>
                        <span style={{ backgroundColor: '#ff5223' }} className="color"></span>
                        <span className="only-landscape">Очень вредно</span>
                    </li>
                </ul>
                <a onClick={openModal}>Подробнее</a>
            </div>
            {isOpen && <Modal closeModal={closeModal} />}
            <div ref={mapContainerRef} className="map-container"></div>
            <Range changeData={changeData} />
        </div>
    );
}
