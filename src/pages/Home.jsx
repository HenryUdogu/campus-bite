import Header from "../components/Header";
import Top from "../components/Top";
import Middle from "../components/Middle";
import Started from "../components/Started";
import Door from "../components/Door";
import Bottom from "../components/Bottom";
import Footer from "../components/Footer";
import Rider from "../components/Rider";
const Home = () => {
  return (
    <>
      <Header />
      <section id="home">
        <Top />
      </section>
      <Middle />
      <section id="services">
        <Started />
        <Rider />
      </section>
      <section id="about">
        <Door />
      </section>
      <Bottom />
      <Footer />
    </>
  );
};

export default Home;