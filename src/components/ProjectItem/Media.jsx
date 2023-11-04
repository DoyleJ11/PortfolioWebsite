import React from "react";

export default function Media({ url, mediaType, opacity, paralaxPos, scale, rotationPos }) {
    if (mediaType === "video") {
        return (
            <video
                src={url}
                autoPlay
                controls={false}
                playsInline
                muted
                loop
                style={{
                    opacity,
                    transform: `translate3d(${paralaxPos.x}px, ${paralaxPos.y}px, 0px) rotate(${rotationPos}deg) scale(${scale})`
                }}
            />
        )
    }
    
    // Default to image if not video
    return (
        <img 
            src={url} 
            style={{
                opacity,
                transform: `translate3d(${paralaxPos.x}px, ${paralaxPos.y}px, 0px) rotate(${rotationPos}deg) scale(${scale})`
            }}
        />
    )
}
