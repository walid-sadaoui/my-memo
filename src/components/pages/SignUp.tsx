import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import LabelInput from "../molecules/LabelInput";
import { useAuth } from "../../AuthContext";
interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const SignUp: FunctionComponent = () => {
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);
  const [signupErrorMessage, setsignupErrorMessage] = React.useState<string>(
    ""
  );
  const { signup } = useAuth();
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    const { username, email, password } = data;

    try {
      const signupSuccess = await signup({ username, email, password });
      if (signupSuccess) {
        setSignUpSuccess(true);
      } else {
        setsignupErrorMessage("Une erreur est survenue");
      }
    } catch (error) {
      setsignupErrorMessage(`Une erreur est survenue : ${error.message}`);
    }
  };

  return (
    <section className="flex flex-col flex-1 w-full max-w-2xl p-2 mx-auto my-auto sm:shadow-lg sm:border-t-4 sm:border-blue-900">
      {signUpSuccess ? (
        <Redirect to={process.env.PUBLIC_URL + "/login"} />
      ) : null}
      <header className="flex items-center justify-center py-2 pl-8 pr-12 text-gray-900">
        <h1 className="text-5xl font-medium text-gray-800 font-hand">
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
          className="inline-flex items-center px-4 py-2 mx-auto my-4 text-white bg-blue-900 rounded hover:bg-blue-800"
        >
          S'inscrire
        </button>
      </form>
      <span className="mx-auto">
        Vous avez déjà un compte ?{" "}
        <Link
          to={process.env.PUBLIC_URL + "/signup"}
          className="text-blue-700 hover:underline"
        >
          Connectez-vous
        </Link>
      </span>
      {signupErrorMessage && (
        <span className="mx-auto text-red-500">{signupErrorMessage}</span>
      )}
    </section>
  );
};

export default SignUp;
