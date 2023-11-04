import React, { useRef, useState, useEffect } from "react";
import ProjectItem from "../components/ProjectItem";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { pageData } from "../data";
import CursorManager from "../components/CustomCursor/CursorManager";
import CustomCursor from "../components/CustomCursor";

export default function Home() {
  const menuItems = useRef(null);
  const [renderItems, setRenderItems] = useState(pageData);
  const [clonesHeight, setClonesHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null); // Add this line

  const cloneItems = () => {
    const itemHeight = menuItems.current.childNodes[0].offsetHeight;
    const screenHeight = window.innerHeight;
    const fitMax = Math.ceil(screenHeight / itemHeight);

    const clonedItems = renderItems.slice(0, fitMax);

    setRenderItems([...renderItems, ...clonedItems]);
    const newClonesHeight = clonedItems.length * itemHeight;
    setClonesHeight(newClonesHeight);
    return newClonesHeight;
  };

  const getScrollPos = () => {
    return menuItems.current.scrollTop;
  };

  const setScrollPos = (pos) => {
    menuItems.current.scrollTop = pos;
  };

  useEffect(() => {
    cloneItems();

    menuItems.current.style.scrollBehavior = "unset";
    const scrollUpdate = () => {
      const scrollPos = getScrollPos();

      if (scrollPos <= 0) {
        // Set the scroll position to the bottom of the cloned items with a buffer
        setScrollPos(clonesHeight - 1);
      } else if (scrollPos + menuItems.current.clientHeight >= menuItems.current.scrollHeight - 1) {
        // Buffer to ensure we're not resetting during momentum scroll
        setScrollPos(1);
      }
    };

    // Consider debouncing this if it fires too often
    menuItems.current.addEventListener("scroll", scrollUpdate);

    return () => {
      menuItems.current.removeEventListener("scroll", scrollUpdate);
    };
  }, [clonesHeight]);

  return (
    <CursorManager>
      <CustomCursor />
      <Header />
      <div className="main-container" id="main-container">
        <ul ref={menuItems}>
          {renderItems.map((project, index) => (
            <ProjectItem key={index} project={project} itemIndex={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          ))}
        </ul>
      </div>
      <Footer />
    </CursorManager>
  );
}
