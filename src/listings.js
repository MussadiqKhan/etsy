import React from "react";
import style from "./listing.module.css";

const Listings = props => {
  return (
    <div>
      <a href={props.url}>
        <div className={style.recipe}>
          <img className={style.image} src={props.image} alt="" />
          <h1 className={style.h1}>{props.title}</h1>

          <p>
            <b>Price: </b>${props.price}
          </p>
          <p>
            <b>Num of Favorites: </b>
            {props.fav}
          </p>
        </div>
      </a>
    </div>
  );
};

export default Listings;
