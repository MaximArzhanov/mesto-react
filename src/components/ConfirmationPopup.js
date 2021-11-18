import React from "react";
import PopupWithForm from './PopupWithForm'

function ConfirmationPopup(props) {

  /** Отправляет запрос к api. Удаляет карточку */
  function handleClick(e) {
    props.onConfirmation(props.card);
  }

  return (
    <PopupWithForm title="Вы уверены?" name="confirmation"
                   isOpen={props.isOpen}
                   onClose={props.onClose} >
      <button className="popup__button" type="button" onClick={handleClick}>
        {props.isLoading ? 'Да...' : 'Да'}
      </button>
    </PopupWithForm>
  );
}

export default ConfirmationPopup;