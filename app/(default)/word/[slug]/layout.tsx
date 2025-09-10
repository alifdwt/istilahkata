import WordDetailBreadcrumb from "./breadcrumb";

interface WordDetailLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  metadata: React.ReactNode;
  explanations: React.ReactNode;
  comments: React.ReactNode;
  related: React.ReactNode;
  sidebar: React.ReactNode;
  analytics: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function WordDetailLayout({
  children,
  header,
  metadata,
  explanations,
  comments,
  related,
  sidebar,
  analytics,
  params,
}: WordDetailLayoutProps) {
  const { slug } = await params;
  return (
    <>
      {/* Breadcrumb - Static for now, will be async when database is ready */}
      <WordDetailBreadcrumb slug={slug} />

      {/* Main Container */}
      <div className="mx-auto max-w-screen-2xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content Area (3/4) */}
          <div className="space-y-8 lg:col-span-3">
            {header} {/* Word title, stats, actions */}
            {metadata} {/* Generation context */}
            {explanations} {/* Main explanations */}
            {comments} {/* Discussion */}
            {related} {/* Related words */}
            {children} {/* Additional content slot */}
          </div>

          {/* Sidebar (1/4) */}
          <div className="space-y-6 lg:col-span-1">
            {sidebar} {/* Stats, related, contributors */}
            {analytics} {/* Trends widget */}
          </div>
        </div>
      </div>
    </>
  );
}

// Export metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: wordTitle } = await params;

  const capitalizedTerm =
    wordTitle.charAt(0).toUpperCase() + wordTitle.slice(1);

  return {
    title: `${capitalizedTerm} - Definisi & Penjelasan`,
    description: `Pelajari arti dan penggunaan kata gaul "${wordTitle}" dari berbagai generasi di Indonesia.`,
    openGraph: {
      title: `${capitalizedTerm} - IstilahKata`,
      description: `Definisi lengkap kata "${wordTitle}" dengan konteks generasi`,
      url: `/word/${wordTitle}`,
      type: "article",
    },
  };
}
