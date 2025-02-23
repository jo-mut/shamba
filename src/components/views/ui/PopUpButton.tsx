import React from "react";

const PopUpButton = ({ title, handleClick }) => {
  return (
    <button
      className="form__btn" type="button"
      onClick={handleClick}>
      {title}
    </button>
  )
};

export default PopUpButton;
