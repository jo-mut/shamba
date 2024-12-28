import React from "react";

const AdminCard = ({
  name,
  value
}: any) => {
  return (
    <div className="cold-12 col-md-4">
      <div className="stats">
        <span className="stats__value">{value}</span>
        <span className="stats__name">{name}</span>
      </div>
    </div>
  )
};

export default AdminCard;
