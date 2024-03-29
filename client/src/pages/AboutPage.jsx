import { Link } from 'react-router-dom';
import refesta from '@assets/about/refesta_about.png';

const AboutPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full '>
      <div>
        <img src={refesta} />
      </div>
      <div className='grid items-center w-48 h-12 text-center text-white rounded-full cursor-pointer bg-ourIndigo hover:bg-ourPink hover:text-white'>
        <Link to='/'>Refesta 홈으로</Link>
      </div>
    </div>
  );
};

export default AboutPage;
