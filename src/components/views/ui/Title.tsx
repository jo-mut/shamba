import React from "react";

interface TitleProps {
  title: string
}

const Title: React.FC<TitleProps> = ({
  title
}) => {
  return (
    <div className="col-12">
      <h3 className="font-bold text-center mb-4 text-2xl">
        {title}
      </h3>
    </div>
  );
};

export default Title;
