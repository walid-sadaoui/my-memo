import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import LabelInput from "./LabelInput";
import { postRequest } from "../api/index";
interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const SignUp: FunctionComponent = () => {
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    const { username, email, password } = data;
    const formData = { username, email, password };
    const signUpResponse = await postRequest(
      "/signup",
      JSON.stringify(formData)
    );
    if (signUpResponse.code === 200) {
      setSignUpSuccess(true);
    }
  };

  return (
    <section className="flex flex-col flex-1 p-2 border-t-4 border-blue-900 my-auto shadow-lg w-full max-w-2xl mx-auto">
      {signUpSuccess ? <Redirect to="/login" /> : null}
      <header className="flex pl-8 pr-12 py-2 items-center text-gray-900 justify-center">
        <h1 className="text-5xl font-medium font-hand text-gray-800">
          Inscription
        </h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-8">
        <LabelInput
          id="signup-username"
          label="Nom d'utilisateur"
          type="text"
          name="username"
          ref={(e) => {
            usernameInputRef.current = e;
            register(e);
          }}
          maxLength={20}
        />
        <LabelInput
          id="signup-email"
          label="Email"
          type="email"
          name="email"
          ref={register({ required: true })}
        />
        {errors.email && (
          <span className="text-red-500">L'email est requis</span>
        )}
        <LabelInput
          id="signup-password"
          label="Mot de passe"
          type="password"
          name="password"
          ref={register({ required: true, minLength: 8 })}
        />
        {errors.password?.type === "required" && (
          <span className="text-red-500">Le mot de passe est requis</span>
        )}
        {errors.password?.type === "minLength" && (
          <span className="text-red-500">
            Le mot de passe doit contenir au moins 8 caractères avec au moins
            une majuscule, une minuscule, un chiffre et un caractère spécial
          </span>
        )}
        {/* TODO maxLength + Maj + chiffre */}
        <LabelInput
          id="signup-password-confirm"
          name="confirmPassword"
          label="Confirmez le mot de passe"
          type="password"
          ref={register({
            validate: (value) => value === watch("password"),
            required: true,
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">
            Les mots de passe ne correspondent pas
          </span>
        )}
        <button
          type="submit"
          className="bg-blue-900 text-white py-2 my-4 px-4 mx-auto rounded inline-flex items-center hover:bg-blue-800"
        >
          S'inscrire
        </button>
      </form>
      <span className="mx-auto">
        Vous avez déjà un compte ?{" "}
        <Link to="/login" className="hover:underline text-blue-700">
          Connectez-vous
        </Link>
      </span>
    </section>
  );
};

export default SignUp;
