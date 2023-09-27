import {  useEffect } from "react";
import { createPortal } from "react-dom";
import './Modal.css'

const modalRoot=document.querySelector('#modal-root') as HTMLElement;;

interface Props{
    children:React.ReactNode;
    onClose:()=>void;
}

export default function Modal ({children,onClose}:Props){
    useEffect(()=>{
        window.addEventListener('keydown',handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
    },[])

   const  handleKeyDown =(e:KeyboardEvent)=>{
        if(e.code==='Escape'){
            onClose();
        }
    }

const handleBackDropClick=(e:React.MouseEvent<HTMLDivElement>)=>{
    if(e.currentTarget===e.target){
        onClose()
    }
}
   
        return createPortal(
            <div   className='Modal__backdrop' onClick={handleBackDropClick}>
                <div className="Modal__content">{children}</div>
            </div>,
            modalRoot
        )
    }


