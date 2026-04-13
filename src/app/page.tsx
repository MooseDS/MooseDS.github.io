import { getSortedPostsData } from "@/lib/fetchPosts";
import Home from "./home";

export default function HomePage() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen">
      <Home posts={allPostsData} />
    </main>
  );
}
