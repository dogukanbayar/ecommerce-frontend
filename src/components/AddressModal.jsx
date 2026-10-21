import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const CITIES = [
  "Adana", "Ankara", "Antalya", "Bursa", "Diyarbakır",
  "Erzurum", "Eskişehir", "Gaziantep", "İstanbul", "İzmir",
  "Kayseri", "Kocaeli", "Konya", "Malatya", "Mersin",
  "Samsun", "Trabzon", "Şanlıurfa"
];

export default function AddressModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "İstanbul",
    district: "",
    neighborhood: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        title: initialData.title || "",
        name: initialData.name || "",
        surname: initialData.surname || "",
        phone: initialData.phone || "",
        city: initialData.city || "İstanbul",
        district: initialData.district || "",
        neighborhood: initialData.neighborhood || "",
      });
    } else {
      setFormData({
        title: "",
        name: "",
        surname: "",
        phone: "",
        city: "İstanbul",
        district: "",
        neighborhood: "",
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Telefon alanına sadece rakam yazılabilmesini sağla
    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length <= 11) {
        setFormData((prev) => ({ ...prev, phone: onlyNumbers }));
        if (errors.phone) {
          setErrors((prev) => ({ ...prev, phone: null }));
        }
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Adres başlığı zorunludur.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Ad zorunludur.";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Soyad zorunludur.";
    }

    // Telefon doğrulaması: Sadece rakam ve geçerli hane kontrolü
    const phoneClean = formData.phone.trim();
    const phoneRegex = /^(05|5)\d{9}$/; // 05xxxxxxxxx (11 hane) veya 5xxxxxxxxx (10 hane)
    if (!phoneClean) {
      newErrors.phone = "Telefon numarası zorunludur.";
    } else if (!/^\d+$/.test(phoneClean)) {
      newErrors.phone = "Telefon alanına sadece rakam girilmelidir.";
    } else if (!phoneRegex.test(phoneClean)) {
      newErrors.phone = "Geçerli bir telefon numarası giriniz (Örn: 053XXXXXXXX veya 5XXXXXXXXX).";
    }

    if (!formData.district.trim()) {
      newErrors.district = "İlçe zorunludur.";
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = "Mahalle ve adres detayı zorunludur.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Lütfen formdaki hatalı alanları kontrol ediniz!");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sans">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-lg text-[#252B42]">
            {initialData ? "Adresi Güncelle" : "Yeni Adres Ekle"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 text-sm">
          {/* Adres Başlığı */}
          <div>
            <label className="block font-bold text-xs text-[#252B42] mb-1">
              Adres Başlığı *
            </label>
            <input
              type="text"
              name="title"
              placeholder="Örn: Ev, İş, Yazlık"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.title ? "border-red-500 focus:border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#23A6F0]"
              }`}
            />
            {errors.title && (
              <span className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
              </span>
            )}
          </div>

          {/* Ad & Soyad */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-xs text-[#252B42] mb-1">
                Ad *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Adınız"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  errors.name ? "border-red-500 focus:border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#23A6F0]"
                }`}
              />
              {errors.name && (
                <span className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                </span>
              )}
            </div>
            <div>
              <label className="block font-bold text-xs text-[#252B42] mb-1">
                Soyad *
              </label>
              <input
                type="text"
                name="surname"
                placeholder="Soyadınız"
                value={formData.surname}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  errors.surname ? "border-red-500 focus:border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#23A6F0]"
                }`}
              />
              {errors.surname && (
                <span className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.surname}
                </span>
              )}
            </div>
          </div>

          {/* Telefon */}
          <div>
            <label className="block font-bold text-xs text-[#252B42] mb-1">
              Telefon *
            </label>
            <input
              type="text"
              name="phone"
              placeholder="05XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.phone ? "border-red-500 focus:border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#23A6F0]"
              }`}
            />
            {errors.phone ? (
              <span className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
              </span>
            ) : (
              <span className="text-[11px] text-gray-400 block mt-1">
                Yalnızca rakam giriniz (Örn: 05321234567)
              </span>
            )}
          </div>

          {/* Şehir & İlçe */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-xs text-[#252B42] mb-1">
                Şehir (İl) *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#23A6F0] bg-white cursor-pointer"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-xs text-[#252B42] mb-1">
                İlçe *
              </label>
              <input
                type="text"
                name="district"
                placeholder="İlçe"
                value={formData.district}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  errors.district ? "border-red-500 focus:border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#23A6F0]"
                }`}
              />
              {errors.district && (
                <span className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.district}
                </span>
              )}
            </div>
          </div>

          {/* Mahalle / Açık Adres */}
          <div>
            <label className="block font-bold text-xs text-[#252B42] mb-1">
              Mahalle / Açık Adres *
            </label>
            <textarea
              name="neighborhood"
              rows={3}
              placeholder="Mahalle, sokak, bina ve daire numarası..."
              value={formData.neighborhood}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.neighborhood ? "border-red-500 focus:border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#23A6F0]"
              }`}
            />
            {errors.neighborhood && (
              <span className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.neighborhood}
              </span>
            )}
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
