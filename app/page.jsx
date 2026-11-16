import Articles from "../components/sections/Articles";
import Header from "../components/sections/Header";
import Hero from "../components/sections/Hero";
import Benefits from "../components/sections/Benefits";
import Brands from "../components/sections/Brands";
import Segments from "../components/sections/Segments";
import LightingDesign from "../components/sections/LightingDesign";
import Calculator from "../components/sections/Calculator";
import Catalogs from "../components/sections/Catalogs";
import Products from "../components/sections/Products";
import Projects from "../components/sections/Projects";
import About from "../components/sections/About";
import University from "../components/sections/University";
import Contact from "../components/sections/Contact";
import Reveal from "../components/Reveal";

export default function Home() {
  return <>
    <a className="skip" href="#inicio">Ir para o conteúdo</a>
    <div className="hero-shell"><Header /><main className="home-page"><Hero /><Benefits /><Brands /><Segments /><Projects /><LightingDesign /><Calculator /><Products /><Catalogs /><Articles /><About /><University /></main></div>
    <Contact />
    <Reveal />
  </>;
}
