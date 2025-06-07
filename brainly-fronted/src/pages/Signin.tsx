import { useRef } from 'react';
import Input from '../components/Input';
import Button from '../components/Button22';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  async function handleSignin() {
    try {
      const username = usernameRef.current?.value?.trim();
      const password = passwordRef.current?.value?.trim();

      if (!username || !password) {
        alert('Please fill in both fields');
        return;
      }

      const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        const jwt = res.data.token;
        localStorage.setItem('token', jwt);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Signin error:', error);
      alert('An error occurred during sign-in. Please try again.');
    }
  }

  return (
    <div className="h-screen w-screen bg-[#0d0d0d] flex justify-center items-center">
      <div className="bg-[#141414] border border-white/10 rounded-2xl shadow-xl p-8 w-full max-w-md backdrop-blur-md transition-all duration-300 hover:scale-[1.12]">
        <h1 className="text-3xl font-bold text-white text-center mb-7">Sign In</h1>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-300 font-medium mb-1">Username</label>
            <Input
              ref1={usernameRef}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">Password</label>
            <Input
              ref1={passwordRef}
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            onclick={handleSignin}
            variant="primary"
            text="Sign In"
          />
        </div>

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?
          <Link to="/signup" className="text-blue-400 font-semibold ml-1 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
