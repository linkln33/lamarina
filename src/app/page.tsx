import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Portfolio } from '@/components/sections/portfolio';
import { Blog } from '@/components/sections/blog';
import { Contact } from '@/components/sections/contact';
import { Shop } from '@/components/sections/shop';
import { About } from '@/components/sections/about';
import { News } from '@/components/sections/news';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <section id="services">
        <Services />
        </section>
        <section id="portfolio">
        <Portfolio />
        </section>
        <News />
        <Shop />
        <section id="contact">
        <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}