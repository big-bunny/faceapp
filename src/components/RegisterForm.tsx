import { useState } from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (password !== passwordConfirmation) {
        console.log('Password and password confirmation do not match');
        return;
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({username, email,  password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Registration successful!');
        // Redirect or display success message
      } else if (response.status === 409) {
        const data = await response.json();
        console.log('Error during registration:', data.error);
      } else {
        console.log('Error during registration');
      }
    } catch (error) {
      console.log('Error during registration:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
