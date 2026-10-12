import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock, ChevronRight as ArrowRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { api } from "../api/api";

const sliderSlides = [
  {
    season: "SUMMER 2020",
    title: "NEW COLLECTION",
    subtitle: "We know how large objects will act, but things on a small scale.",
    buttonText: "SHOP NOW",
    // Figma'daki mavi zemin ve alisveris cantali kadin modeli
    bgImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
  },
  {
    season: "WINTER 2020",
    title: "VITA CLASSIC PRODUCT",
    subtitle: "We know how large objects will act, but things on a small scale.",
    buttonText: "SHOP NOW",
    bgImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
  },
];

// Figma Featured Posts kartlarindaki 3 ozel gorsel: Renkli sokak, Pembe araba, Rengarenk semsiyeler
const postsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80", // Renkli evler/sokak
    tag: "NEW",
    category: "Google",
    title: "Loudest à la Madison #1 (L'integral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80", // Pembe/klasik araba
    tag: "NEW",
    category: "Trending",
    title: "Loudest à la Madison #1 (L'integral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80", // Renkli semsiyeler
    tag: "NEW",
    category: "New",
    title: "Loudest à la Madison #1 (L'integral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    api
      .get("/products?limit=8&sort=rating:desc")
      .then((res) => {
        const list = res.data?.products || (Array.isArray(res.data) ? res.data : []);
        setBestsellers(list);
      })
      .catch(() => {
        setBestsellers([
          { id: 1, name: "Graphic Design", department: "English Department", price: 6.48, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" },
          { id: 2, name: "Graphic Design", department: "English Department", price: 6.48, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80" },
          { id: 3, name: "Graphic Design", department: "English Department", price: 6.48, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80" },
          { id: 4, name: "Graphic Design", department: "English Department", price: 6.48, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
          { id: 5, name: "Graphic Design", department: "English Department", price: 6.48, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80" },
          { id: 6, name: "Graphic Design", department: "English Department", price: 6.48, image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80" },
          { id: 7, name: "Graphic Design", department: "English Department", price: 6.48, image: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=600&q=80" },
          { id: 8, name: "Graphic Design", department: "English Department", price: 6.48, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" },
        ]);
      });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderSlides.length - 1 : prev - 1));
  };

  const active = sliderSlides[currentSlide];

  return (
    <div className="flex flex-col w-full font-sans">
      {/* 1. HERO SLIDER (Figma Mavi Banner) */}
      <section className="relative w-full h-[620px] lg:h-[716px] bg-[#029FE4] overflow-hidden flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{ backgroundImage: `url('${active.bgImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#029FE4]/90 via-[#029FE4]/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full flex flex-col items-center md:items-start text-center md:text-left text-white z-10 gap-6">
          <h5 className="font-bold text-base tracking-widest">{active.season}</h5>
          <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-xl">
            {active.title}
          </h1>
          <p className="font-normal text-base sm:text-xl text-slate-100 max-w-md">
            {active.subtitle}
          </p>
          <Link
            to="/shop"
            className="px-10 py-4 bg-[#2DC071] hover:bg-[#28a762] text-white font-bold text-xl rounded-md transition shadow-md cursor-pointer"
          >
            {active.buttonText}
          </Link>
        </div>

        {/* Carousel Sol/Sağ Oklar */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-20 cursor-pointer"
        >
          <ChevronLeft className="w-12 h-12" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-20 cursor-pointer"
        >
          <ChevronRight className="w-12 h-12" />
        </button>

        {/* Carousel Alt Çizgi Göstergeleri */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {sliderSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === idx ? "w-12 bg-white" : "w-4 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. EDITOR'S PICK */}
      <section className="bg-[#FAFAFA] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center mb-12 flex flex-col gap-2">
            <h2 className="font-black text-2xl text-[#252B42] uppercase tracking-wide">
              EDITOR’S PICK
            </h2>
            <p className="font-normal text-sm text-[#737373]">
              Problems trying to resolve the conflict between
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl">
            {/* Men (Figma: Kahve Montlu Erkek) */}
            <div className="relative md:col-span-2 h-[500px] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80"
                alt="Men"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <Link
                to="/shop"
                className="absolute left-6 bottom-6 px-14 py-3 bg-white text-[#252B42] font-bold text-sm tracking-widest uppercase hover:bg-[#23A6F0] hover:text-white transition shadow-sm"
              >
                MEN
              </Link>
            </div>

            {/* Women (Figma: Gri Kazaklı Kadın) */}
            <div className="relative h-[500px] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
                alt="Women"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <Link
                to="/shop"
                className="absolute left-6 bottom-6 px-10 py-3 bg-white text-[#252B42] font-bold text-sm tracking-widest uppercase hover:bg-[#23A6F0] hover:text-white transition shadow-sm"
              >
                WOMEN
              </Link>
            </div>

            {/* Accessories & Kids (Figma: Sağ 2'li blok) */}
            <div className="flex flex-col gap-6 h-[500px]">
              <div className="relative flex-1 overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80"
                  alt="Accessories"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <Link
                  to="/shop"
                  className="absolute left-6 bottom-6 px-6 py-2.5 bg-white text-[#252B42] font-bold text-xs tracking-widest uppercase hover:bg-[#23A6F0] hover:text-white transition shadow-sm"
                >
                  ACCESSORIES
                </Link>
              </div>
              <div className="relative flex-1 overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80"
                  alt="Kids"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <Link
                  to="/shop"
                  className="absolute left-6 bottom-6 px-8 py-2.5 bg-white text-[#252B42] font-bold text-xs tracking-widest uppercase hover:bg-[#23A6F0] hover:text-white transition shadow-sm"
                >
                  KIDS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BESTSELLER PRODUCTS */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center mb-14 flex flex-col gap-2">
            <h4 className="font-bold text-lg text-[#737373]">Featured Products</h4>
            <h2 className="font-black text-2xl text-[#252B42] uppercase tracking-wide">
              BESTSELLER PRODUCTS
            </h2>
            <p className="font-normal text-sm text-[#737373]">
              Problems trying to resolve the conflict between
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {bestsellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. VITA CLASSIC GREEN BANNER (Figma: Yeşil Alan ve Beyaz Kazaklı Erkek) */}
      <section className="bg-[#23856D] text-white py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <h5 className="font-bold text-base tracking-widest text-emerald-100">SUMMER 2020</h5>
            <h2 className="font-black text-4xl sm:text-5xl tracking-tight leading-tight">
              Vita Classic Product
            </h2>
            <p className="font-normal text-sm text-emerald-50 max-w-sm">
              We know how large objects will act, We know how are objects will act, We know
            </p>
            <div className="flex items-center gap-6 pt-2">
              <span className="font-bold text-2xl text-white">$16.48</span>
              <button className="px-8 py-3 bg-[#2DC071] hover:bg-[#26a860] text-white font-bold text-sm rounded-md transition shadow-md cursor-pointer">
                ADD TO CART
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Vita Classic Model"
              className="max-h-[500px] w-auto object-cover rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 5. NEURAL UNIVERSE SECTION (Figma: Kırmızı Atkılı Çift) */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80"
              alt="Neural Universe Couple"
              className="max-h-[500px] w-auto object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 order-1 lg:order-2">
            <h5 className="font-bold text-sm tracking-widest text-[#BDBDBD]">SUMMER 2020</h5>
            <h2 className="font-black text-3xl sm:text-4xl text-[#252B42] leading-tight">
              Part of the Neural Universe
            </h2>
            <p className="font-normal text-base text-[#737373] max-w-sm">
              We know how large objects will act, but things on a small scale.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="px-8 py-3 bg-[#2DC071] hover:bg-[#28a762] text-white font-bold text-sm rounded-md transition cursor-pointer">
                BUY NOW
              </button>
              <button className="px-8 py-3 border border-[#2DC071] text-[#2DC071] hover:bg-emerald-50 font-bold text-sm rounded-md transition cursor-pointer">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED POSTS (Figma: 3 Özel Blog Kartı) */}
      <section className="bg-white py-16 lg:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center mb-14 flex flex-col gap-2">
            <h5 className="font-bold text-xs text-[#23A6F0] tracking-wider uppercase">Practice Advice</h5>
            <h2 className="font-black text-3xl text-[#252B42] tracking-tight">Featured Posts</h2>
            <p className="font-normal text-sm text-[#737373] max-w-md">
              Problems trying to resolve the conflict between the two major realms of Classical physics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {postsData.map((post) => (
              <div
                key={post.id}
                className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#E74040] text-white font-bold text-xs rounded-sm shadow-xs">
                    {post.tag}
                  </span>
                </div>

                <div className="p-6 flex flex-col gap-3 flex-grow">
                  <div className="flex items-center gap-3 text-xs text-[#737373]">
                    <span className="text-[#8EC2F2] font-semibold">{post.category}</span>
                    <span>Trending</span>
                    <span>New</span>
                  </div>
                  <h4 className="font-bold text-lg text-[#252B42] leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-sm text-[#737373] line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#737373] pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4 text-[#23A6F0]" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1 font-medium">
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <Link
                    to="#"
                    className="flex items-center gap-1 text-xs font-bold text-[#737373] hover:text-[#23A6F0] pt-2 transition"
                  >
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
