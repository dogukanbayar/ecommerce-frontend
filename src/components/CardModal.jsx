import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function CardModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    card_no: "",
    expire_month: "1",
    expire_year: "2026",
    name_on_card: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        card_no: initialData.card_no || "",
        expire_month: String(initialData.expire_month || "1"),
        expire_year: String(initialData.expire_year || "2026"),
        name_on_card: initialData.name_on_card || "",
      });
    } else {
      setFormData({
        card_no: "",
        expire_month: "1",
        expire_year: "2026",
        name_on_card: "",
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "card_no") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 16);
      setFormData((prev) => ({ ...prev, card_no: numbersOnly }));
      if (errors.card_no) setErrors((prev) => ({ ...prev, card_no: null }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name_on_card.trim()) {
      newErrors.name_on_card = "Kart üzerindeki isim zorunludur.";
    }

    if (!formData.card_no.trim()) {
      newErrors.card_no = "Kart numarası zorunludur.";
    } else if (formData.card_no.length !== 16) {
      newErrors.card_no = "Kart numarası 16 haneli olmalıdır.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Lütfen kart bilgilerini eksiksiz doldurun!");
      return;
    }

    onSave({
      ...formData,
      expire_month: Number(formData.expire_month),
      expire_year: Number(formData.expire_year),
    });
  };

  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => String(currentYear + i));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sans">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-lg text-[#252B42]">
            {initialData ? "Kartı Düzenle" : "Yeni Kart Ekle"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 text-sm">
          <div>
            <label className="block font-bold text-xs text-[#252B42] mb-1">
              Kart Üzerindeki İsim *
            </label>
            <input
              type="text"
              name="name_on_card"
              placeholder="Ad Soyad"
              value={formData.name_on_card}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.name_on_card
                  ? "border-red-500 bg-red-50/20"
                  : "border-gray-200 focus:border-[#F27A1A]"
              }`}
            />
            {errors.name_on_card && (
              <span className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.name_on_card}
              </span>
            )}
          </div>

          <div>
            <label className="block font-bold text-xs text-[#252B42] mb-1">
              Kart Numarası *
            </label>
            <input
              type="text"
              name="card_no"
              placeholder="1234 5678 9012 3456"
              value={formData.card_no}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.card_no
                  ? "border-red-500 bg-red-50/20"
                  : "border-gray-200 focus:border-[#F27A1A]"
              }`}
            />
            {errors.card_no && (
              <span className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.card_no}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-xs text-[#252B42] mb-1">
                Son Kullanma Ay *
              </label>
              <select
                name="expire_month"
                value={formData.expire_month}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#F27A1A] bg-white cursor-pointer"
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m.padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-xs text-[#252B42] mb-1">
                Son Kullanma Yıl *
              </label>
              <select
                name="expire_year"
                value={formData.expire_year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#F27A1A] bg-white cursor-pointer"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 text-[#737373] font-bold text-xs rounded-md hover:bg-gray-50 transition cursor-pointer"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#F27A1A] hover:bg-[#e06d13] text-white font-bold text-xs rounded-md shadow-md transition cursor-pointer"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
