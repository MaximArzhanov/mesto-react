import React from 'react';
import '../index.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ImagePopup from './ImagePopup'
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  /** Текущий пользователь */
  const [currentUser, SetCurrentUser] = React.useState({});

  /** Состояние загрузки */
  //const [isLoading, SetIsLoading] = React.useState(false);

  const [isEditProfilePopupOpen, SetIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, SetIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, SetIsEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, SetSelectedCard] = React.useState({});

  /** Открывает окно редактирования профиля */
  function handleEditProfileClick() {
    SetIsEditProfilePopupOpen(true);
  }

  /** Открывает окно добавления новой карточки */
  function handleAddPlaceClick() {
    SetIsAddPlacePopupOpen(true);
  }

  /** Открывает окно обновления аватарки */
  function handleEditAvatarClick() {
    SetIsEditAvatarPopupOpen(true);
  }

  /** Закрывает все модальные окна */
  function closeAllPopups() {
    SetIsEditProfilePopupOpen(false);
    SetIsAddPlacePopupOpen(false);
    SetIsEditAvatarPopupOpen(false);
    SetSelectedCard({});
  }

  /** Открывает окно с увеличенным изображением */
  function handleCardClick(card) {
    SetSelectedCard(card);
  }

  /** Запрашивает информацию о пользователе при загрузке страницы */
  React.useEffect(() => {
    api.getUserInformation()
      .then((data) => {
        SetCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      })
  }, [] );

  /** Обновляет информацию о пользователе */
  function handleUpdateUser({ name, about }) {
    //SetIsLoading(true);
    api.updateUserInformation(name, about)
      .then((data) => {
        SetCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      /*.finally(() => {
        SetIsLoading(false);
      });*/
  }

  /** Обновляет аватарку пользователя */
  function handleUpdateAvatar({ avatar, clearInputAvatar }) {
    //SetIsLoading(true);
    api.updateUserAvatar(avatar)
      .then((data) => {
        SetCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        //SetIsLoading(false);
        clearInputAvatar(); // Очищает поле ввода аватарки пользователя
      });
  }

  return (
    <div className="root">

      <CurrentUserContext.Provider value={currentUser}>

        <div className="page root__page">

          <Header />
          <Main onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick} />
          <Footer />

        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser} />
        
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar} /> 

        <PopupWithForm title="Новое место" name="add-new-place"
                       isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}>
          <input id="name-picture-input" className="popup__input popup__input_type_name"
                 type="text" name="name" required minLength="2" maxLength="30"
                 placeholder="Название" />
          <span className="popup__input-error name-picture-input-error"></span>
          <input id="url-input-place" className="popup__input popup__input_type_link"
                 type="url" name="link" required
                 placeholder="Ссылка на картинку" />
          <span className="popup__input-error url-input-place-error"></span>
          <button className="popup__button" type="submit">
            Создать
          </button>
        </PopupWithForm>
        
        <PopupWithForm title="Вы уверены?" name="confirmation"
                       onClose={closeAllPopups}>
          <button className="popup__button" type="button">
            Да
          </button>
        </PopupWithForm>
        
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
