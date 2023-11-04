import React from "react";

export default function Image({ url, opacity, paralaxPos, scale, rotationPos }) {
    return (
        <img src={url} 
        
        style={{
            opacity,
            transform: `translate3d(${paralaxPos.x}px, ${paralaxPos.y}px, 0px) rotate(${rotationPos}deg) scale(${scale})`
        }}
        />
    )
}