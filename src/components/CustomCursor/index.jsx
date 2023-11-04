// CustomCursor.jsx
import React, { useContext, useEffect } from "react";
import "./style.scss";
import { CursorContext } from "./CursorManager";

const CustomCursor = () => {
    const { size } = useContext(CursorContext);
    const secondaryCursor = React.useRef(null);
    const positionRef = React.useRef({
        mouseX: 0,
        mouseY: 0,
        destinationX: 0,
        destinationY: 0,
        distanceX: 0,
        distanceY: 0,
        key: -1,
    });

    useEffect(() => {
        document.addEventListener("mousemove", (event) => {
            const { clientX, clientY } = event;

            positionRef.current.mouseX = clientX - secondaryCursor.current.clientWidth / 2;
            positionRef.current.mouseY = clientY - secondaryCursor.current.clientHeight / 2;
        });

        return () => {
            document.removeEventListener("mousemove", () => {});
        };
    }, []);

    useEffect(() => {
        const followMouse = () => {
            positionRef.current.key = requestAnimationFrame(followMouse);
            const {
                mouseX,
                mouseY,
                destinationX,
                destinationY,
            } = positionRef.current;

            // Smooth out the cursor movement
            const newX = destinationX + (mouseX - destinationX) * 0.1;
            const newY = destinationY + (mouseY - destinationY) * 0.1;

            if (secondaryCursor && secondaryCursor.current) {
                secondaryCursor.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
            }

            // Update the destinations
            positionRef.current.destinationX = newX;
            positionRef.current.destinationY = newY;
        };

        followMouse();

        return () => {
            cancelAnimationFrame(positionRef.current.key);
        };
    }, []);

    return (
        <div className={`cursor-wrapper-default`}>
            <div className={`secondary-cursor ${size}`} ref={secondaryCursor}></div>
        </div>
    );
};

export default CustomCursor;
