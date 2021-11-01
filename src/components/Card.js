import React from 'react';

export default function Card(props) {
    return (
      <li className="card">
        <img className="card__image"
            src={props.link}
            alt={props.title} />
        <h2 className="card__name">{props.title}</h2>
        <div className="card__like-container">
          <button className="card__icon-like" type="button"></button>
          <span className="card__like-counter">{props.likes}</span>
        </div>
        <button className="card__trash" type="button"></button>
      </li>
    )
}