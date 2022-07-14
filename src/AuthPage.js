import { useState } from 'react';
import { signInUser, signUpUser } from './services/fetch-utils';
import { useDataContext } from './DataProvider';

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
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input
            value={signUpPassword}
            type="password"
            onChange={(e) => setSignUpPassword(e.target.value)}
          />
        </label>
        <button>Sign Up</button>
      </form>
      <form onSubmit={handleSignIn}>
        <label>
          Email
          <input value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input
            value={signInPassword}
            type="password"
            onChange={(e) => setSignInPassword(e.target.value)}
          />
        </label>
        <button>Sign In</button>
      </form>
    </div>
  );
}
