import Footer from '../components/landingpage/Footer';
import Navbar from '../components/landingpage/Navbar';
import Contribute from '@/components/landingpage/Contribute';


const ContributePage: React.FC = () => {
  return (
    <div className="bg-black flex flex-col min-h-screen">
      <Navbar />
      <Contribute />
      <Footer />
    </div>
  );
};

export default ContributePage;