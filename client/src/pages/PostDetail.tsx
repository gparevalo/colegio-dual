import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Footer } from "@/components/layout/Footer";
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
    news_subtitle?: string;
    news_gallery?: Array<{
      url: string;
      alt?: string;
      caption?: string;
    }>;
    news_video_url?: string;
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

          {post.acf?.news_subtitle && (
            <div className="mb-10 text-2xl font-medium text-slate-600 border-l-4 border-primary pl-6 py-2 italic font-heading">
              {post.acf.news_subtitle}
            </div>
          )}

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
              prose-img:rounded-3xl prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Dynamic Video Section */}
          {post.acf?.news_video_url && (
            <div className="mt-16 mb-16">
              <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary">▶</span>
                </span>
                Video Destacado
              </h2>
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  src={post.acf.news_video_url.replace("watch?v=", "embed/").replace("vimeo.com/", "player.vimeo.com/video/")}
                  title="Video Noticia"
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Dynamic Gallery Section */}
          {post.acf?.news_gallery && post.acf.news_gallery.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary">📸</span>
                </span>
                Galería de Imágenes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {post.acf.news_gallery.map((img, idx) => (
                  <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-slate-100">
                    <img 
                      src={img.url} 
                      alt={img.alt || "Imagen de galería"} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {img.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p className="text-white text-sm font-medium">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
