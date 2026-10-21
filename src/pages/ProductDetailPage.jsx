import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ChevronRight,
  ChevronLeft,
  Loader2
} from "lucide-react";
import axios from "axios";

const defaultProduct = {
  id: 1,
  name: "Floating Phone Stand",
  description:
    "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
  price: 1139.33,
  stock: 10,
  rating: 4.8,
  ratingCount: 10,
  images: [
    { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" },
    { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" }
  ]
};

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(defaultProduct);
  const [loading, setLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    let isMounted = true;

    async function fetchProductData() {
      try {
        // 1. Önce genel ürün listesinden var olan gerçek ürünleri kontrol et
        const listRes = await axios.get("https://workintech-fe-ecommerce.onrender.com/products?limit=5");
        const productList = listRes.data?.products || (Array.isArray(listRes.data) ? listRes.data : []);

        if (productList.length > 0 && isMounted) {
          // Eğer URLdeki id listede varsa onu, yoksa ilk gerçek ürünü al
          const target = productList.find((p) => String(p.id) === String(productId)) || productList[0];
          setProduct({
            ...defaultProduct,
            ...target,
            images: target.images?.length > 0 ? target.images : defaultProduct.images,
          });
          return;
        }
      } catch (e) {
        // API kapalı veya yanıt vermiyorsa sessizce varsayılan ürünü göster
      }

      if (isMounted) {
        setProduct((prev) => ({ ...prev, id: productId || 1 }));
      }
    }

    fetchProductData();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#23A6F0] animate-spin" />
      </div>
    );
  }

  const images =
    product?.images && product.images.length > 0
      ? product.images.map((img) => (typeof img === "string" ? img : img.url))
      : defaultProduct.images.map((img) => img.url);

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-500 mb-6">
          <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link to="/shop" className="text-gray-400 hover:text-[#23A6F0]">Shop</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 truncate max-w-[200px]">{product?.name}</span>
        </nav>

        {/* Ana Ürün Kart Alanı */}
        <div className="bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Sol Kolon: Galeri Slider */}
          <div className="space-y-4">
            <div className="relative aspect-4/3 w-full bg-gray-100 rounded-lg overflow-hidden group">
              <img
                src={images[activeImageIndex] || defaultProduct.images[0].url}
                alt={product?.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Seçiciler */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                      activeImageIndex === idx ? "border-[#23A6F0]" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sağ Kolon: Ürün Detayları */}
          <div className="flex flex-col justify-start">
            <h1 className="text-xl sm:text-2xl font-bold text-[#252B42] mb-3">
              {product?.name}
            </h1>

            {/* Değerlendirme & Yorum Sayısı */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product?.rating || 4) ? "fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-500">
                {product?.ratingCount || 10} Reviews
              </span>
            </div>

            {/* Fiyat */}
            <div className="text-2xl font-bold text-[#252B42] mb-2">
              ${Number(product?.price || 0).toFixed(2)}
            </div>

            {/* Stok Durumu */}
            <div className="text-xs font-bold text-gray-500 mb-6 flex items-center gap-1.5">
              <span>Availability :</span>
              <span className="text-[#23A6F0]">
                {product?.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Kısa Açıklama */}
            <p className="text-sm text-gray-600 leading-relaxed pb-6 border-b border-gray-200 mb-6">
              {product?.description}
            </p>

            {/* Renk Seçenekleri */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-6 rounded-full bg-[#23A6F0] cursor-pointer hover:ring-2 ring-offset-2 ring-[#23A6F0] transition" />
              <div className="w-6 h-6 rounded-full bg-[#2DC071] cursor-pointer hover:ring-2 ring-offset-2 ring-[#2DC071] transition" />
              <div className="w-6 h-6 rounded-full bg-[#E77C40] cursor-pointer hover:ring-2 ring-offset-2 ring-[#E77C40] transition" />
              <div className="w-6 h-6 rounded-full bg-[#252B42] cursor-pointer hover:ring-2 ring-offset-2 ring-[#252B42] transition" />
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="px-5 py-2.5 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white font-bold text-xs sm:text-sm rounded-md shadow-md transition cursor-pointer"
              >
                Select Options
              </button>
              <button
                type="button"
                className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200 transition cursor-pointer"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:text-[#23A6F0] hover:border-sky-200 transition cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 transition cursor-pointer"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Alt Sekmeler */}
        <div className="bg-white rounded-xl p-6 sm:p-10 border border-gray-100 shadow-sm mt-8">
          <div className="flex items-center justify-center gap-6 sm:gap-10 border-b border-gray-200 pb-4 text-xs sm:text-sm font-bold text-gray-500">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`pb-2 -mb-4.5 transition cursor-pointer ${
                activeTab === "description" ? "border-b-2 border-[#23A6F0] text-[#252B42]" : "hover:text-[#252B42]"
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("additional")}
              className={`pb-2 -mb-4.5 transition cursor-pointer ${
                activeTab === "additional" ? "border-b-2 border-[#23A6F0] text-[#252B42]" : "hover:text-[#252B42]"
              }`}
            >
              Additional Information
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-2 -mb-4.5 transition cursor-pointer ${
                activeTab === "reviews" ? "border-b-2 border-[#23A6F0] text-[#252B42]" : "hover:text-[#252B42]"
              }`}
            >
              Reviews ({product?.ratingCount || 0})
            </button>
          </div>

          <div className="pt-8 text-sm text-gray-600 leading-relaxed">
            {activeTab === "description" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-[#252B42] mb-3">the quick fox jumps over</h3>
                  <p className="mb-4">
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                  </p>
                  <p>
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#252B42] mb-3">the quick fox jumps over</h3>
                  <p className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gray-400" /> the quick fox jumps over the lazy dog</p>
                  <p className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gray-400" /> the quick fox jumps over the lazy dog</p>
                  <p className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gray-400" /> the quick fox jumps over the lazy dog</p>
                </div>
              </div>
            )}
            {activeTab === "additional" && (
              <p>Ek teknik ve malzeme bilgileri bu bölümde yer almaktadır.</p>
            )}
            {activeTab === "reviews" && (
              <p>Müşteri değerlendirmeleri ve kullanıcı yorumları burada listelenecektir.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
