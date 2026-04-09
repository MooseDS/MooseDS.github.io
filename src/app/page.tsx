import { Intro } from '@/components/Intro';
import { ProjectSection } from '@/components/ProjectSection';
import { BlogSection } from '@/components/BlogSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Intro />
      <ProjectSection />
      <BlogSection />
      <Footer />
    </main>
  );
}
