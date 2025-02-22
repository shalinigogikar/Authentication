import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

<<<<<<< HEAD
  }else{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={myAPIKey}',
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
  .then((res)=>{
  if(res.ok){
    return res.json();
  }else{
    return res.json().then((data)=>{
      console.log(data);
    });
  }
  })
   .catch((err) => {
    console.error('Error:', err);
  });
}
  };
=======
>>>>>>> parent of d3406de (sign in is added)
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
          />
        </div>
        <div className={classes.actions}>
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
