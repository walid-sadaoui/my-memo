import React, { FunctionComponent } from "react";
import LabelInput from "./LabelInput";

// form: username, password, email
const SignUp: FunctionComponent = () => {
  return (
    <section className="flex flex-col flex-1 p-2 rounded">
      <header className="flex pl-8 pr-12 py-2 items-center text-gray-900">
        <h1 className="text-5xl font-medium font-hand text-gray-800">
          Inscription
        </h1>
      </header>
      <form className="flex flex-col px-8">
        <LabelInput id="login-username" label="Nom d'utilisateur" type="text" />
        <LabelInput id="login-email" label="Email" type="email" />
        <LabelInput id="login-password" label="Mot de passe" type="password" />
        <LabelInput
          id="login-password-confirm"
          label="Confirmez le mot de passe"
          type="password"
        />
        <button
          type="submit"
          className="bg-blue-900 text-white py-2 my-4 px-4 mx-auto rounded inline-flex items-center hover:bg-blue-800"
        >
          S'inscrire
        </button>
      </form>
    </section>
  );
};

export default SignUp;
