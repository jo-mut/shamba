import React from "react";

interface ListProps {
  name: string,
  value: string
}

const List: React.FC<ListProps> = ({
  name,
  value
}) => {
  return (
    <li>
      {name}: <b>{value}</b>
    </li>
  )
};

export default List;
