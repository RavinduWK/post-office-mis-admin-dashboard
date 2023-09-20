import React, { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

function Register() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const signUpHandler = async () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  };

  return (
    <div>
      Email
      <input type="text" ref={emailInputRef} />
      <br />
      Password
      <input type="text" ref={passwordInputRef} />
      <button onClick={signUpHandler}>Submit</button>
    </div>
  );
}

export default Register;
