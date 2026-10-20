import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCartItemCount,
  removeFromCart,
  toggleCartItemCheck,
} from "../store/actions/shoppingCartActions";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, PlusCircle } from "lucide-react";

export default function ShoppingCartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.shoppingCart.cart);

  const [couponCode, setCouponCode] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);

  // Sadece seçili olan ürünlerin toplamı
  const productsTotal = cart
    .filter((item) => item.checked)
    .reduce((acc, item) => acc + Number(item.product.price) * item.count, 0);

  const selectedItemCount = cart
    .filter((item) => item.checked)
    .reduce((acc, item) => acc + item.count, 0);

  const shippingFee = selectedItemCount > 0 ? 29.99 : 0;
  const shippingDiscount = productsTotal >= 150 ? shippingFee : 0;
  const grandTotal = Math.max(0, productsTotal + shippingFee - shippingDiscount);

  // Sepeti onayla butonuna tıklandığında /order rotasına yönlendir
  const handleProceedToCheckout = () => {
    if (selectedItemCount === 0) {
      alert("Lütfen sipariş vermek için en az bir ürün seçin.");
      return;
    }
    navigate("/order");
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Başlık & Geri Dön Linki */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-[#252B42]">
            Sepetim ({cart.reduce((a, b) => a + b.count, 0)} Ürün)
          </h1>
          <Link
            to="/shop"
            className="flex items-center gap-1.5 text-sm font-bold text-[#23A6F0] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Alışverişe Devam Et
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-100 p-16 text-center shadow-xs flex flex-col items-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-[#252B42] mb-2">Sepetinizde ürün bulunmamaktadır.</h2>
            <p className="text-gray-400 text-sm mb-6">İhtiyacınız olan ürünleri hemen keşfedin.</p>
            <Link
              to="/shop"
              className="px-8 py-3 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white font-bold text-sm rounded-md transition"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* SOL ALAN: Ürün Listesi */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="bg-white rounded-lg border border-gray-100 shadow-xs divide-y divide-gray-100">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-gray-50/50 transition"
                  >
                    {/* Checkbox + Görsel + Açıklama */}
                    <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => dispatch(toggleCartItemCheck(item.product.id))}
                        className="w-5 h-5 text-[#23A6F0] rounded border-gray-300 focus:ring-[#23A6F0] cursor-pointer"
                      />

                      <img
                        src={
                          item.product.images?.[0]?.url ||
                          item.product.image ||
                          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80"
                        }
                        alt={item.product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border border-gray-100 flex-shrink-0"
                      />

                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-sm sm:text-base text-[#252B42] line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-[#737373] line-clamp-1">
                          {item.product.description || "Standart Beden"}
                        </p>
                        <span className="text-xs font-semibold text-[#23856D] mt-1">
                          Kargo Bedava
                        </span>
                      </div>
                    </div>

                    {/* Adet + Fiyat + Silme */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-xs">
                        <button
                          onClick={() =>
                            dispatch(updateCartItemCount(item.product.id, item.count - 1))
                          }
                          className="p-2 text-gray-500 hover:bg-gray-100 transition cursor-pointer"
                          title="Azalt"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3.5 py-1 text-sm font-bold text-[#252B42] min-w-[2.2rem] text-center">
                          {item.count}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(updateCartItemCount(item.product.id, item.count + 1))
                          }
                          className="p-2 text-gray-500 hover:bg-gray-100 transition cursor-pointer"
                          title="Arttır"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <div className="text-base sm:text-lg font-black text-[#252B42]">
                          ${(Number(item.product.price) * item.count).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400">
                          (${Number(item.product.price).toFixed(2)} / adet)
                        </div>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item.product.id))}
                        className="text-gray-400 hover:text-red-500 transition p-2 cursor-pointer"
                        title="Ürünü Sepetten Kaldır"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SAĞ ALAN: Sipariş Özeti Kutusu */}
            <div className="lg:col-span-4 sticky top-24 flex flex-col gap-4">
              {/* 1. Buton (Üst) */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#F27A1A] hover:bg-[#e06d13] text-white font-bold text-sm rounded-md shadow-md transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Sepeti Onayla</span>
                <span>&gt;</span>
              </button>

              <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-xs flex flex-col gap-5">
                <h2 className="text-lg font-black text-[#252B42] border-b border-gray-100 pb-3">
                  Sipariş Özeti
                </h2>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between items-center text-[#737373]">
                    <span>Ürünün Toplamı</span>
                    <span className="font-bold text-[#252B42]">
                      ${productsTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#737373]">
                    <span>Kargo Toplam</span>
                    <span className="font-bold text-[#252B42]">
                      ${shippingFee.toFixed(2)}
                    </span>
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

                {/* İndirim Kodu */}
                <div className="pt-2 border-t border-gray-100">
                  {!showCouponInput ? (
                    <button
                      type="button"
                      onClick={() => setShowCouponInput(true)}
                      className="text-xs font-bold text-[#737373] hover:text-[#252B42] flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 text-[#F27A1A]" />
                      <span>İNDİRİM KODU GİR</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Kupon Kodu"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 py-1.5 px-3 border border-gray-200 rounded-md text-xs focus:outline-none focus:border-[#F27A1A]"
                      />
                      <button
                        type="button"
                        className="py-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-[#252B42] text-xs font-bold rounded-md transition cursor-pointer"
                      >
                        Uygula
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. Buton (Alt) */}
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-4 bg-[#F27A1A] hover:bg-[#e06d13] text-white font-bold text-sm rounded-md shadow-md transition flex items-center justify-center gap-1 cursor-pointer mt-2"
                >
                  <span>Sepeti Onayla</span>
                  <span>&gt;</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
