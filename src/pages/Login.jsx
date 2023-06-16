import React from 'react';
import "./Login.css"
import { useState } from 'react';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
function Login() {
    
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    const [flag, setFlag] = useState(false);
    const [result, setResult] = useState("");
    const [otp, setOtp] = useState("");

    function setUpRecaptha() {
        const recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {},
          auth
        );
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, `+91${number}`, recaptchaVerifier)
    }
    const getOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (number === "" || number === undefined){
            return setError("Please enter a valid phone number!");
        }
        try {
          let response = await setUpRecaptha();
          if (response) {
            console.log(response);
            setResult(response)
            setFlag(true)
            setError("")
          }
          
        } catch (err) {
          setError(err.message);
          console.log(err);
        }
      };


      const verifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        console.log("otp");
        if (otp === "" || otp === null) return;
        try {
          await result.confirm(otp);
          
        console.log("login successful");
        setError("")
        } catch (err) {
          setError(err.message);
          console.log(err.message);
        }
      };

    return (
        <div className = "form-container">
        <h1>Login</h1>
            {!flag ? <form className = "login-form" onSubmit={getOtp}>
                <input
                    type = "text"
                    value={number}
                    onChange = {(e) => {
                      const re = /^[0-9\b]+$/;
                      if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.length <= 10) {
                        
                        console.log(e.target.value);
                        setNumber(e.target.value);
                      }
                    }}
                    placeholder = "Enter mobile number"
                />

                <div id="recaptcha-container"></div>
                {error && <p className = "error"> {error} </p>}
                <button type = "submit" >Submit</button>
            </form>:
            <form className = "login-form" onSubmit={verifyOtp}>
                <input
                    className = "otp-input"
                    type = "text"
                    value={otp}
                    onChange = {(e) => {setOtp(e.target.value)}}
                    placeholder = "Enter otp"
                />
                {error && <p className = "error"> {error} </p>}
                <button type = "submit" >Submit</button>
            </form>}
        </div>
    )
}

export default Login
