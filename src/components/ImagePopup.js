import React from "react";

function ImagePopup () {
  return (
    <div className="popup popup_type_image">
      <div className="popup__container">
        <figure className="popup__container-image">
          <img className="popup__image"
              src="#"
              alt="Альтернативный текст" />
          <figcaption className="popup__image-title"></figcaption>
        </figure>
        <button className="popup__icon-close" type="button"></button>
      </div>
    </div>
  );
}

export default ImagePopup;