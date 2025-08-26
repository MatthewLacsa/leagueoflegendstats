import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const {login, isLoggingIn} = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img src="blitzy.jpg" alt="blitzy" className="w-15 h-15 bg-red-600 rounded-full"></img>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Zaunite Strats</h1>
          <p className="text-red-200">Welcome back, Summoner!</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800 border-2 border-red-500 rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Sign In</h2>



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
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Enter your username"
              />
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
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                isLoggingIn
                  ? "bg-gray-600 cursor-not-allowed opacity-50"
                  : "bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/25"
              }`}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-red-400 hover:text-red-300 font-medium transition-colors">
                Sign up here
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

export default Login