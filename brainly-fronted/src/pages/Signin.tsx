import React, { useRef } from 'react'
import Input from '../components/Input'
import Button from '../components/Button22'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
function Signin() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
    async function Signin() {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
   const res = await  axios.post(`${BACKEND_URL}/api/v1/signin`, { username, password });

        const jwt = res.data.token;
        localStorage.setItem("token",jwt);
        navigate("/dashboard");
    }
  return (
    <div className='h-screen w-screen bg-gray-200 flex justify-center items-center '>
        <div className='bg-white roubnd border min-w-48'>

        <Input ref1={usernameRef} placeholder="Username" />
        <Input ref1= {passwordRef}placeholder="Password" />

        </div>
        <div className='flex justify-center'>
        <Button onclick={Signin} variant="primary" text="Signin"/> 

        </div>
    </div>
  )
}

export default Signin;