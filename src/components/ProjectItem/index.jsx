import React, { useRef, useReducer, useContext } from 'react';
import './style.scss';
import Title from './Title';
import Image from './Image';
import Media from './Media';
import cn from 'classnames';
import { Hash } from 'react-feather';
import animate from './animate';
import { CursorContext } from '../CustomCursor/CursorManager';

const initialState = {
    opacity: 0,
    paralaxPos: {x: 0, y: -20},
    scale: 0.8,
    rotationPos: 0,
    active: false,
    showModal: false,
}

function reducer (state, action) {
    switch(action.type) {
        case "MOUSE/ENTER": {
            return {
            ...state,
            active: true,
            }
        }
        case "MOUSE/LEAVE": {
            return {
            ...state,
            active: false,
            }
        }
        case "TOGGLE/MODAL": {
            return {
                ...state,
                showModal: !state.showModal
            }
        }
        case "CHANGE/OPACITY": {
            return {
            ...state,
            opacity: action.payload
            }
        }
        case "MOUSE/COORDINATES": {
            return {
                ...state,
                paralaxPos: action.payload
            }
        }
        case "CHANGE/ROTATION": {
            return {
                ...state,
                rotationPos: action.payload
            }
        }
        case "CHANGE/SCALE": {
            return {
                ...state,
                scale: action.payload
            }
        }

        default: {
            throw new Error();
        }
    }
} 

export default function ProjectItem({project, itemIndex}) {
const listItem = useRef(null)
const {setSize} = useContext(CursorContext)
const [state, dispatch] = useReducer(reducer, initialState)
const easeMethod = 'easeInOutCubic';

const paralax = (event) => {
    const speed = -5;
    const x = (window.innerWidth - event.pageX * speed)/100
    const y = (window.innerHeight - event.pageY * speed)/100

    dispatch({type: "MOUSE/COORDINATES", payload: {x, y}})
}

const handleOpacity = (initialOpacity, newOpacity, duration) => {
    animate({
        fromValue: initialOpacity,
        toValue: newOpacity,
        onUpdate: (newOpacity, callback) => {
            dispatch({type: 'CHANGE/OPACITY', payload: newOpacity})
            callback();
        },
        onComplete: ()=> {},
        duration: duration,
        easeMethod: easeMethod
    })
}

const handleRotation = (currentRotation, duration) => {
    //Random between -15 and 15
    const newRotation = Math.random() * 15 * (Math.round(Math.random()) ? 1 : -1)
    animate({
        fromValue: currentRotation,
        toValue: newRotation,
        onUpdate: (newOpacity, callback) => {
            dispatch({type: 'CHANGE/ROTATION', payload: newOpacity})
            callback();
        },
        onComplete: ()=> {},
        duration: duration,
        easeMethod: easeMethod
    })
}

const handleScale = (initialScale, newScale, duration) => {
    animate({
        fromValue: initialScale,
        toValue: newScale,
        onUpdate: (newOpacity, callback) => {
            dispatch({type: 'CHANGE/SCALE', payload: newOpacity})
            callback();
        },
        onComplete: ()=> {},
        duration: duration,
        easeMethod: easeMethod
    })
}


const handleMouseEnter = () => {
    handleScale(0.8, 1, 500)
    handleOpacity(0, 1, 500)
    handleRotation(state.rotationPos, 500)
    listItem.current.addEventListener('mousemove', paralax)
    dispatch({type: 'MOUSE/ENTER'})
    setSize("regular")
}


const handleMouseLeave = () => {
    listItem.current.removeEventListener('mousemove', paralax)

    handleOpacity(1, 0, 800)
    handleScale(1, initialState.scale, 500)
    handleRotation(state.rotationPos, 500)
    dispatch({type: 'MOUSE/COORDINATES', payload: initialState.paralaxPos})
    dispatch({type: 'MOUSE/LEAVE'})
    setSize("small")
}
    return (
        <li className='project-item-container' ref={listItem}>
            <Title title={project.title} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}/>
            {/* <Image url={project.url} opacity={state.opacity} paralaxPos={state.paralaxPos} scale={state.scale} rotationPos={state.rotationPos}/> */}
            <Media url={project.url} mediaType={project.mediaType} opacity={state.opacity} paralaxPos={state.paralaxPos} scale={state.scale} rotationPos={state.rotationPos}/>

            <div className={cn('info-block', {'as-active': state.active})}>
                <p className='info-block-header'>
                    <span>
                        <Hash />0{itemIndex}
                    </span>
                </p>

                {project.info.map((element) => (
                    <p key={element}>
                        <span>{element}</span>
                    </p>
                ))}
            </div>
        </li>
    )
}
