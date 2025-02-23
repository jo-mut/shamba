import React from "react";

const ClickButton = ({
  name,
  handleClick
}) => {
  return (
    <div className="col-12">
      <button
        type="button"
        onClick={handleClick}
        className="flex-1 form__btn ">
        {name}
      </button>
    </div>
  )
};

export default ClickButton;
