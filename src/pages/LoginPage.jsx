import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { loginUserThunk } from '../store/actions/clientActions';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(
        loginUserThunk(
          { email: data.email, password: data.password },
          data.rememberMe
        )
      );
      toast.success('Login successful!');
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      const errMsg =
        err.response?.data?.message || 'Login failed. Please check credentials.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const fillTestUser = (email) => {
    setValue('email', email);
    setValue('password', '123456');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#252B42]">Login</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="user@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#23A6F0]"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#23A6F0]"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="rounded border-gray-300 text-[#23A6F0] focus:ring-[#23A6F0]"
              />
              <span className="text-gray-600">Remember Me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white font-semibold rounded text-sm transition flex items-center justify-center disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 text-center uppercase tracking-wider mb-2">
            Quick Test Accounts (Pass: 123456)
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillTestUser('customer@commerce.com')}
              className="py-1 px-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition"
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => fillTestUser('store@commerce.com')}
              className="py-1 px-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition"
            >
              Store
            </button>
            <button
              type="button"
              onClick={() => fillTestUser('admin@commerce.com')}
              className="py-1 px-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition"
            >
              Admin
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#23A6F0] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
