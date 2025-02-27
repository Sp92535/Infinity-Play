import Carousel from "@/components/Carousel/Carousel";
import Banner from "@/components/Banner/Banner";

export default function Home() {


  return (
    <>
      <Banner/>
      <Carousel category="new" />
      <Carousel category="trending" />
      <Carousel category="popular" />
    </>
  );
}
