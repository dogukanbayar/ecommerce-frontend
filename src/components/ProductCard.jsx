import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const image =
    product?.images && product.images.length > 0
      ? typeof product.images[0] === "string"
        ? product.images[0]
        : product.images[0].url
      : product?.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";

  return (
    <Link
      to={`/product/${product?.id || 1}`}
      className="flex flex-col bg-white overflow-hidden group transition duration-300"
    >
      <div className="relative aspect-3/4 w-full bg-[#F6F6F6] overflow-hidden flex items-center justify-center">
        <img
          src={image}
          alt={product?.name || product?.title || "Product"}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="flex flex-col items-center text-center p-6 gap-2.5">
        <h5 className="font-bold text-base text-[#252B42] line-clamp-1 group-hover:text-[#23A6F0] transition">
          {product?.name || product?.title || "Graphic Design"}
        </h5>
        <span className="font-bold text-sm text-[#737373]">
          {product?.department || "English Department"}
        </span>
        <div className="flex items-center gap-2 font-bold text-base">
          <span className="text-[#BDBDBD] line-through">
            ${Number(product?.price ? product.price * 1.3 : 16.48).toFixed(2)}
          </span>
          <span className="text-[#23856D]">
            ${Number(product?.price || 6.48).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <span className="w-4 h-4 rounded-full bg-[#23A6F0]" />
          <span className="w-4 h-4 rounded-full bg-[#23856D]" />
          <span className="w-4 h-4 rounded-full bg-[#E77C40]" />
          <span className="w-4 h-4 rounded-full bg-[#252B42]" />
        </div>
      </div>
    </Link>
  );
}
