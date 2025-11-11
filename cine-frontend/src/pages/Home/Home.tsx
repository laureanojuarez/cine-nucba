import {FilmSection} from "../../components/Films/FilmSection";

export default function Home() {
  return (
    <>
      <h1 className="font-extrabold text-3xl md:text-4xl text-white text-center mb-6">
        Películas en cartelera
      </h1>
      <FilmSection />
    </>
  );
}
