import { useState, useRef,useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import classes from './AuthForm.module.css';
import AuthContext from '../Store/AuthContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
const authCtx=useContext(AuthContext);
const history=useHistory();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
const submitHandler=(event)=>{
  event.preventDefault();
  const enteredEmail=emailInputRef.current.value;
  const enteredPassword=passwordInputRef.current.value;
  const url = isLogin
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMmgg2jojdiep3FIe6nkIf_3aS6B-xQgo' // Login API
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMmgg2jojdiep3FIe6nkIf_3aS6B-xQgo'; // Signup API
    fetch(url,
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
    throw new Error(data.error?.message || 'Authentication failed');
  }
  if(isLogin){
    authCtx.login(data.idToken);
    alert('✅ Login successful!');
    history.replace("/");
  }else{
  alert('Signup successful! you can login now');
  }
    })
   .catch((err) => {
    console.error('Error:', err);
    alert(`Authentication Failed:${err.message}`);
  });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} autoComplete='email' />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordInputRef} autoComplete='new-password'
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
    </section>
  );
};

export default AuthForm;
