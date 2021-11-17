import React from "react";
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup (props) {

  /** Текущий пользователь */
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  /** Записывает информацию о пользователе в стейт-переменные */
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  /** Отправляет запрос к api. Обновляет информацию о пользователе */
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  
  /** Записывает имя пользователя в стейт-переменную */
  function handleChangeName(e) {
    setName(e.target.value);
  }

  /** Записывает описание пользователя в стейт-переменную */
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="edit-profile" 
                   isOpen={props.isOpen}
                   onClose={props.onClose}
                   onSubmit={handleSubmit}>
        <input id="name-user-input" className="popup__input popup__input_type_name"
               type="text" name="name" required minLength="2" maxLength="40"
               value={name || ' '} onChange={handleChangeName} />
        <span className="popup__input-error name-user-input-error"></span>
        <input id="description-input" className="popup__input popup__input_type_description"
               type="text" name="description" required minLength="2" maxLength="200"
               value={description || ' '} onChange={handleChangeDescription} />
        <span className="popup__input-error description-input-error"></span>
        <button className="popup__button" type="submit">
            Сохранить
        </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;