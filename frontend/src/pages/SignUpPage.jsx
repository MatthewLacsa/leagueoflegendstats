"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {useAuthStore} from "../store/useAuthStore"
import toast from 'react-hot-toast'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    gameTag: "",
    password: "",
    confirmPassword: "",
  })

  const {signup, isSigningUp} = useAuthStore();
  const validateForm = () => {
    if(!formData.username.trim()) {
      return toast.error("Username is required!");
    }
    if(!formData.password) {
      return toast.error("Password is required!");
    }
    if(formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    if(formData.password !== formData.confirmPassword) {
      return toast.error("Password does not match.");
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm()
    if(success) {
      const { username, gameTag, password } = formData;
      const signupData = { username, gameTag, password };
      signup(signupData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img src="blitzy.jpg" alt="blitzy" className="w-17 h-13 bg-red-600 rounded-full"></img>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Zaunite Strats</h1>
          <p className="text-red-200">Join the Rift, Summoner!</p>
        </div>

        {/* Signup Form */}
        <div className="bg-gray-800 border-2 border-red-500 rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={20}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Your Riot Username"
              />
              <p className="text-xs text-gray-400 mt-1">3-20 characters</p>
            </div>

            {/* Game Tag Field */}
            <div>
              <label htmlFor="gameTag" className="block text-sm font-medium text-gray-300 mb-2">
                Game Tag
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">#</span>
                <input
                  type="text"
                  id="gameTag"
                  name="gameTag"
                  value={formData.gameTag}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{3,5}"
                  className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="1234"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Your Riot ID tag (3-5 digits)</p>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Create a password"
              />
              <p className="text-xs text-gray-400 mt-1">At least 6 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Confirm your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                isSigningUp
                  ? "bg-gray-600 cursor-not-allowed opacity-50"
                  : "bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/25"
              }`}
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-red-400 hover:text-red-300 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Zaunite Strats isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
