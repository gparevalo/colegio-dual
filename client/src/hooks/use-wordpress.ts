import { useQuery } from "@tanstack/react-query";

interface WpData {
  apiUrl: string;
  nonce: string;
  pageSlug: string;
  sitePath: string;
  isApp: boolean;
}

declare global {
  interface Window {
    wpData?: WpData;
  }
}

export interface WpPageContent {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media_url?: string;
  images: string[];
}

export function useWordPress(slug?: string) {
  const wpData = window.wpData;
  const currentSlug = slug || wpData?.pageSlug || "home";

  return useQuery<WpPageContent>({
    queryKey: ["wp-page", currentSlug],
    queryFn: async () => {
      if (!wpData) {
        // Fallback for development (empty or mock data)
        return {
          id: 0,
          title: { rendered: "Development Mode" },
          content: { rendered: "<p>Content not available in dev mode.</p>" },
          excerpt: { rendered: "" },
          featured_media_url: undefined,
          images: []
        };
      }

      const response = await fetch(
        `${wpData.apiUrl}wp/v2/pages?slug=${currentSlug}&_embed&t=${Date.now()}`
      );
      const pages = await response.json();

      console.log(`[WP] Fetching content for slug: ${currentSlug}`, pages);

      if (!pages || !Array.isArray(pages) || pages.length === 0) {
        console.warn(`[WP] No page found with slug: ${currentSlug}`);
        throw new Error(`Page not found: ${currentSlug}`);
      }

      const page = pages[0];

      // Extract Featured Image (try to get the raw source_url first from embedded data)
      const featuredMedia = page._embedded?.["wp:featuredmedia"]?.[0];
      const featuredImageUrl =
        featuredMedia?.media_details?.sizes?.full?.source_url ||
        featuredMedia?.source_url ||
        page.featured_media_url; // Some plugins or setups might inject this directly

      // Extract all image URLs from the content (more robust regex)
      const content = page.content.rendered;
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
      const images: string[] = [];
      let match;
      while ((match = imgRegex.exec(content)) !== null) {
        if (match[1] && !images.includes(match[1])) {
          images.push(match[1]);
        }
      }

      const result = {
        ...page,
        featured_media_url: featuredImageUrl,
        images: images
      };

      console.log(`[WP] ✅ Data loaded for "${currentSlug}":`, {
        id: result.id,
        title: result.title.rendered,
        featuredImage: featuredImageUrl || "NONE",
        galleryImages: images.length
      });

      return result;
    },
    enabled: !!wpData, // Only run if in WordPress
    retry: 1,
  });
}
