import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Section } from "@/components/ui/section";
import { SEO } from "@/components/layout/SEO";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface WPPost {
  title: { rendered: string };
  date: string;
  content: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'author'?: Array<{ name: string }>;
  };
  acf?: {
    seo_title?: string;
    seo_description?: string;
    og_image?: string;
    canonical_url?: string;
    structured_data?: string;
  };
}

export function PostDetail() {
  const [, params] = useRoute("/noticias/:slug");
  const [post, setPost] = useState<WPPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const wpData = window.wpData;
      if (!wpData?.apiUrl || !params?.slug) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${wpData.apiUrl}wp/v2/posts?slug=${params.slug}&_embed&acf_format=standard&t=${Date.now()}`
        );
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setPost(data[0]);
        }
      } catch (error) {
        console.error("Error fetching post detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params?.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow pt-32 container-custom">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 w-24 mb-6 rounded" />
            <div className="h-12 bg-slate-200 w-3/4 mb-6 rounded-lg" />
            <div className="h-64 bg-slate-100 w-full mb-8 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 w-full rounded" />
              <div className="h-4 bg-slate-200 w-full rounded" />
              <div className="h-4 bg-slate-200 w-2/3 rounded" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col pt-20">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Post no encontrado</h2>
            <Link href="/noticias">
              <Button variant="outline">Volver a Noticias</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const authorName = post._embedded?.['author']?.[0]?.name || "Colegio Dual";

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <SEO 
        title={post.acf?.seo_title || post.title.rendered}
        description={post.acf?.seo_description}
        ogImage={post.acf?.og_image || featuredImage}
        canonicalUrl={post.acf?.canonical_url}
        structuredData={post.acf?.structured_data}
      />
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <article className="container-custom max-w-4xl">
          <Link href="/noticias">
            <Button variant="ghost" className="mb-6 -ml-2 text-slate-500 hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Noticias
            </Button>
          </Link>

          <header className="mb-10">
            <h1 
              className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            
            <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {authorName}
              </div>
            </div>
          </header>

          {featuredImage && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-xl aspect-video bg-slate-100">
              <img 
                src={featuredImage} 
                alt={post.title.rendered} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div 
            className="prose prose-slate prose-lg max-w-none 
              prose-headings:font-heading prose-headings:font-bold 
              prose-a:text-primary hover:prose-a:underline
              prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
}
