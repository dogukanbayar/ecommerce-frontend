import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { setUser } from '../store/actions/clientActions';

export default function Header() {
  const user = useSelector((state) => state.client.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl text-[#252B42]">Bandage</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
          <Link to="/" className="hover:text-[#23A6F0]">Home</Link>
          <Link to="/shop" className="hover:text-[#23A6F0]">Shop</Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-gray-200"
              />
              <span className="text-sm font-semibold text-[#252B42]">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500 p-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-semibold text-[#23A6F0]">
              <User className="w-4 h-4" />
              <Link to="/login" className="hover:underline">Login</Link>
              <span>/</span>
              <Link to="/signup" className="hover:underline">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
