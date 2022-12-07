import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import FormInputComponent from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.styles";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();
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

    if (password === confirmPassword) {
      alert("passwords do not match!");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <SignUpContainer className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInputComponent
          value={displayName}
          type="text"
          name="displayName"
          onChange={handleChange}
          required
          label="Display name"
        />
        <FormInputComponent
          label="Email"
          value={email}
          type="text"
          name="email"
          onChange={handleChange}
          required
        />
        <FormInputComponent
          label="Password"
          value={password}
          type="text"
          name="password"
          onChange={handleChange}
          required
        />
        <FormInputComponent
          label="Confirm Password"
          value={confirmPassword}
          type="text"
          name="confirmPassword"
          onChange={handleChange}
          required
        />
        <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.inverted}>
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
