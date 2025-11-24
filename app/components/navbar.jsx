"use client"
import Image from "next/image";
import { FaShoppingBag, FaStoreAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center h-16">
      
      <div className="ml-12">
        <Image
                  width={128}
                  height={128}
                  src={"/images/logo_white.png"}
                  alt={`logo Stock.io`}/>
      </div>

      <div className="flex items-center space-x-6">
          <button><FaShoppingBag className="w-6 h-6 cursor-pointer hover:text-gray-300" /></button>
          
          <button><FaStoreAlt className="w-6 h-6 cursor-pointer hover:text-gray-300" /></button>

        <button className="text-xs font-semibold  hover:text-gray-300">
          LOGIN
        </button>
        
        <button className="bg-purple-600 text-white text-xs font-semibold py-1 px-4 rounded-full hover:bg-purple-800">
          CADASTRE-SE
        </button>
      </div>
    </nav>
  );
}
