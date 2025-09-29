import React from "react";

export default function WordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-screen-2xl px-4 py-8">{children}</div>;
}
