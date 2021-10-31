import React from "react";

function PopupWithForm (props) {



  return (
    <div className={`popup popup_type_${props.name}
                  ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_form">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={`form-${props.name}`}>
          {props.children}
        </form>
        <button className="popup__icon-close"
                type="button"
                onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;