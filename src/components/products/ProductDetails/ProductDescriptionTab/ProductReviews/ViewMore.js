import React from "react";

export default function ViewMore({ onViewMoreEvt = () => {} }) {
  return (
    <div>
      <span className="view-more" onClick={() => onViewMoreEvt()}>
        View More
      </span>
    </div>
  );
}

