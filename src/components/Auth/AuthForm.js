import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [msg,setMsg]=useState('');
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isError,setIsError]=useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setMsg('');
    setIsError(false);
  };
const submitHandler=(event)=>{
  event.preventDefault();
  const enteredEmail=emailInputRef.current.value;
  const enteredPassword=passwordInputRef.current.value;
if(isLogin){
  console.log("Logging in:", enteredEmail);
  }else{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMmgg2jojdiep3FIe6nkIf_3aS6B-xQgo',
    {
      method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email:enteredEmail,
    password: enteredPassword,
    returnSecureToken: true
  })
  })
  .then(async(res)=>{
    const data=await res.json();
  if(!res.ok){
    throw new Error(data.error?.message || 'Signup failed');
  }
  setMsg('Signup successful!');
   setIsError(false);
      console.log(data);
    })
   .catch((err) => {
    console.error('Error:', err);
    setMsg("signUp Failed",err.Msg);
    setIsError(true);
  });
}
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
      {msg && <p>{msg}</p>}
    </section>
  );
};

export default AuthForm;
