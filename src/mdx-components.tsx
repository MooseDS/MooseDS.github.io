import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="mt-10 text-4xl font-bold tracking-tight" {...props} />,
    h2: (props) => <h2 className="mt-10 text-3xl font-extrabold tracking-tight" {...props} />,
    h3: (props) => <h3 className="mt-8 text-2xl font-semibold" {...props} />,
    p: (props) => <p className="mt-4 text-lg leading-8 text-muted-foreground" {...props} />,
    a: (props) => (
      <a
        className="font-semibold text-foreground underline underline-offset-4 hover:no-underline"
        {...props}
      />
    ),
    ul: (props) => <ul className="my-4 list-disc pl-6" {...props} />,
    ol: (props) => <ol className="my-4 list-decimal pl-6" {...props} />,
    li: (props) => <li className="mt-2" {...props} />,
    blockquote: (props) => (
      <blockquote className="my-6 border-l-4 pl-4 italic text-muted-foreground" {...props} />
    ),
    img: (props) => (
      <img
        className="my-8 aspect-video w-full rounded-md object-cover"
        alt={props.alt ?? "image"}
        {...props}
      />
    ),
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-left" {...props} />
      </div>
    ),
    th: (props) => <th className="border-b px-3 py-2 font-semibold" {...props} />,
    td: (props) => <td className="border-b px-3 py-2" {...props} />,
    ...components,
  };
}