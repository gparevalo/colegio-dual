import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: string;
}

export function SEO({
  title,
  description,
  ogImage,
  canonicalUrl,
  structuredData,
}: SEOProps) {
  const siteName = "Colegio Dual";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "Colegio binacional con metodología de Formación Dual y Aprendizaje Basado en Proyectos.";
  const defaultOgImage = "https://tecnologia.pdagencia.eu/cms/wp-content/uploads/2026/03/logo.png";

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph / Social Media */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:type" content="website" />

      {/* TEO: Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* AEO: Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {structuredData}
        </script>
      )}
    </Helmet>
  );
}
