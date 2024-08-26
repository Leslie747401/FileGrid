import Navbar from "../components/Navbar";
import Heading from '../components/Heading';
import UploadCard from "../components/UploadCard";

export default function Home() {
  return (
    <div className="px-5 sm:px-16" >
      <Navbar/>
      <Heading/>
      <UploadCard/>
    </div>
  );
}
