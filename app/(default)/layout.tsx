import React from "react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
