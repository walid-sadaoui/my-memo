import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { postRequest } from "../../api";
import { AuthContext } from "../../AuthContext";
import LabelInput from "../molecules/LabelInput";

interface LoginFormValues {
  email: string;
  password: string;
}

const LogIn: FunctionComponent = () => {
  const { setUser } = useContext(AuthContext);
  const [logInSuccess, setLogInSuccess] = useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });

  const sectionClass =
    "flex flex-col flex-1 p-2 my-auto border-t-4 border-blue-900 mx-auto max-w-2xl shadow-lg";
  const headerClass =
    "flex pl-8 pr-12 py-2 items-center text-gray-900 justify-center";
  const h1Class = "text-5xl font-medium font-hand text-gray-800";

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const { email, password } = data;
    const formData = { email, password };
    const logInResponse = await postRequest(
      "/signin",
      JSON.stringify(formData)
    );
    console.log(logInResponse);
    if (logInResponse.code === 200 && setUser) {
      setUser(logInResponse.user);
      console.log(JSON.stringify(logInResponse));
      console.log(JSON.stringify(logInResponse.user));
      setTimeout(() => {
        setLogInSuccess(true);
      }, 2000);
    }
  };

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  return (
    <section className={sectionClass}>
      {logInSuccess ? <Redirect to="/" /> : null}
      <header className={headerClass}>
        <h1 className={h1Class}>Connexion</h1>
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
