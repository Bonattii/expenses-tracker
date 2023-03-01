import About from '../components/About';
import Contact from '../components/Contact';
import Header from '../components/Header';

export default function Home() {
  localStorage.clear();
  return (
    <>
      <Header />
      <About />
      <Contact />
    </>
  );
}
