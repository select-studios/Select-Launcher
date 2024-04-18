import React, { FC } from "react";

interface IProps {}

/**
 * @author
 * @function @FloatingSquares
 **/

export const FloatingSquares: FC<IProps> = (props) => {
  return (
    <div className="area">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
