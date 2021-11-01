import React from 'react';

export default function Card(props) {

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
          <button className="card__icon-like" type="button"></button>
          <span className="card__like-counter">{props.card.likes}</span>
        </div>
        <button className="card__trash" type="button"></button>
      </li>
    )
}