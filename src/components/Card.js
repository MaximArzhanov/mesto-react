import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {

    /** Подписка на контекст CurrentUserContext */
    const currentUser = React.useContext(CurrentUserContext);

    /** Определяет, является ли пользователь владельцем текущей карточки */
    const isOwn = props.card.ownerId === currentUser._id;

    /** Содержит классы для кнопки удаления карточки  */
    const cardDeleteButtonClassName = (
      `card__trash ${isOwn ? '' : 'card__trash_disable'}`
    );

    /** Определяет, ставил ли пользователь лайк для текущей карточки */
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    /** Содержит классы для кнопки лайк */
    const cardLikeButtonClassName = (
      `card__icon-like ${isLiked ? 'card__icon-like_active' : ''}`
    );
    
    /** Событие при клике на изображение карточки */
    function handleClick() {
      props.onCardClick(props.card);
    }  

    return (
      <li className="card">
        <img className="card__image"
            src={props.card.link}
            alt={props.card.title} 
            onClick={handleClick}/>
        <h2 className="card__name">{props.card.title}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button"></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
        <button className={cardDeleteButtonClassName} type="button"></button>
      </li>
    )
}