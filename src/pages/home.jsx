import Hero from "../components/hero";
import CategoryGuide from "../components/categoryguide";
import BestSellers from "../components/bestsellers";
import CategoryBento from "../components/categorybento";
import WhyNx from "../components/whynx";
import Lookbook from "../components/lookbook"; // <-- Naya import
import Newsletter from "../components/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGuide />
      <BestSellers />
      <CategoryBento />
      <WhyNx />
      <Lookbook /> {/* <-- Yahan add karo */}
      <Newsletter />
    </>
  );
}