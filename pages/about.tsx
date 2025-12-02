import Footer from '../components/landingpage/Footer';
import Navbar from '../components/landingpage/Navbar';
import About from '../components/landingpage/About';

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const AboutPage: React.FC = () => {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans  bg-gray-800 flex flex-col`}>
      <Navbar />
      <About />
      <div className='bg-black'>
      <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
