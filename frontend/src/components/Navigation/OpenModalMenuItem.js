import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import "../../context/Modal.css"

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal // optional: callback function that will be called once the menu item that opens the modal is clicked
   // optional: callback function that will be called once the modal is closed
}) {
  const [ setModalContent, setOnModalClose ] = useState(false);

  const onClick = () => {
    setOnModalClose(!setModalContent)
  };

  return (
    <div onClick={() =>{ if(!setModalContent) setOnModalClose(true)}}>
    <button onClick={onClick} className='btn-modal'>{itemText}</button>
    {setModalContent &&
    <div>
    <div className='overlay'  onClick={onClick}></div>
    {modalComponent}
    </div>}
    </div>
  );
}

export default OpenModalMenuItem;
