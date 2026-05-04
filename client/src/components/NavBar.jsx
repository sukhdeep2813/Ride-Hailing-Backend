import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto backdrop-blur-md sticky top-0 z-50">
      <div className="text-2xl font-black tracking-tighter">
        METRO<span className="text-blue-500">BOLT</span>
      </div>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
        <a href="#tech" className="hover:text-white transition">
          Technology
        </a>
      </div>
      <div className="space-x-4 bg-white/3 border border-white/8 backdrop-blur-sm  transition p-1 rounded-lg ">
        <button
          className="text-sm font-semibold text-gray-300 hover:text-white transition cursor-pointer p-0.5 px-2.5"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </button>
      </div>
    </nav>
  );
};
export default NavBar;
