import React from "react";

interface ButtonCmpProps {
  name: string,
  tab: string,
  styleClass?: string,
}

const ButtonCmp: React.FC<ButtonCmpProps> = ({
  name,
  tab,
  styleClass
}) => {
  return (
    <li className={"nav-item"} role="presentation">
      <button className={`${styleClass}`}
        data-bs-toggle="tab"
        data-bs-target={`#tab-${tab}`}
        type="button"
        role="tab"
        aria-controls={`tab-${tab}`}
        aria-selected={`true`}>
        {name}
      </button>
    </li>
  );
};

export default ButtonCmp;
