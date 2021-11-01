import React from 'react';
import api from '../utils/Api'
import Card from './Card'

function Main(props) {

  const [userName, SetUserName] = React.useState("");
  const [userDescription, SetUserDescription] = React.useState("");
  const [userAvatar, SetUserAvatar] = React.useState("");

  /** Состояние загрузки */
  const [isLoading, SetIsLoading] = React.useState(false);

  /** Массив загруженных карточек */
  const [cards, SetCards] = React.useState([]);


  /** Запрос информации о пользователе (При загрузке страницы) */
  React.useEffect(() => {
    SetIsLoading(true);
    api.getUserInformation()
      .then((data) => {
        SetUserName(data.name);
        SetUserDescription(data.about);
        SetUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }, [] );

  /** Запрос карточек (При загрузке страницы) */
  React.useEffect(() => {
    SetIsLoading(true);
    api.getCards()
      .then((data) => {
        SetCards(data.map((item) => ({
            id: item._id,
            title: item.name,
            link: item.link,
            likes: item.likes.length
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
               src={userAvatar}
               alt="Аватарка пользователя." />
          <button className="profile__edit-avatar"
                  onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button"
                  onClick={props.onEditProfile}></button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button"
                onClick={props.onAddPlace}></button>
      </section>

      <section className="places content__places">
        <ul className="cards">
          { 
            isLoading ? 
            "" :
            cards.map(({ id, ...card }) => <Card key={id} {...card}></Card>) 
          }

        </ul>
      </section>
    </main>

    

  );
}

export default Main;