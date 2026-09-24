import Hero from "../components/hero";
import CategoryGuide from "../components/categoryguide";
import BestSellers from "../components/bestsellers";
import CategoryBento from "../components/categorybento";
import WhyNx from "../components/whynx";
import Reviews from "../components/reviews";
import Newsletter from "../components/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGuide />
      <BestSellers />
      <CategoryBento />
      <WhyNx />
      <Reviews />
      <Newsletter />
    </>
  );
}