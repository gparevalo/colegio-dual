import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { SEO } from "@/components/layout/SEO";
import { Calendar, User, ArrowLeft, Eye, Heart, MessageCircle, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, ExternalLink } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface WPPost {
  id: number;
  title: { rendered: string };
  date: string;
  slug: string;
  content: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'author'?: Array<{ name: string }>;
  };
  views_count?: number;
  likes_count?: number;
  comments_count?: number;
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
    tracking_facebook?: string;
    tracking_x?: string;
    tracking_linkedin?: string;
  };
}

export function PostDetail() {
  const [, params] = useRoute("/noticias/:slug");
  const [post, setPost] = useState<WPPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<WPPost[]>([]);
  const { toast } = useToast();
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

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
          const mainPost = data[0];
          setPost(mainPost);
          setLikesCount(mainPost.likes_count || 0);

          // Check if user already liked
          const likedPosts = JSON.parse(localStorage.getItem("colegio_dual_likes") || "[]");
          setHasLiked(likedPosts.includes(mainPost.id));

          // Fetch related posts
          const relatedRes = await fetch(
            `${wpData.apiUrl}wp/v2/posts?per_page=3&exclude=${mainPost.id}&_embed&acf_format=standard`
          );
          const relatedData = await relatedRes.json();
          if (Array.isArray(relatedData)) {
            setRelatedPosts(relatedData);
          }
        }
      } catch (error) {
        console.error("Error fetching post detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params?.slug]);

  const handleLike = async () => {
    if (hasLiked || !post) return;

    try {
      const res = await fetch(`${window.wpData?.apiUrl}colegio-dual/v1/post/${post.id}/like`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.new_count !== undefined) {
        setHasLiked(true);
        setLikesCount(data.new_count);
        const likedPosts = JSON.parse(localStorage.getItem("colegio_dual_likes") || "[]");
        likedPosts.push(post.id);
        localStorage.setItem("colegio_dual_likes", JSON.stringify(likedPosts));
        toast({
          title: "¡Gracias!",
          description: "Te ha gustado esta noticia.",
        });
      }
    } catch (e) {
      console.error("Error liking post:", e);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Enlace copiado",
      description: "El enlace de la noticia ha sido copiado al portapapeles.",
    });
  };

  const shareOnSocial = (platform: 'fb' | 'x' | 'li') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title.rendered || "");
    let shareUrl = "";

    switch (platform) {
      case 'fb': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
      case 'x': shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`; break;
      case 'li': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

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
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {post.views_count || 0} vistas
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {post.comments_count || 0} comentarios
              </div>
              <div className="flex items-center gap-2">
                <Heart className={cn("h-4 w-4", hasLiked && "fill-primary text-primary")} />
                {likesCount} likes
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

          {/* Engagement Footer */}
          <div className="mt-20 pt-10 border-t border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">¿Te gustó esta noticia?</h3>
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={handleLike}
                    variant={hasLiked ? "default" : "outline"}
                    className={cn("gap-2 rounded-full shadow-sm", hasLiked && "bg-primary text-white border-primary")}
                    disabled={hasLiked}
                  >
                    <Heart className={cn("h-5 w-5", hasLiked && "fill-white")} />
                    {hasLiked ? "Te gusta" : "Me gusta"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2 rounded-full shadow-sm"
                    onClick={copyToClipboard}
                  >
                    <LinkIcon className="h-5 w-5" />
                    Copiar enlace
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4 text-right">Seguir o Compartir</h3>
                <div className="flex items-center justify-end gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100"
                    onClick={() => shareOnSocial('fb')}
                    title="Compartir en Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100"
                    onClick={() => shareOnSocial('x')}
                    title="Compartir en X"
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100"
                    onClick={() => shareOnSocial('li')}
                    title="Compartir en LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Tracking Links */}
                {(post.acf?.tracking_facebook || post.acf?.tracking_x || post.acf?.tracking_linkedin) && (
                  <div className="mt-4 flex flex-wrap justify-end gap-4">
                    {post.acf.tracking_facebook && (
                      <a href={post.acf.tracking_facebook} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-bold hover:underline flex items-center gap-1 bg-primary/5 px-3 py-1 rounded-full">
                        <ExternalLink className="h-3 w-3" /> Ver en Facebook
                      </a>
                    )}
                    {post.acf.tracking_x && (
                      <a href={post.acf.tracking_x} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-bold hover:underline flex items-center gap-1 bg-primary/5 px-3 py-1 rounded-full">
                        <ExternalLink className="h-3 w-3" /> Ver en X
                      </a>
                    )}
                    {post.acf.tracking_linkedin && (
                      <a href={post.acf.tracking_linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-bold hover:underline flex items-center gap-1 bg-primary/5 px-3 py-1 rounded-full">
                        <ExternalLink className="h-3 w-3" /> Ver en LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 bg-slate-50 py-20">
            <div className="container-custom">
              <div className="flex items-center justify-between mb-12">
                <h2 className="font-heading text-3xl font-bold text-slate-900 border-l-4 border-primary pl-6">Sugerencias de más noticias</h2>
                <Link href="/noticias">
                  <Button variant="ghost" className="text-primary font-bold hover:text-primary hover:bg-primary/5 rounded-full">Ver todas →</Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((rp) => {
                  const rpImage = rp._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                  return (
                    <Link key={rp.id} href={`/noticias/${rp.slug}`}>
                      <div className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-slate-100">
                        {rpImage && (
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={rpImage} 
                              alt={rp.title.rendered} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                        )}
                        <div className="p-8 flex flex-col flex-grow">
                          <h3 
                            className="font-heading font-bold text-xl mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-snug"
                            dangerouslySetInnerHTML={{ __html: rp.title.rendered }}
                          />
                          <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-50">
                            {new Date(rp.date).toLocaleDateString()}
                          </p>
                          <div className="mt-auto flex items-center justify-between text-slate-400 text-xs font-medium">
                            <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> {rp.views_count || 0}</span>
                            <span className="flex items-center gap-1.5"><Heart className="h-3.5 w-3.5" /> {rp.likes_count || 0}</span>
                            <span className="flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> {rp.comments_count || 0}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
