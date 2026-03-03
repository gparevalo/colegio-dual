import { useState, useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { NEWS_HIGHLIGHTS } from "@/lib/data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface WPPost {
  id: number;
  title: { rendered: string };
  date: string;
  excerpt: { rendered: string };
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ name: string }>>;
  };
}

export function Noticias() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const wpData = window.wpData;
      const apiUrl = wpData?.apiUrl || "https://colegiodual.com/wp-json/"; // Fallback for local dev if needed

      try {
        const response = await fetch(`${apiUrl}wp/v2/posts?_embed&per_page=100&status=publish`);
        const data = await response.json();
        if (Array.isArray(data)) setPosts(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-slate-50 border-b py-12">
        <div className="container-custom">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Noticias y Eventos</h1>
          <div className="flex max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              className="pl-10 bg-white" 
              placeholder="Buscar noticias..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <Section>
          <div className="grid md:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading placeholders or fallbacks
              NEWS_HIGHLIGHTS.map((news) => (
                <Card key={news.id} className="overflow-hidden border-none animate-pulse">
                  <div className="aspect-video bg-slate-200" />
                  <CardContent className="pt-6">
                    <div className="h-4 bg-slate-200 rounded w-1/4 mb-3" />
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
                    <div className="h-20 bg-slate-200 rounded w-full" />
                  </CardContent>
                </Card>
              ))
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none group cursor-pointer h-full flex flex-col">
                  <div className="aspect-video relative bg-slate-200 overflow-hidden">
                    <img 
                      src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "https://static.wixstatic.com/media/e2a619_536198d18d014e7ea62e6eb275dc398e~mv2.png"} 
                      alt={post.title.rendered} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    {post._embedded?.['wp:term']?.[0]?.[0] && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                        {post._embedded['wp:term'][0][0].name}
                      </div>
                    )}
                  </div>
                  <CardContent className="pt-6 flex-grow flex flex-col">
                    <div className="text-sm text-muted-foreground mb-3">
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <h3 
                      className="font-heading font-bold text-xl leading-tight mb-3 group-hover:text-primary transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div 
                      className="text-slate-600 text-sm line-clamp-3 mb-4"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <div className="mt-auto">
                      <span className="text-primary text-sm font-medium inline-block hover:underline">Leer más →</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-slate-400">
                No se encontraron noticias que coincidan con tu búsqueda.
              </div>
            )}
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
