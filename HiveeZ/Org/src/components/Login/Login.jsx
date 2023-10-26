import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import InputControl from "../InputControl/InputControl";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase"; 


const Login = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/simu");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className="text-xl flex justify-center font-semibold">Login</h1>

         <InputControl 
         className="p-2 rounded-lg"
         label="Organization ID" 
         placeholder="Enter your id"
         onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))}
         />

         <InputControl 
         className="p-2 rounded-lg"
         label="Password" 
         placeholder="Enter your password"
         onChange={(event) =>
          setValues((prev) => ({ ...prev, pass: event.target.value }))}
         />

         <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button 
          onClick={handleSubmission}
          disabled={submitButtonDisabled}
          >Login</button>
          <p> Dont have an account?{" "}
            <a href="/signup" className='text-purple-600'> Sign Up</a></p>
         </div>
      </div>
    </div>
    </>
  )
}

export default Login;