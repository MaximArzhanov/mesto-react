import React from 'react';
import api from '../utils/Api'

function Main(props) {

  const [userName, SetUserName] = React.useState("");
  const [userDescription, SetUserDescription] = React.useState("");
  const [userAvatar, SetUserAvatar] = React.useState("");

  React.useEffect(() => {
    api.getUserInformation()
      .then((data) => {
        console.log(data);
        SetUserName(data.name);
        SetUserDescription(data.about);
        SetUserAvatar(data.avatar);
      })
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
        </ul>
      </section>
    </main>
  );
}

export default Main;