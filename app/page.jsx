import Navbar from "@/Components/Navbar";
import Heading from "@/Components/Heading";
import UploadCard from "@/Components/UploadCard";

export default function Home() {
  return (
    <div className="px-5 sm:px-16" >
      <Navbar/>
      <Heading/>
      <UploadCard/>
    </div>
  );
}
