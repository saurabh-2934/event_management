import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader size={50} />
    </div>
  );
}

export default Loader;
