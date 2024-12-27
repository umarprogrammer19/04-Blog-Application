import Hero from "@/Components/Home/Hero";
import Section2 from "@/Components/Home/Section2";
import Section3 from "@/Components/Home/Section3";
import Section4 from "@/Components/Home/Section4";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}
