import React from "react";
import PopupWithForm from './PopupWithForm'
//import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup (props) {

  /** Текущий пользователь */
  // const currentUser = React.useContext(CurrentUserContext);

  // const [avatar, SetAvatar] = React.useState('');

  /** Записывает ссылку на аватар пользователя в стейт-переменную */
  // React.useEffect(() => {
  //   SetAvatar(currentUser.avatar);
  // }, [currentUser]); 

  const inputAvatarRef = React.useRef();

  /** Отправляет запрос к api. Обновляет аватар пользователя */
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
      clearInputAvatar
    });
  }

  /** Очищает поле ввода аватарки пользователя */
  function clearInputAvatar() {
    inputAvatarRef.current.value = '';
  }

  return (
    <PopupWithForm title="Обновить аватар" name="update-avatar"
                   isOpen={props.isOpen}
                   onClose={props.onClose}
                   onSubmit={handleSubmit}>
      <input id="url-input-avatar" className="popup__input popup__input_type_link"
             type="url" name="link" required
             placeholder="Ссылка на картинку"
             ref={inputAvatarRef} />
      <span className="popup__input-error url-input-avatar-error"></span>
      <button className="popup__button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;