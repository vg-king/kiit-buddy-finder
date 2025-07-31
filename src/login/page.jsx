'use client';
import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-blue-300 p-4">
      {/* Desktop Layout - Large screens */}
      <div className="hidden lg:block relative w-[900px] h-[550px] rounded-[30px] shadow-2xl overflow-hidden">
        {/* Container holding both form and panel */}
        <div className="absolute inset-0 w-full h-full flex">
          {/* Form Container */}
          <motion.div
            className="w-1/2 h-full bg-white z-20 flex justify-center items-center px-10"
            initial={false}
            animate={{ x: isLogin ? 0 : 450 }}
            transition={{ type: "spring", stiffness: 60 }}
          >
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">
                {isLogin ? "Sign In" : "Register"}
              </h2>
              {isLogin ? (
                <LoginForm />
              ) : (
                <RegisterForm onRegistered={() => setIsLogin(true)} />
              )}
            </div>
          </motion.div>

          {/* Panel (Decorative) */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center p-10 text-white z-10
              bg-gradient-to-br from-[#6a11cb] to-[#2575fc] rounded-r-[80px]"
            initial={false}
            animate={{ x: isLogin ? 450 : 0 }}
            transition={{ type: "spring", stiffness: 60 }}
          >
            {isLogin ? (
              <>
                <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
                <p className="mb-8 text-center text-lg font-medium px-4">
                  Register with your personal details to use all of site features
                </p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="px-8 py-2 border-2 border-white rounded-full font-semibold hover:bg-white/10 transition"
                >
                  SIGN UP
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                <p className="mb-8 text-center text-lg font-medium px-4">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="px-8 py-2 border-2 border-white rounded-full font-semibold hover:bg-white/10 transition"
                >
                  SIGN IN
                </button>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout - Small and medium screens */}
      <div className="lg:hidden relative w-full max-w-sm rounded-[20px] shadow-2xl overflow-hidden bg-white">
        {/* Header with toggle buttons */}
        <div className="relative bg-gradient-to-r from-[#6a11cb] to-[#2575fc] p-6">
          <div className="flex rounded-full bg-white/20 p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${
                isLogin 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${
                !isLogin 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-6">
          <motion.div
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isLogin ? "Welcome Back!" : "Create Account"}
              </h2>
              <p className="text-gray-600 text-sm">
                {isLogin 
                  ? "Sign in to access your account" 
                  : "Join us and start your journey"
                }
              </p>
            </div>
            
            {isLogin ? (
              <LoginForm />
            ) : (
              <RegisterForm onRegistered={() => setIsLogin(true)} />
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-semibold hover:underline"
            >
              {isLogin ? "Sign up here" : "Sign in here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}