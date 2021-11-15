import React from 'react';
import '../index.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
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

  function handleEditProfileClick() {
    SetIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    SetIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    SetIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    SetIsEditProfilePopupOpen(false);
    SetIsAddPlacePopupOpen(false);
    SetIsEditAvatarPopupOpen(false);
    SetSelectedCard({});
  }

  function handleCardClick(card) {
    SetSelectedCard(card);
  }

  /** Запрос информации о пользователе при загрузке страницы */
  React.useEffect(() => {
    //SetIsLoading(true);
    api.getUserInformation()
      .then((data) => {
        SetCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      })
      /*.finally(() => {
        SetIsLoading(false);
      });*/
  }, [] );

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

        <PopupWithForm title="Редактировать профиль" name="edit-profile" 
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}>
          <input id="name-user-input" className="popup__input popup__input_type_name"
                type="text" name="name" required minLength="2" maxLength="40" />
          <span className="popup__input-error name-user-input-error"></span>
          <input id="description-input" className="popup__input popup__input_type_description"
                type="text" name="description" required minLength="2" maxLength="200" />
          <span className="popup__input-error description-input-error"></span>
          <button className="popup__button" type="submit">
            Сохранить
          </button>
        </PopupWithForm>


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
        
        
        <PopupWithForm title="Обновить аватар" name="update-avatar"
                      isOpen={isEditAvatarPopupOpen}
                      onClose={closeAllPopups}>
          <input id="url-input-avatar" className="popup__input popup__input_type_link"
                type="url" name="link" required
                placeholder="Ссылка на картинку" />
          <span className="popup__input-error url-input-avatar-error"></span>
          <button className="popup__button" type="submit">
            Сохранить
          </button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
