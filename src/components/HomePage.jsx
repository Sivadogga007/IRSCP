import Announcements from "./Announcements";
import FAQ from "./Faq";
import HeroSection from "./Hero";
import NewsSection from "./News";
import Testimonials from "./Testimonials";

export default function HomePage() {
    return (
      <>
      <HeroSection/>
      <Announcements/>
      <NewsSection/>
      <Testimonials/>
      <FAQ/>

      </>
    )
  }