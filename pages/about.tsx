import Footer from '../components/landingpage/Footer';
import Navbar from '../components/landingpage/Navbar';
import About from '../components/landingpage/About';

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const AboutPage: React.FC = () => {
  return (
    <div className="bg-black flex flex-col min-h-screen">
      <Navbar />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;
