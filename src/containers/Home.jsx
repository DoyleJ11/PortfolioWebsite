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

  const cloneItems = () => {
    const itemHeight = menuItems.current.childNodes[0].offsetHeight;
    const fitMax = Math.ceil(window.innerHeight / itemHeight);

    const clonedItems = renderItems.slice(0, fitMax);

    setRenderItems([...renderItems, ...clonedItems]);
    return clonedItems.length * itemHeight;
  };

  const getScrollPos = () => {
    return menuItems.current.scrollTop;
  };

  const setScrollPos = (pos) => {
    menuItems.current.scrollTop = pos;
  };

  useEffect(() => {
    const clonesHeight = cloneItems();

    menuItems.current.style.scrollBehavior = "unset";
    const scrollUpdate = () => {
      const scrollPos = getScrollPos();
      if (scrollPos <= 0) {
        setScrollPos(clonesHeight);
      } else if (scrollPos + menuItems.current.clientHeight >= menuItems.current.scrollHeight) {
        setScrollPos(1);
      }
    };
    
    menuItems.current.addEventListener("scroll", scrollUpdate);

    return () => {
      menuItems.current.removeEventListener("scroll", scrollUpdate);
    };
  }, []);

  return (
    <CursorManager>
        <CustomCursor />
      <Header />
      <div className="main-container" id="main-container">
        <ul ref={menuItems}>
          {renderItems.map((project, index) => (
            <ProjectItem key={index} project={project} itemIndex={index} />
          ))}
        </ul>
      </div>
      <Footer />
    </CursorManager>
  );
}
