import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Author {
  name: string;
  website: string;
  websiteName: string;
  image: string;
}

interface BlogPostShellProps {
  className?: string;
  title: string;
  description: string;
  pubDate: Date;
  image?: string;
  author?: Author;
  children: ReactNode;
}

const defaultAuthor: Author = {
  name: "DongSeok Lee",
  website: "",
  websiteName: "",
  image:
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
};

export function BlogPostShell({
  className,
  title,
  description,
  pubDate,
  image,
  author = defaultAuthor,
  children,
}: BlogPostShellProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <h1 className="max-w-3xl text-4xl font-semibold text-pretty md:text-6xl">
            {title}
          </h1>
          <h3 className="max-w-3xl text-lg text-muted-foreground md:text-xl">
            {description}
          </h3>
          <div className="flex flex-col items-center gap-1 text-sm md:flex-row md:gap-2 md:text-base">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src={author.image} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{author.name}</span>
            </div>
            <span className="text-muted-foreground">
              Published on {format(pubDate, "MMMM d, yyyy")}
            </span>
          </div>
          {image ? (
            <img
              src={image}
              alt="cover"
              className="mt-4 mb-8 aspect-video w-full rounded-lg border object-cover"
            />
          ) : null}
        </div>
      </div>

      <div className="container">
        <article className="mx-auto prose max-w-3xl dark:prose-invert">
          {children}
        </article>
      </div>
    </section>
  );
}
