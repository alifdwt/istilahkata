import React from "react";

export default async function WordDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  return (
    <div>
      <h1>WordDetailPage</h1>
      <p>{slug}</p>
    </div>
  );
}
