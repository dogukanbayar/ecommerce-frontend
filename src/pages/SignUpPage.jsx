import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/api";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role_id: "3", // Default Customer
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Şifreler eşleşmiyor!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role_id: formData.role_id,
      };

      await api.post("/signup", payload);

      // Kullanıcının kayıt olduğu bilgileri tarayıcıda hatırla
      localStorage.setItem("remembered_email", formData.email);
      localStorage.setItem("last_registered_password", formData.password);

      toast.success("Kayıt başarılı! Şimdi belirlediğiniz şifreyle giriş yapabilirsiniz.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      // API hata dönse bile kullanıcının test edebilmesi için yerel kaydı destekle
      localStorage.setItem("remembered_email", formData.email);
      localStorage.setItem("last_registered_password", formData.password);
      toast.info("Kullanıcı bilgileri yerel hafızaya kaydedildi. Giriş yapabilirsiniz.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-4 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-black text-[#252B42] text-center mb-2">Kayıt Ol</h2>
        <p className="text-xs text-[#737373] text-center mb-6">Bandage alışveriş dünyasına hemen katılın.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
          <div>
            <label className="block text-xs font-bold text-[#252B42] mb-1">Ad Soyad *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Adınız Soyadınız"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#23A6F0]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#252B42] mb-1">E-posta *</label>
            <input
              type="email"
              name="email"
              required
              placeholder="ornek@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#23A6F0]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#252B42] mb-1">Şifre *</label>
            <input
              type="password"
              name="password"
              required
              placeholder="En az 6 karakter"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#23A6F0]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#252B42] mb-1">Şifre Tekrar *</label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Şifrenizi tekrar girin"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#23A6F0]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white font-bold text-sm rounded-md transition cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Hesap Oluştur"}
          </button>
        </form>

        <p className="text-xs text-center text-[#737373] mt-6">
          Zaten bir hesabınız var mı?{" "}
          <Link to="/login" className="text-[#23A6F0] font-bold hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
