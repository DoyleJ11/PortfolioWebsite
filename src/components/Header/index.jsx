import React, { useContext, useState } from 'react';
import './style.scss';
import { CursorContext } from '../CustomCursor/CursorManager';
import cn from 'classnames'
import { Hash } from 'react-feather';


export default function Header() {

    const { setSize } = useContext(CursorContext)
    const [opened, setOpen] = useState(false)
    const handleMouseEnter = () => {
        setSize("medium")
    }

    const handleMouseLeave = () => {
        setSize("small")
    }

    return (
        <>
    <div className='overlay-nav'>
        <div className='header-container'>
            <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                jackson
            </h1>
            <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                doyle
            </h1>
        </div>
    </div>
{/* 
    <div 
         className={cn('overlay-burger-icon', {'as-opened': opened})}
         onClick={() => setOpen(!opened)}
         />

         <div className={cn("overlay-burger-menu", {'as-opened': opened})}>
            <div className='burger-menu-header'>
                <Hash size={16} /> menu
            </div>
            
            <h1>Jackson</h1>
            <h1>studio</h1>
         </div> */}
        </>
    )
}