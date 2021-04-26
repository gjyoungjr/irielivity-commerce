import React, { Fragment } from "react";

export default function ProductAdditonalInfo({ materials, dimensions, color }) {
  return (
    <div className="product-anotherinfo-wrapper">
      <ul>
        {dimensions && (
          <li>
            <span>Dimensions</span>
            {dimensions}
          </li>
        )}
        {color && (
          <li>
            <span>Color</span>
            {color}
          </li>
        )}
        <li>
          <span>Materials</span>{" "}
          {materials && materials.length
            ? materials.map((item, key) => (
                <Fragment key={key}>
                  {item} {key === materials.length - 1 ? "" : ","}{" "}
                </Fragment>
              ))
            : ""}
        </li>
      </ul>
    </div>
  );
}
