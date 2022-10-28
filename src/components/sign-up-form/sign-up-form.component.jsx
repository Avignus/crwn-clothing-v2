import "./sign-up-form.styles.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password === confirmPassword) {
      alert("passwords do not match!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error.message);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          value={displayName}
          type="text"
          name="displayName"
          onChange={handleChange}
          required
          label="Display name"
        />
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
        <FormInput
          label="Confirm Password"
          value={confirmPassword}
          type="text"
          name="confirmPassword"
          onChange={handleChange}
          required
        />
        <Button type="submit" buttonType="inverted">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
