import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ChevronDown,
  ChevronUp,
  Calendar,
  CreditCard,
  MapPin,
  Clock,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { api } from "../api/api";

export default function PreviousOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get("/order");
        const list = Array.isArray(res.data) ? res.data : [];
        // En yeni sipariş en üstte olacak şekilde sırala
        list.sort((a, b) => new Date(b.order_date || b.created_at || 0) - new Date(a.order_date || a.created_at || 0));
        setOrders(list);
      } catch (err) {
        console.error("Orders fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Tarih Belirtilmedi";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#252B42]">
              Geçmiş Siparişlerim
            </h1>
            <p className="text-xs sm:text-sm text-[#737373] mt-1">
              Daha önce verdiğiniz tüm siparişleri ve ürün detaylarını buradan inceleyebilirsiniz.
            </p>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-1.5 text-sm font-bold text-[#23A6F0] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Alışverişe Devam Et
          </Link>
        </div>

        {/* Yükleniyor Durumu */}
        {loading ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-[#23A6F0] animate-spin" />
            <span className="text-sm font-bold text-[#737373]">Siparişleriniz yükleniyor...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-100 p-16 text-center shadow-xs flex flex-col items-center">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-[#252B42] mb-2">Henüz bir siparişiniz bulunmuyor.</h2>
            <p className="text-gray-400 text-sm mb-6">En sevdiğiniz kategorilerden alışverişe hemen başlayın.</p>
            <Link
              to="/shop"
              className="px-8 py-3 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white font-bold text-sm rounded-md transition shadow-md"
            >
              Ürünleri Keşfet
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const productList = order.products || [];
              const totalItemsCount = productList.reduce((acc, p) => acc + (p.count || 1), 0);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:border-gray-300 transition"
                >
                  {/* Sipariş Başlık / Tablo Satırı */}
                  <div
                    onClick={() => toggleExpand(order.id)}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer bg-white hover:bg-gray-50/50 transition"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 flex-1">
                      {/* Sipariş No */}
                      <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                          Sipariş No
                        </span>
                        <span className="text-sm font-extrabold text-[#252B42]">
                          #{order.id}
                        </span>
                      </div>

                      {/* Tarih */}
                      <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                          Tarih
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#737373] flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400 hidden sm:inline" />
                          {formatDate(order.order_date || order.created_at)}
                        </span>
                      </div>

                      {/* Adet */}
                      <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                          Ürün Adedi
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#737373]">
                          {totalItemsCount} Ürün
                        </span>
                      </div>

                      {/* Toplam Tutar */}
                      <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                          Toplam Tutar
                        </span>
                        <span className="text-sm sm:text-base font-black text-[#23856D]">
                          ${Number(order.price || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Aç / Kapa Butonu */}
                    <div className="flex items-center gap-2 text-xs font-bold text-[#23A6F0] self-end sm:self-center">
                      <span>{isExpanded ? "Detayları Gizle" : "Detayları Gör"}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {/* Collapsible Panel (Açılır Detay Bölümü) */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50/60 p-5 sm:p-6 flex flex-col gap-6 animate-in fade-in duration-200">
                      {/* Bilgi Kartları (Ödeme & Adres) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-md border border-gray-200 text-xs flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5 font-bold text-[#252B42] text-sm mb-1">
                            <CreditCard className="w-4 h-4 text-[#F27A1A]" />
                            <span>Ödeme Bilgisi</span>
                          </div>
                          <p className="text-gray-600">
                            <strong className="text-[#252B42]">Kart Sahibi:</strong> {order.card_name || "Belirtilmemiş"}
                          </p>
                          <p className="text-gray-600">
                            <strong className="text-[#252B42]">Kart No:</strong> **** **** **** {String(order.card_no || "").slice(-4)}
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-md border border-gray-200 text-xs flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5 font-bold text-[#252B42] text-sm mb-1">
                            <MapPin className="w-4 h-4 text-[#23A6F0]" />
                            <span>Teslimat Bilgisi</span>
                          </div>
                          <p className="text-gray-600">
                            <strong className="text-[#252B42]">Adres ID:</strong> #{order.address_id}
                          </p>
                          <p className="text-gray-600">
                            <strong className="text-[#252B42]">Durum:</strong> <span className="text-[#23856D] font-bold">Hazırlanıyor</span>
                          </p>
                        </div>
                      </div>

                      {/* Siparişteki Ürünler Tablosu */}
                      <div>
                        <h4 className="font-extrabold text-sm text-[#252B42] mb-3 flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-500" />
                          <span>Siparişteki Ürünler</span>
                        </h4>

                        <div className="bg-white rounded-md border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                          {productList.map((prod, idx) => (
                            <div
                              key={idx}
                              className="p-3 sm:p-4 flex items-center justify-between gap-4 text-xs"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                {prod.images?.[0]?.url || prod.product?.images?.[0]?.url ? (
                                  <img
                                    src={prod.images?.[0]?.url || prod.product?.images?.[0]?.url}
                                    alt={prod.name || prod.product?.name || "Product"}
                                    className="w-12 h-12 object-cover rounded border border-gray-100 flex-shrink-0"
                                  />
                                ) : (
                                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 text-gray-400">
                                    <Package className="w-6 h-6" />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="font-bold text-[#252B42] truncate">
                                    {prod.product?.name || prod.name || prod.detail || `Ürün #${prod.product_id}`}
                                  </p>
                                  <span className="text-gray-400 text-[11px]">
                                    Ürün Kodu: #{prod.product_id}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-6">
                                <span className="font-bold text-[#737373]">
                                  {prod.count || 1} Adet
                                </span>
                                <span className="font-black text-sm text-[#252B42] min-w-[70px] text-right">
                                  ${Number(prod.price || prod.product?.price || (order.price / (productList.length || 1))).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
