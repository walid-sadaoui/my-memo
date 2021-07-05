import React, { FunctionComponent, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import LabelInput from "../molecules/LabelInput";
import Button from "../atoms/Button";

interface LoginFormValues {
  email: string;
  password: string;
}

const LogIn: FunctionComponent = () => {
  const { login } = useAuth();
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async ({
    email,
    password,
  }) => {
    await login({ email, password });
  };

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  return (
    <section className="flex flex-col flex-1 p-2 my-auto sm:border-t-4 sm:border-blue-900 mx-auto max-w-2xl sm:shadow-lg">
      <header className="flex pl-8 pr-12 py-2 items-center text-gray-900 justify-center">
        <h1 className="text-5xl font-medium font-hand text-gray-800">
          Connexion
        </h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-8">
        <LabelInput
          id="signup-email"
          label="Email"
          type="email"
          name="email"
          ref={(e) => {
            emailInputRef.current = e;
            register(e, { required: true });
          }}
        />
        {errors.email && (
          <span className="text-red-500">L'email est requis</span>
        )}
        <LabelInput
          id="signup-password"
          label="Mot de passe"
          type="password"
          name="password"
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password?.type === "required" && (
          <span className="text-red-500">Le mot de passe est requis</span>
        )}
        {errors.password?.type === "minLength" && (
          <span className="text-red-500">
            Le mot de passe doit contenir au moins 6 caractères avec une lettre
            et un chiffre
          </span>
        )}
        <Link to="/signup" className="mr-auto text-blue-700 hover:underline">
          Mot de passe oublié ?
        </Link>
        <Button value="Se Connecter" type="submit" />
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 mx-auto my-4 text-white bg-blue-900 rounded hover:bg-blue-800"
        >
          Se Connecter
        </button>
      </form>
      <span className="mx-auto">
        Vous n'avez pas de compte ?{" "}
        <Link to="/signup" className="text-blue-700 hover:underline">
          Créez un compte
        </Link>
      </span>
    </section>
  );
};

export default LogIn;
