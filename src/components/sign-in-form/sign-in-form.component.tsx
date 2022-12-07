import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";
import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";
const defaultFormFields = {
  email: "",
  password: "",
};

type error = {
  code: "auth/wrong-password" | "auth/user-not-found";
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert("Incorrect password for email");
          break;
        case AuthErrorCodes.USER_DELETED:
          alert("No user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <SignInContainer className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          value={email}
          type="text"
          name="email"
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          value={password}
          type="text"
          name="password"
          onChange={handleChange}
          required
        />
        <ButtonsContainer>
          <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.inverted}>
            Sign in
          </Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
