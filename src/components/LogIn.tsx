import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import LabelInput from "./LabelInput";

// form: username, password, email
const LogIn: FunctionComponent = () => {
  return (
    <section className="flex flex-col flex-1 p-2 rounded shadow-lg ">
      <header className="flex pl-8 pr-12 py-2 items-center text-gray-900">
        <h1 className="text-5xl font-medium font-hand text-gray-800">
          Connexion
        </h1>
      </header>
      <form className="flex flex-col px-8">
        <LabelInput id="signup-email" label="Email" type="email" />
        <LabelInput id="signup-password" label="Mot de passe" type="password" />
        <Link to="/signup" className="hover:underline text-blue-700 mr-auto">
          <span>Mot de passe oublié ?</span>
        </Link>
        <button
          type="submit"
          className="bg-blue-900 text-white py-2 my-4 px-4 mx-auto rounded inline-flex items-center hover:bg-blue-800"
        >
          Se Connecter
        </button>
      </form>
      <span className="mx-auto">
        Vous n'avez pas de compte ?{" "}
        <Link to="/signup" className="hover:underline text-blue-700">
          Créez un compte
        </Link>
      </span>
    </section>
  );
};

export default LogIn;
