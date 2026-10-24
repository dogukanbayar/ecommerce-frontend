import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductDetailThunk,
  fetchProductsThunk,
} from "../store/actions/productActions";
import { addToCart } from "../store/actions/shoppingCartActions";
import {
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ArrowLeft,
  Loader2,
  ChevronLeft,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import Clients from "../components/Clients";

export default function ProductDetailPage() {
  const { productId, categoryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeProduct, productList, fetchState } = useSelector(
    (state) => state.product
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#23A6F0");

  const colors = ["#23A6F0", "#2DC071", "#E77C40", "#252B42"];

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetailThunk(productId));
    }
    dispatch(fetchProductsThunk({ limit: 8, sort: "rating:desc" }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (activeProduct) {
      dispatch(addToCart(activeProduct));
      toast.success(`${activeProduct.name} sepete eklendi!`);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.info("Ürün favorilerinize eklendi.");
    } else {
      toast.info("Ürün favorilerinizden kaldırıldı.");
    }
  };

  const handleQuickView = () => {
    toast.info(`Ürün Kodu: #${activeProduct?.id} | Stok Durumu: ${activeProduct?.stock || 0} Adet`);
  };

  if (fetchState === "FETCHING" || !activeProduct) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#FAFAFA]">
        <Loader2 className="w-12 h-12 text-[#23A6F0] animate-spin" />
        <span className="text-sm font-bold text-[#737373]">Ürün bilgileri yükleniyor...</span>
      </div>
    );
  }

  const images = activeProduct.images?.length
    ? activeProduct.images
    : [{ url: activeProduct.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" }];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-[#23A6F0] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Geri Dön
          </button>

          <nav className="flex items-center gap-2 text-sm font-bold">
            <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">Home</Link>
            <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
            <Link to="/shop" className="text-[#BDBDBD] hover:text-[#23A6F0]">Shop</Link>
            {categoryName && (
              <>
                <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
                <span className="text-[#BDBDBD] capitalize">{categoryName}</span>
              </>
            )}
            <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
            <span className="text-[#737373] line-clamp-1 max-w-[200px]">{activeProduct.name}</span>
          </nav>
        </div>

        {/* 1. ÜRÜN VİTRİNİ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 sm:p-10 rounded-sm border border-gray-100 mb-16">
          <div className="flex flex-col gap-4">
            <div className="relative w-full h-[450px] sm:h-[520px] rounded-sm overflow-hidden bg-[#F9F9F9] flex items-center justify-center p-2">
              <img
                src={images[selectedImageIndex]?.url}
                alt={activeProduct.name}
                className="w-full h-full object-contain transition-all duration-300"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-[#252B42] rounded-full shadow-md cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-[#252B42] rounded-full shadow-md cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 bg-[#F9F9F9] p-1 transition cursor-pointer flex-shrink-0 ${
                      selectedImageIndex === idx ? "border-[#23A6F0]" : "border-gray-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#252B42]">{activeProduct.name}</h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center text-[#F3CD03]">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(activeProduct.rating || 4)
                          ? "fill-[#F3CD03]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
              </div>
              <span className="text-xs font-bold text-[#737373]">
                {activeProduct.sell_count || 48} Reviews
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-black text-[#252B42] pt-2">
              ${Number(activeProduct.price).toFixed(2)}
            </div>

            <div className="flex items-center gap-2 text-sm font-bold">
              <span className="text-[#737373]">Availability :</span>
              <span className={activeProduct.stock > 0 ? "text-[#23A6F0]" : "text-red-500"}>
                {activeProduct.stock > 0 ? `In Stock (${activeProduct.stock} Adet)` : "Out of Stock"}
              </span>
            </div>

            <p className="text-sm text-[#858585] leading-relaxed pt-2 border-b border-gray-100 pb-6">
              {activeProduct.description || "Bu ürün %100 orijinal kalite standartlarında üretilmiştir."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-bold text-[#737373]">Renk:</span>
              <div className="flex items-center gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition cursor-pointer ${
                      selectedColor === color ? "ring-2 ring-offset-2 ring-[#23A6F0]" : "hover:scale-110"
                    }`}
                  >
                    {selectedColor === color && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <button
                onClick={handleAddToCart}
                className="px-8 py-3 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white text-sm font-bold rounded-sm transition shadow-md cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`p-3 border rounded-full transition cursor-pointer ${
                  isFavorite
                    ? "border-red-500 text-red-500 bg-red-50"
                    : "border-gray-200 text-[#252B42] hover:bg-gray-50"
                }`}
                title="Favorilere Ekle"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
              </button>
              <button
                onClick={handleAddToCart}
                className="p-3 border border-gray-200 rounded-full text-[#252B42] hover:bg-gray-50 transition cursor-pointer"
                title="Sepete Ekle"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button
                onClick={handleQuickView}
                className="p-3 border border-gray-200 rounded-full text-[#252B42] hover:bg-gray-50 transition cursor-pointer"
                title="Hızlı Bilgi"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. DİNAMİK SEKME ALANI */}
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-gray-100 mb-16">
          <div className="flex items-center justify-center gap-8 border-b border-gray-100 pb-4 text-sm font-bold text-[#737373] mb-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 transition cursor-pointer ${
                activeTab === "description"
                  ? "text-[#252B42] border-b-2 border-[#23A6F0]"
                  : "hover:text-[#252B42]"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("additional")}
              className={`pb-4 transition cursor-pointer ${
                activeTab === "additional"
                  ? "text-[#252B42] border-b-2 border-[#23A6F0]"
                  : "hover:text-[#252B42]"
              }`}
            >
              Additional Information
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 transition cursor-pointer ${
                activeTab === "reviews"
                  ? "text-[#252B42] border-b-2 border-[#23A6F0]"
                  : "hover:text-[#252B42]"
              }`}
            >
              Reviews ({activeProduct.sell_count || 48})
            </button>
          </div>

          {activeTab === "description" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="aspect-4/3 rounded-sm overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                <img
                  src={images[0]?.url}
                  alt="Product view"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-xl text-[#252B42]">Ürün Detayları</h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {activeProduct.description || "Kaliteli kumaş ve birinci sınıf dikiş işçiliğiyle hazırlanmıştır. Günlük kullanım ve özel kombinler için son derece uygundur."}
                </p>
                <p className="text-sm text-[#737373] leading-relaxed">
                  Ürünün formunu uzun süre koruması için 30 derecede benzer renklerle yıkanması önerilir.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-xl text-[#252B42]">Öne Çıkan Özellikler</h3>
                <ul className="flex flex-col gap-2 text-sm text-[#737373]">
                  <li>› %100 Orijinal Bandage Koleksiyonu</li>
                  <li>› Nefes alabilen kumaş yapısı</li>
                  <li>› Rahat ve modern kalıp tasarımı</li>
                  <li>› Kolay ütülenebilir ve dayanıklı dokuma</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "additional" && (
            <div className="max-w-2xl mx-auto divide-y divide-gray-100 text-sm">
              <div className="py-3 flex justify-between">
                <span className="font-bold text-[#737373]">Kategori ID</span>
                <span className="text-[#252B42]">{activeProduct.category_id || "Genel"}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="font-bold text-[#737373]">Mağaza ID</span>
                <span className="text-[#252B42]">#{activeProduct.store_id || 1}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="font-bold text-[#737373]">Mevcut Stok</span>
                <span className="text-[#252B42]">{activeProduct.stock} adet</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="font-bold text-[#737373]">Toplam Satış</span>
                <span className="text-[#252B42]">{activeProduct.sell_count || 0} adet</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="font-bold text-[#737373]">Seçilen Renk Kodu</span>
                <span className="font-mono text-[#252B42]">{selectedColor}</span>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
              <div className="border border-gray-100 p-4 rounded-md bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-[#252B42]">Ahmet K.</span>
                  <div className="flex text-[#F3CD03]">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F3CD03]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#737373]">Kumaş kalitesi beklediğimden çok daha iyi çıktı, kalıbı tam uydu.</p>
              </div>

              <div className="border border-gray-100 p-4 rounded-md bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-[#252B42]">Selin Y.</span>
                  <div className="flex text-[#F3CD03]">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F3CD03]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#737373]">Kargo çok hızlı geldi, paketleme özenliydi. Tavsiye ederim.</p>
              </div>
            </div>
          )}
        </div>

        {/* 3. BESTSELLER PRODUCTS */}
        <div className="mb-16">
          <h2 className="font-bold text-2xl text-[#252B42] uppercase tracking-wide mb-8 border-b border-gray-200 pb-4">
            BESTSELLER PRODUCTS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {productList.slice(0, 8).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>

      {/* Yeniden kullanılabilir Clients Logoları */}
      <Clients />
    </div>
  );
}
