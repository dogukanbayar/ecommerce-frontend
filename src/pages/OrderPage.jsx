import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  CreditCard as CreditCardIcon,
  Info,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../api/api";
import { clearCart } from "../store/actions/shoppingCartActions";
import AddressModal from "../components/AddressModal";
import CardModal from "../components/CardModal";

export default function OrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart);

  const [activeStep, setActiveStep] = useState(1);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0); // Ödenen son tutarı sabitlemek için

  // --- ADRES BİLGİLERİ ---
  const [addresses, setAddresses] = useState([]);
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState(null);
  const [selectedInvoiceAddressId, setSelectedInvoiceAddressId] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // --- KART BİLGİLERİ ---
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const [cvv, setCvv] = useState("");
  const [use3DSecure, setUse3DSecure] = useState(true);

  // --- API ÇAĞRILARI ---
  const fetchAddresses = async () => {
    try {
      const res = await api.get("/user/address");
      const list = Array.isArray(res.data) ? res.data : [];
      setAddresses(list);
      if (list.length > 0 && !selectedShippingAddressId) {
        setSelectedShippingAddressId(list[0].id);
        setSelectedInvoiceAddressId(list[0].id);
      }
    } catch (err) {
      console.error("Adres çekme hatası:", err);
    }
  };

  const fetchCards = async () => {
    try {
      const res = await api.get("/user/card");
      const list = Array.isArray(res.data) ? res.data : [];
      setCards(list);
      if (list.length > 0 && !selectedCardId) {
        setSelectedCardId(list[0].id);
      }
    } catch (err) {
      console.error("Kart çekme hatası:", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
    fetchCards();
  }, []);

  // --- ADRES HANDLER ---
  const handleSaveAddress = async (formData) => {
    try {
      if (formData.id) {
        await api.put("/user/address", formData);
        toast.success("Adres güncellendi.");
      } else {
        await api.post("/user/address", formData);
        toast.success("Yeni adres eklendi.");
      }
      setIsAddressModalOpen(false);
      setEditingAddress(null);
      fetchAddresses();
    } catch (err) {
      toast.error("Adres kaydedilirken hata oluştu.");
    }
  };

  const handleDeleteAddress = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Bu adresi silmek istediğinize emin misiniz?")) return;
    try {
      await api.delete(`/user/address/${id}`);
      toast.info("Adres silindi.");
      fetchAddresses();
    } catch (err) {
      toast.error("Adres silinemedi.");
    }
  };

  // --- KART HANDLER ---
  const handleSaveCard = async (cardData) => {
    try {
      if (cardData.id) {
        await api.put("/user/card", cardData);
        toast.success("Kart bilgisi güncellendi.");
      } else {
        await api.post("/user/card", cardData);
        toast.success("Yeni kart eklendi.");
      }
      setIsCardModalOpen(false);
      setEditingCard(null);
      fetchCards();
    } catch (err) {
      toast.error("Kart kaydedilirken hata oluştu.");
    }
  };

  const handleDeleteCard = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Bu kartı silmek istediğinize emin misiniz?")) return;
    try {
      await api.delete(`/user/card/${id}`);
      toast.info("Kart silindi.");
      fetchCards();
    } catch (err) {
      toast.error("Kart silinemedi.");
    }
  };

  // --- HESAPLAMALAR ---
  const selectedCartItems = cart.filter((item) => item.checked);
  const productsTotal = selectedCartItems.reduce(
    (acc, item) => acc + Number(item.product.price) * item.count,
    0
  );
  const shippingFee = selectedCartItems.length > 0 ? 29.99 : 0;
  const shippingDiscount = productsTotal >= 150 ? shippingFee : 0;
  const grandTotal = Math.max(0, productsTotal + shippingFee - shippingDiscount);

  // --- ADIM GEÇİŞİ ---
  const handleProceedToPayment = () => {
    if (!selectedShippingAddressId) {
      toast.warn("Lütfen bir teslimat adresi seçin veya yeni bir adres ekleyin.");
      return;
    }
    setActiveStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- POST /order SİPARİŞİ TAMAMLAMA ---
  const handleCompleteOrder = async () => {
    if (!selectedShippingAddressId) {
      toast.warn("Lütfen bir teslimat adresi seçin.");
      setActiveStep(1);
      return;
    }

    const selectedCard = cards.find((c) => c.id === selectedCardId);
    if (!selectedCard) {
      toast.warn("Lütfen ödeme için bir kart seçin veya yeni bir kart ekleyin.");
      return;
    }

    if (!cvv || cvv.length < 3) {
      toast.warn("Lütfen geçerli bir 3 haneli CVV giriniz.");
      return;
    }

    if (selectedCartItems.length === 0) {
      toast.warn("Sipariş verilecek ürün bulunamadı.");
      return;
    }

    const currentTotal = grandTotal;

    const orderPayload = {
      address_id: Number(selectedShippingAddressId),
      order_date: new Date().toISOString().slice(0, 19),
      card_no: Number(selectedCard.card_no),
      card_name: selectedCard.name_on_card,
      card_expire_month: Number(selectedCard.expire_month),
      card_expire_year: Number(selectedCard.expire_year),
      card_ccv: Number(cvv),
      price: Number(currentTotal.toFixed(2)),
      products: selectedCartItems.map((item) => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.product.description || item.product.name || "standart",
      })),
    };

    try {
      setSubmittingOrder(true);
      await api.post("/order", orderPayload);
      
      // Tutarı state'e sabitleyip sepeti temizle
      setPaidAmount(currentTotal);
      dispatch(clearCart());
      setOrderSuccess(true);
      toast.success("Tebrikler! Siparişiniz başarıyla oluşturuldu.");
    } catch (err) {
      console.error("Sipariş tamamlama hatası:", err);
      toast.error(
        err.response?.data?.message ||
          "Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setSubmittingOrder(false);
    }
  };

  const formatCardNumber = (no) => {
    if (!no) return "**** **** **** ****";
    const last4 = String(no).slice(-4);
    return `**** **** **** ${last4}`;
  };

  // Başarılı Sipariş Tebrik Ekranı
  if (orderSuccess) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen py-16 font-sans flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-100 shadow-xl p-8 sm:p-12 max-w-lg w-full text-center flex flex-col items-center gap-5">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#252B42]">
            Tebrikler, Siparişiniz Alındı!
          </h1>
          <p className="text-sm text-[#737373] leading-relaxed">
            Siparişiniz başarıyla sisteme kaydedildi ve hazırlık aşamasına alındı. Alışveriş detaylarınız e-posta adresinize gönderilecektir.
          </p>

          <div className="w-full bg-gray-50 border border-gray-100 rounded-lg p-4 text-xs text-[#737373] flex justify-between items-center">
            <span>Ödenen Tutar:</span>
            <span className="text-base font-black text-[#23856D]">${paidAmount.toFixed(2)}</span>
          </div>

          <div className="flex gap-4 w-full pt-2">
            <button
              onClick={() => navigate("/shop")}
              className="flex-1 py-3 px-4 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white font-bold text-sm rounded-md transition shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Alışverişe Devam Et
            </button>
            <button
              onClick={() => navigate("/")}
              className="py-3 px-5 border border-gray-200 text-[#252B42] font-bold text-sm rounded-md hover:bg-gray-50 transition cursor-pointer"
            >
              Ana Sayfa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
          <Link
            to="/cart"
            className="flex items-center gap-1.5 text-sm font-bold text-[#23A6F0] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Sepete Geri Dön
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#23856D] font-bold">
            <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Güvenli Ödeme
          </div>
        </div>

        {/* 2 Adımlı Tab Başlıkları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setActiveStep(1)}
            className={`p-5 rounded-lg border-2 flex items-center justify-between transition cursor-pointer text-left ${
              activeStep === 1
                ? "border-[#F27A1A] bg-white shadow-xs"
                : "border-gray-200 bg-white/70 opacity-70"
            }`}
          >
            <div>
              <span
                className={`text-xs font-bold uppercase tracking-wider block ${
                  activeStep === 1 ? "text-[#F27A1A]" : "text-gray-400"
                }`}
              >
                1. Adım
              </span>
              <h3 className="text-lg font-black text-[#252B42]">Adres Bilgileri</h3>
            </div>
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                activeStep === 1 ? "bg-[#F27A1A] text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              1
            </span>
          </button>

          <button
            onClick={() => {
              if (!selectedShippingAddressId) {
                toast.warn("Lütfen önce teslimat adresini onaylayın.");
                return;
              }
              setActiveStep(2);
            }}
            className={`p-5 rounded-lg border-2 flex items-center justify-between transition cursor-pointer text-left ${
              activeStep === 2
                ? "border-[#F27A1A] bg-white shadow-xs"
                : "border-gray-200 bg-white/70 opacity-70"
            }`}
          >
            <div>
              <span
                className={`text-xs font-bold uppercase tracking-wider block ${
                  activeStep === 2 ? "text-[#F27A1A]" : "text-gray-400"
                }`}
              >
                2. Adım
              </span>
              <h3 className="text-lg font-black text-[#252B42]">Ödeme Seçenekleri</h3>
            </div>
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                activeStep === 2 ? "bg-[#F27A1A] text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              2
            </span>
          </button>
        </div>

        {/* Ana Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* 1. ADIM: ADRES */}
            {activeStep === 1 && (
              <>
                <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-xs flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-black text-[#252B42]">Teslimat Adresi</h2>
                    <label className="flex items-center gap-2 text-xs font-bold text-[#737373] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsShipping}
                        onChange={(e) => setSameAsShipping(e.target.checked)}
                        className="w-4 h-4 text-[#F27A1A] rounded border-gray-300 focus:ring-[#F27A1A] cursor-pointer"
                      />
                      Faturamı Aynı Adrese Gönder
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAddress(null);
                        setIsAddressModalOpen(true);
                      }}
                      className="border-2 border-dashed border-gray-300 hover:border-[#F27A1A] rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-[#F27A1A] transition cursor-pointer min-h-[170px]"
                    >
                      <Plus className="w-8 h-8" />
                      <span className="font-bold text-sm">Yeni Adres Ekle</span>
                    </button>

                    {addresses.map((addr) => {
                      const isSelected = selectedShippingAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedShippingAddressId(addr.id)}
                          className={`relative border-2 rounded-lg p-5 flex flex-col justify-between cursor-pointer transition min-h-[170px] ${
                            isSelected
                              ? "border-[#F27A1A] bg-orange-50/20"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-extrabold text-sm text-[#252B42]">
                                {addr.title}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingAddress(addr);
                                    setIsAddressModalOpen(true);
                                  }}
                                  className="text-gray-400 hover:text-[#23A6F0] p-1 transition cursor-pointer"
                                  title="Düzenle"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleDeleteAddress(addr.id, e)}
                                  className="text-gray-400 hover:text-red-500 p-1 transition cursor-pointer"
                                  title="Sil"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <p className="text-xs font-bold text-[#252B42] mb-1">
                              {addr.name} {addr.surname}
                            </p>
                            <p className="text-xs text-[#737373] line-clamp-2 mb-2">
                              {addr.neighborhood}, {addr.district} / {addr.city}
                            </p>
                          </div>
                          <div className="text-[11px] font-semibold text-gray-400 border-t border-gray-100 pt-2 flex items-center justify-between">
                            <span>{addr.phone}</span>
                            {isSelected && (
                              <span className="text-[#F27A1A] font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Seçildi
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {!sameAsShipping && (
                  <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-xs flex flex-col gap-6">
                    <h2 className="text-lg font-black text-[#252B42] border-b border-gray-100 pb-4">
                      Fatura Adresi
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAddress(null);
                          setIsAddressModalOpen(true);
                        }}
                        className="border-2 border-dashed border-gray-300 hover:border-[#F27A1A] rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-[#F27A1A] transition cursor-pointer min-h-[170px]"
                      >
                        <Plus className="w-8 h-8" />
                        <span className="font-bold text-sm">Fatura Adresi Ekle</span>
                      </button>

                      {addresses.map((addr) => {
                        const isSelected = selectedInvoiceAddressId === addr.id;
                        return (
                          <div
                            key={addr.id}
                            onClick={() => setSelectedInvoiceAddressId(addr.id)}
                            className={`relative border-2 rounded-lg p-5 flex flex-col justify-between cursor-pointer transition min-h-[170px] ${
                              isSelected
                                ? "border-[#F27A1A] bg-orange-50/20"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-extrabold text-sm text-[#252B42]">
                                  {addr.title}
                                </span>
                              </div>
                              <p className="text-xs font-bold text-[#252B42] mb-1">
                                {addr.name} {addr.surname}
                              </p>
                              <p className="text-xs text-[#737373] line-clamp-2">
                                {addr.neighborhood}, {addr.district} / {addr.city}
                              </p>
                            </div>
                            <div className="text-[11px] font-semibold text-gray-400 border-t border-gray-100 pt-2 flex items-center justify-between">
                              <span>{addr.phone}</span>
                              {isSelected && (
                                <span className="text-[#F27A1A] font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Seçildi
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* 2. ADIM: ÖDEME */}
            {activeStep === 2 && (
              <div className="flex flex-col gap-6">
                <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-xs flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-4 border-[#F27A1A] inline-block" />
                      <h2 className="text-lg font-black text-[#252B42]">Kart ile Öde</h2>
                    </div>
                    <span className="text-xs text-[#737373]">
                      Banka veya Kredi Kartı kullanarak ödemenizi güvenle yapabilirsiniz.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-7 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-sm text-[#252B42]">Kart Bilgileri</h4>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCard(null);
                            setIsCardModalOpen(true);
                          }}
                          className="text-xs font-bold text-[#23A6F0] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Başka bir Kart ile Öde / Yeni Ekle
                        </button>
                      </div>

                      <div className="flex flex-col gap-3">
                        {cards.length === 0 ? (
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-xs text-gray-400">
                            Henüz kayıtlı bir kartınız bulunmuyor. Lütfen yeni bir kart ekleyin.
                          </div>
                        ) : (
                          cards.map((c) => {
                            const isSelected = selectedCardId === c.id;
                            return (
                              <div
                                key={c.id}
                                onClick={() => setSelectedCardId(c.id)}
                                className={`border-2 rounded-lg p-4 flex items-center justify-between cursor-pointer transition ${
                                  isSelected
                                    ? "border-[#F27A1A] bg-orange-50/20"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <CreditCardIcon
                                    className={`w-6 h-6 ${
                                      isSelected ? "text-[#F27A1A]" : "text-gray-400"
                                    }`}
                                  />
                                  <div>
                                    <div className="font-bold text-xs text-[#252B42]">
                                      {c.name_on_card}
                                    </div>
                                    <div className="text-xs font-mono text-[#737373]">
                                      {formatCardNumber(c.card_no)}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-gray-400 font-medium">
                                    {String(c.expire_month).padStart(2, "0")}/{c.expire_year}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingCard(c);
                                      setIsCardModalOpen(true);
                                    }}
                                    className="text-gray-400 hover:text-[#23A6F0] p-1 transition cursor-pointer"
                                    title="Düzenle"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => handleDeleteCard(c.id, e)}
                                    className="text-gray-400 hover:text-red-500 p-1 transition cursor-pointer"
                                    title="Sil"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col gap-3 mt-2">
                        <div className="flex items-center gap-4">
                          <label className="text-xs font-bold text-[#252B42] flex items-center gap-1">
                            CVV <Info className="w-3.5 h-3.5 text-gray-400" />
                          </label>
                          <input
                            type="password"
                            maxLength={3}
                            placeholder="•••"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                            className="w-20 px-3 py-1.5 border border-gray-300 rounded-md text-xs font-mono tracking-widest text-center focus:outline-none focus:border-[#F27A1A] bg-white"
                          />
                          <span className="text-[11px] text-gray-400">
                            Kartın arkasındaki son 3 hane
                          </span>
                        </div>

                        <label className="flex items-center gap-2 text-xs font-bold text-[#252B42] cursor-pointer pt-2 border-t border-gray-200">
                          <input
                            type="checkbox"
                            checked={use3DSecure}
                            onChange={(e) => setUse3DSecure(e.target.checked)}
                            className="w-4 h-4 text-[#F27A1A] rounded border-gray-300 focus:ring-[#F27A1A] cursor-pointer"
                          />
                          <span>3D Secure ile ödemek istiyorum</span>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                      <h4 className="font-extrabold text-sm text-[#252B42]">Taksit Seçenekleri</h4>
                      <p className="text-xs text-gray-400">Kartınıza uygun taksit seçeneğini seçiniz</p>

                      <table className="w-full text-xs text-left border border-gray-100 rounded-md overflow-hidden">
                        <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                          <tr>
                            <th className="p-2.5">Taksit Sayısı</th>
                            <th className="p-2.5 text-right">Aylık Ödeme</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr className="bg-orange-50/30">
                            <td className="p-2.5 flex items-center gap-2 font-bold text-[#252B42]">
                              <input
                                type="radio"
                                name="installment"
                                defaultChecked
                                className="text-[#F27A1A] focus:ring-[#F27A1A]"
                              />
                              Tek Çekim
                            </td>
                            <td className="p-2.5 text-right font-black text-[#F27A1A]">
                              ${grandTotal.toFixed(2)}
                            </td>
                          </tr>
                          <tr className="text-gray-400">
                            <td className="p-2.5 flex items-center gap-2">
                              <input type="radio" name="installment" disabled />
                              3 Taksit
                            </td>
                            <td className="p-2.5 text-right">
                              ${(grandTotal / 3).toFixed(2)}
                            </td>
                          </tr>
                          <tr className="text-gray-400">
                            <td className="p-2.5 flex items-center gap-2">
                              <input type="radio" name="installment" disabled />
                              6 Taksit
                            </td>
                            <td className="p-2.5 text-right">
                              ${(grandTotal / 6).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SAĞ ALAN: Sipariş Özeti */}
          <div className="lg:col-span-4 sticky top-24 flex flex-col gap-4">
            <button
              onClick={activeStep === 1 ? handleProceedToPayment : handleCompleteOrder}
              disabled={submittingOrder}
              className="w-full py-3.5 px-4 bg-[#F27A1A] hover:bg-[#e06d13] text-white font-bold text-sm rounded-md shadow-md transition cursor-pointer flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {submittingOrder ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sipariş Alınıyor...
                </>
              ) : activeStep === 1 ? (
                "Kaydet ve Devam Et >"
              ) : (
                "Ödeme Yap >"
              )}
            </button>

            <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-xs flex flex-col gap-5">
              <h2 className="text-lg font-black text-[#252B42] border-b border-gray-100 pb-3">
                Sipariş Özeti
              </h2>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-center text-[#737373]">
                  <span>Ürünün Toplamı</span>
                  <span className="font-bold text-[#252B42]">${productsTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-[#737373]">
                  <span>Kargo Toplam</span>
                  <span className="font-bold text-[#252B42]">${shippingFee.toFixed(2)}</span>
                </div>

                {shippingDiscount > 0 && (
                  <div className="flex justify-between items-center text-[#23856D] text-xs font-semibold">
                    <span>150 TL ve Üzeri Kargo Bedava</span>
                    <span>-${shippingDiscount.toFixed(2)}</span>
                  </div>
                )}

                <hr className="border-gray-100 my-1" />

                <div className="flex justify-between items-center pt-1">
                  <span className="font-bold text-base text-[#252B42]">Toplam</span>
                  <span className="font-black text-xl text-[#F27A1A]">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={activeStep === 1 ? handleProceedToPayment : handleCompleteOrder}
                disabled={submittingOrder}
                className="w-full py-3.5 px-4 bg-[#F27A1A] hover:bg-[#e06d13] text-white font-bold text-sm rounded-md shadow-md transition cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submittingOrder ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sipariş Alınıyor...
                  </>
                ) : activeStep === 1 ? (
                  "Kaydet ve Devam Et >"
                ) : (
                  "Ödeme Yap >"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />

      <CardModal
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false);
          setEditingCard(null);
        }}
        onSave={handleSaveCard}
        initialData={editingCard}
      />
    </div>
  );
}
