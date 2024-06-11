import React from 'react';

function MapFrame({ mapSrc, iframeProps, sensors, pollutionData }) {
    return (
        <iframe
            src={`${mapSrc}?type=${iframeProps.type}&sensors=${JSON.stringify(sensors)}&pollutionData=${JSON.stringify(pollutionData)}`}
            width="100%"
            frameBorder="0"
            title="Map Frame"
        ></iframe>
    );
}

export default MapFrame;