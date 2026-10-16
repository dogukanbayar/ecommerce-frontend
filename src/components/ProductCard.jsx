import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.product.categories);

  const slugify = (text) => {
    const trMap = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u" };
    return (text || "")
      .replace(/[çğıöşüÇĞİÖŞÜ]/g, (m) => trMap[m])
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleCardClick = () => {
    const matchedCategory = categories.find((c) => c.id === product.category_id);
    const gender = matchedCategory ? (matchedCategory.gender === "k" ? "kadin" : "erkek") : "kadin";
    const categoryName = matchedCategory ? slugify(matchedCategory.title) : "genel";
    const categoryId = product.category_id || 1;
    const productNameSlug = slugify(product.name || "urun");
    const productId = product.id;

    navigate(`/shop/${gender}/${categoryName}/${categoryId}/${productNameSlug}/${productId}`);
  };

  const imageUrl =
    product.images?.[0]?.url ||
    product.image ||
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80";

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col items-center bg-white border border-gray-100 rounded-xs overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
    >
      <div className="w-full aspect-[3/4] overflow-hidden bg-gray-50 relative">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex flex-col items-center text-center gap-2.5 w-full">
        <h5 className="font-bold text-base text-[#252B42] line-clamp-1 group-hover:text-[#23A6F0] transition-colors">
          {product.name}
        </h5>
        <span className="text-sm font-bold text-[#737373] line-clamp-1">
          {product.description || "English Department"}
        </span>
        <div className="flex items-center gap-2 pt-1 font-bold text-sm">
          <span className="text-[#BDBDBD] line-through">
            ${(product.price * 1.5).toFixed(2)}
          </span>
          <span className="text-[#23856D]">${Number(product.price).toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1.5 pt-2">
          <span className="w-4 h-4 rounded-full bg-[#23A6F0]" />
          <span className="w-4 h-4 rounded-full bg-[#23856D]" />
          <span className="w-4 h-4 rounded-full bg-[#E77C40]" />
          <span className="w-4 h-4 rounded-full bg-[#252B42]" />
        </div>
      </div>
    </div>
  );
}
