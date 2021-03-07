import React, { FunctionComponent } from "react";
import { ReactComponent as Exclamation } from "../../assets/images/exclamation.svg";

const Warning: FunctionComponent = () => {
  return (
    <div className="flex flex-col p-8 sm:flex-row border mx-8 border-red-600 bg-red-100 sm:pl-8 items-center">
      <Exclamation className="w-8 h-8 sm:mr-2 text-red-600" />
      <p className="text-red-600">
        Attention vous utilisez la version hors ligne, vous verrez vos notes
        seulement sur votre navigateur actuel, connectez vous pour pouvoir
        sauvegarder vos notes et les consulter partout !{" "}
      </p>
    </div>
  );
};

export default Warning;
