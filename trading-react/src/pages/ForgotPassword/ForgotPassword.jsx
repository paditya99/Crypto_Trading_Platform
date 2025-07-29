import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle send OTP logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: 'url(https://img.decrypt.co/insecure/rs:fit:1920:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2025/04/cryptocurrency-world-gID_7.jpg@webp) center/cover no-repeat'}}>
      <div className="backdrop-blur-md bg-[#0a1931]/80 rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-2">Trade Crypto</h1>
        <h2 className="text-xl text-white mb-6 text-center">Where do you want to get the code?</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded bg-[#11224d] border border-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-400 text-white font-semibold hover:bg-blue-500 transition"
          >
            Send OTP
          </button>
        </form>
        <button
          className="w-full mt-4 py-2 rounded bg-[#11224d] text-white hover:bg-blue-900 transition text-sm"
          type="button"
        >
          Try Using Mobile Number
        </button>
        <div className="flex items-center gap-2 mt-6 text-white text-sm">
          <span>Back To Login ?</span>
          <Link to="/login" className="underline hover:text-blue-600"><b>LOGIN</b></Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 