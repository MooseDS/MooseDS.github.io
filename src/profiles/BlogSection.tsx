'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Post, fetchVelog } from '@/lib/fetchFeeds';

const VELOG_USERNAME = '@ds12892';

export function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVelog(VELOG_USERNAME).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="blog" className="min-h-screen flex items-center border-t border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24 w-full">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-2xl md:text-3xl text-foreground mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Blog Posts
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            개발 경험과 기술에 대한 생각을 공유합니다
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">블로그 글을 불러오는 중...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="border border-border bg-card hover:border-muted-foreground transition-colors overflow-hidden"
              >
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full bg-muted overflow-hidden">
                    <Image
                      src={post.thumbnail ?? '/velog-placeholder.svg'}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 space-y-3 text-center flex-grow flex flex-col">
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {post.date}
                    </p>
                    <h3 className="text-lg md:text-xl text-card-foreground line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <span className="text-sm text-primary hover:text-primary/80 pt-2 transition-colors inline-block">
                      Read more →
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
