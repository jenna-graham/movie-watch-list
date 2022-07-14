import { useState } from 'react';
import { signInUser, signUpUser } from './services/fetch-utils';
import { useDataContext } from './DataProvider';
import './App.css';

export default function AuthPage() {
  const { setUser } = useDataContext();
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  function clearForms() {
    setSignUpEmail('');
    setSignUpPassword('');
    setSignInEmail('');
    setSignInPassword('');
  }

  async function handleSignUp(e) {
    e.preventDefault();

    const user = await signUpUser(signUpEmail, signUpPassword);

    setUser(user);
    clearForms();
  }
  async function handleSignIn(e) {
    e.preventDefault();

    const user = await signInUser(signInEmail, signInPassword);
    setUser(user);
    clearForms();
  }

  return (
    <div className="auth-page">
      <form className='form-one' onSubmit={handleSignUp}>
        <label>
          Email
          <input className='auth-input' value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input className='auth-input'
            value={signUpPassword}
            type="password"
            onChange={(e) => setSignUpPassword(e.target.value)}
          />
        </label>
        <button className='auth-button' >Sign Up</button>
      </form>
      <form className='form-two' onSubmit={handleSignIn}>
        <label>
          Email
          <input className='auth-input' value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input className='auth-input'
            value={signInPassword}
            type="password"
            onChange={(e) => setSignInPassword(e.target.value)}
          />
        </label>
        <button className='auth-button'>Sign In</button>
      </form>
    </div>
  );
}
