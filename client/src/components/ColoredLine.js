import React from 'react'
import './ColoredLine.css'

const ColoredLine = ({ color }) => (
    <div className="py-2 colored-line">
        <hr
            className="accent-line"
            style={{
                color: "red",
                backgroundColor: "red",
            }}
        />

        <hr
            className="main-line"
            style={{
                color: color,
                backgroundColor: color,
            }}
        />
    </div>
);

export default ColoredLine