import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function PageContent({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans text-[#252B42]">
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
