import Footer from '../components/landingpage/Footer';
import Navbar from '../components/landingpage/Navbar';
import Contribute from '@/components/landingpage/Contribute';

const geistSans = { className: "font-sans" };
const geistMono = { className: "font-mono" };

const ContributePage: React.FC = () => {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans  bg-gray-800 flex flex-col`}>
      <Navbar />
      <Contribute />
      <div className='bg-black'>
      <Footer />
      </div>
    </div>
  );
};

export default ContributePage;