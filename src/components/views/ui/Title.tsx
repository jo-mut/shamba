import React from "react";

interface TitleProps {
  title: string
}

const Title: React.FC<TitleProps> = ({
  title
}) => {
  return (
    <div className="col-12">
      <h3 className="profile__title">
        {title}
      </h3>
    </div>
  );
};

export default Title;
