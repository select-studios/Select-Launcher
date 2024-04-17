import { observer } from "mobx-react";
import React, { FC } from "react";

interface IProps {}

/**
 * @author
 * @function @Developer
 **/

const DeveloperComp: FC<IProps> = (props) => {
  return <div>Developer</div>;
};

export const Developer = observer(DeveloperComp);
