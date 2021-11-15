import React from 'react';
import api from '../utils/Api'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  /** Состояние загрузки */
  const [isLoading, SetIsLoading] = React.useState(false);

  /** Массив загруженных карточек */
  const [cards, SetCards] = React.useState([]);

  /** Подписка на контекст CurrentUserContext */
  const currentUser = React.useContext(CurrentUserContext);

  /** Запрос карточек (При загрузке страницы) */
  React.useEffect(() => {
    SetIsLoading(true);
    api.getCards()
      .then((data) => {
        SetCards(data.map((item) => ({
            ownerId: item.owner._id,
            id: item._id,
            title: item.name,
            link: item.link,
            likes: item.likes
        })));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }, [] );

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar"
               src={currentUser.avatar}
               alt="Аватарка пользователя." />
          <button className="profile__edit-avatar"
                  onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button"
                  onClick={props.onEditProfile}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button"
                onClick={props.onAddPlace}></button>
      </section>

      <section className="places content__places">
        <ul className="cards">
          { 
            isLoading ? 
            "" :
            cards.map(({ key, ...card }) => (
                <Card onCardClick={props.onCardClick} key={card.id} card={{...card}}></Card>
              ) 
            )
          }
        </ul>
      </section>
    </main>

    

  );
}

export default Main;