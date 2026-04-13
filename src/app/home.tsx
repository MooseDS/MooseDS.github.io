'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { PostData } from '@/lib/fetchPosts';

const ITEMS_PER_PAGE = 10;

export default function Home({ posts }: { posts: PostData[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 마운트 시 layout의 인라인 스크립트가 적용한 실제 DOM 클래스와 상태를 동기화
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  // 상태 변경 시 DOM에 테마 클래스 적용 및 저장
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const filteredPages = useMemo(() => {
     return posts.filter(post => {
        const matchesSearch =
          searchQuery === "" ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
     })  
  }, [posts, searchQuery]);

  const totalPages = Math.ceil(filteredPages.length / ITEMS_PER_PAGE);

  const paginatedPages = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredPages.slice(startIndex, endIndex);
  }, [filteredPages, currentPage]);

  return (
    <div className="size-full h-screen bg-background flex relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 border-r border-border bg-background p-6 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="font-semibold">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Android
          </h2>
          <nav className="space-y-1">
            
          </nav>
        </div>

        <div className="border-t border-border pt-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Web
          </h2>
          <div className="space-y-1">
          
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-12 text-center relative">
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute left-0 top-0 p-2 rounded-lg hover:bg-accent transition-colors lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="absolute right-0 top-0 p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            <h1 className="mb-3 text-4xl sm:text-5xl">Documentation</h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Search and explore documentation pages
            </p>
          </header>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredPages.length} {filteredPages.length === 1 ? "post" : "posts"}
          </div>

          {/* Pages List */}
          <div className="space-y-px border-t border-border">
            {paginatedPages.map((page) => (
              <Link
                key={page.id}
                href={`/pages/${page.id}`}
                className="group block border-b border-border py-4 px-2 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 group-hover:text-primary transition-colors">
                      {page.title}
                    </h3>
                    <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
                      {page.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs">
                        {page.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {page.date}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredPages.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">
                No pages found matching your criteria
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredPages.length > 0 && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isCurrentPage = page === currentPage;
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                  if (!showPage && !showEllipsisBefore && !showEllipsisAfter) {
                    return null;
                  }

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <span key={page} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[2.5rem] h-10 px-3 rounded-md transition-colors ${
                        isCurrentPage
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent text-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
