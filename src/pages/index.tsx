// https://www.ui-layout.com/components/

import Index from "@/components/ImageAccordion";
import DragItms from "@/components/DragItms";
import Button from "@/components/Buttons";
import Footer from "@/components/Footer";
import Header from "@/components/HeaderResponsive";
import { RandomizedTextEffect } from "@/components/RandomizedText";
import ProgressiveCarousel from "@/components/ProgressiveCarousel";
import StackingCard from "@/components/StackingCard";
import FAQs from "@/components/FAQs";
import InfiniteBrand from "@/components/InfiniteBrand";

export default function Home() {
  const world = "This is text effect Animation!"
  const images = [
    {
      img: "https://www.shutterstock.com/shutterstock/photos/2262760767/display_1500/stock-photo-three-dimensional-render-of-blue-wavy-pattern-2262760767.jpg",
      desc: 'Description for Image 1',
      title: 'Title 1',
      buttonIcon: "Icon",
    },
  ];
  return (
   <>
       <Header /> 
       <RandomizedTextEffect text={world} /> 
      <Index /> 
      <DragItms />
      <InfiniteBrand />
      <StackingCard />
      <Button />
      <ProgressiveCarousel items={images} />
      <FAQs />
      <Footer />
     
   </>
  );
}
