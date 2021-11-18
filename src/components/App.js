import React from 'react';
import '../index.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  /** Текущий пользователь */
  const [currentUser, SetCurrentUser] = React.useState({});

  /** Состояние загрузки */
  const [isLoading, SetIsLoading] = React.useState(false);

  const [isEditProfilePopupOpen, SetIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, SetIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, SetIsEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, SetSelectedCard] = React.useState({});

  /** Массив загруженных карточек */
  const [cards, SetCards] = React.useState([]);

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
    SetIsLoading(true);
    api.updateUserInformation(name, about)
      .then((data) => {
        SetCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }

  /** Обновляет аватарку пользователя */
  function handleUpdateAvatar({ avatar }) {
    SetIsLoading(true);
    api.updateUserAvatar(avatar)
      .then((data) => {
        SetCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }

  /** Добавляет новую карточку */
  function handleAddPlaceSubmit({ name, link }) {
    SetIsLoading(true);
    api.addCard(name, link)
      .then((newCard) => {
        SetCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }

  /** Запрос карточек (При загрузке страницы) */
  React.useEffect(() => {
    SetIsLoading(true);
    api.getCards()
      .then((data) => {
        SetCards(data.map((item) => (item)));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }, [] );

  /** Определяет, ставил ли пользователь лайк для текущей карточки
  *   Ставит/удаляет лайк   */
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        SetCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.error(err);
      })
  } 

  /** Удаляет карточку  */
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((data) => {
        SetCards((state) => state.filter((c) => {
          return (c._id !== card._id) //Возвращает все карточки кроме той которую удалили
        }));
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div className="root">

      <CurrentUserContext.Provider value={currentUser}>

        <div className="page root__page">

          <Header />
          <Main onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                isLoading={isLoading} />
          <Footer />

        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
                          isLoading={isLoading} />
        
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
                         isLoading={isLoading} /> 

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
                       isLoading={isLoading} />
        
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
