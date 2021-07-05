import React, { FunctionComponent } from "react";
import Button, { ButtonSize } from "../atoms/Button";
import Icon from "../atoms/Icon";

interface WarningProps {
  message: string;
}
const Warning: FunctionComponent<WarningProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 text-red-600 bg-red-100 border border-red-600 sm:flex-row">
      <div className="p-2">
        <Icon icon="exclamation" size="medium" />
      </div>
      <p>{message}</p>
      <Button icon="x" size={ButtonSize.MEDIUM} />
    </div>
  );
};

export default Warning;
