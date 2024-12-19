import React, { useRef } from 'react';
import Input from '../components/Input';
import Button from '../components/Button22';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      let username = usernameRef.current?.value;
      let password = passwordRef.current?.value;

       // Trim any leading/trailing whitespace
    username = username?.trim();
    password = password?.trim();

      if (!username || !password) {
        alert('Please fill in both fields');
        return;
      }

      const res = await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (res.status === 200 || res.status === 201) {
        alert('You have signed up successfully');
        navigate('/signin');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded border min-w-48 p-4">
        <Input ref1={usernameRef} placeholder="Username" />
        <Input ref1={passwordRef} placeholder="Password" />
        <div className="flex justify-center mt-4">
          <Button onclick={handleSignup} variant="primary" text="Signup" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
