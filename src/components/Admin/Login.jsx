import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginWithEmail } from '../../firebase/auth';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setValue('email', savedEmail);
      setRememberEmail(true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      await loginWithEmail(data.email, data.password);

      if (rememberEmail) {
        localStorage.setItem('rememberedEmail', data.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      navigate('/admin/dashboard');
    } catch (err) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <img
            src="/images/logo2.png"
            alt="택스인 로고"
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white">세무법인 택스인</h2>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="이메일"
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: '올바른 이메일 형식이 아닙니다'
                  }
                })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호"
                  {...register('password', {
                    required: '비밀번호를 입력해주세요'
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-300">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Email Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-email"
                checked={rememberEmail}
                onChange={(e) => setRememberEmail(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              <label htmlFor="remember-email" className="ml-2 text-sm text-white/80 select-none cursor-pointer">
                아이디 저장
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </motion.button>
          </form>
        </div>

        {/* Home Link */}
        <motion.a
          href="/"
          className="block text-center mt-6 text-white/60 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          홈으로 돌아가기
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Login;