import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ChevronRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Loudest à la Madison #1 (L'integral)",
      desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: "22 April 2026",
      comments: "10 comments",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
      tag: "Google / Trending / New",
    },
    {
      id: 2,
      title: "Trendy Summer Outfits & Daily Essentials",
      desc: "Discover the best combinations for this season. Minimalist touch meets comfort.",
      date: "18 May 2026",
      comments: "15 comments",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
      tag: "Fashion / Style",
    },
    {
      id: 3,
      title: "Sustainable Fashion & Modern Tailoring",
      desc: "How conscious wardrobe choices can elevate your lifestyle and reduce carbon footprint.",
      date: "04 June 2026",
      comments: "7 comments",
      img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
      tag: "Eco / Trends",
    },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[#23A6F0] text-sm font-bold tracking-wider uppercase">
            Practice Advice
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252B42] mt-2 mb-3">
            Featured Posts
          </h1>
          <p className="text-[#737373] text-sm leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#E74040] text-white text-[11px] font-bold px-3 py-1 rounded-xs uppercase tracking-wider">
                  NEW
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 gap-3">
                <span className="text-xs text-[#737373] font-semibold">{post.tag}</span>
                <h3 className="font-bold text-lg text-[#252B42] leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed line-clamp-3">
                  {post.desc}
                </p>

                <div className="flex items-center justify-between text-xs text-[#737373] pt-4 border-t border-gray-100 mt-auto">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#23A6F0]" /> {post.date}
                  </span>
                  <span>{post.comments}</span>
                </div>

                <Link
                  to="#"
                  className="text-xs font-bold text-[#23A6F0] hover:text-[#1a8cd8] flex items-center gap-1 pt-2"
                >
                  Learn More <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
