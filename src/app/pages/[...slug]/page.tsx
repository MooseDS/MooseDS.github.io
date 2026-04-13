import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostShell } from "@/components/blog-post-shell";
import { getPostBySlugSegments, getSortedPostsData } from "@/lib/fetchPosts";

type MdxMetadata = {
  title?: string;
  description?: string;
  date?: string;
  image?: string;
  author?: {
    name: string;
    website: string;
    websiteName: string;
    image: string;
  };
};

async function loadPostModule(modulePath: string) {
  return import(`@/app/posts/${modulePath}`);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getSortedPostsData().map((post) => ({
    slug: post.slugSegments,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlugSegments(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const post = getPostBySlugSegments(slug);

  if (!post) {
    notFound();
  }

  const postModule = await loadPostModule(post.modulePath);
  const PostContent = postModule.default;
  const metadata: MdxMetadata | undefined = postModule.metadata;

  return (
    <BlogPostShell
      title={metadata?.title ?? post.title}
      description={metadata?.description ?? post.description}
      pubDate={new Date(metadata?.date ?? post.date)}
      image={metadata?.image}
      author={metadata?.author}
    >
      <PostContent />
    </BlogPostShell>
  );
}
