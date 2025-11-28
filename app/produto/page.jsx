import Navbar from '../components/navbar';
import Image from 'next/image';
import { SlArrowLeft } from "react-icons/sl";
import { IoIosStar } from "react-icons/io";



export default function produto(){
    return(

    <div>
        <Navbar></Navbar>
        <div className='relative flex flex-row w-full min-h-screen bg-yellow-50'>
            <button className="absolute top-6 left-6  hover:scale-125 text-black" type="button">
                        <SlArrowLeft size={24}></SlArrowLeft>
            </button>
            <div className='flex-1 h-100 w-100 rounded-lg overflow-hidden flex items-center justify-center p-10 ml-8'>
                <Image 
                    width={100}
                    height={100}
                    src={"/images/teste.png"}
                    className="object-cover h-full w-full"
                    alt={"Imagem teste"}></Image>
                
            </div>

            <div className='w-1/2 flex flex-col gap-1 p-12'>
                <p className="text-black text-2xl mr-2 truncate font-semibold">Nome do produto</p>
                <div className="flex items-center gap-3 text-sm text-gray-700">

                <div className="flex gap-1">
                    <IoIosStar className="text-yellow-400" />
                    <span>4.5</span>
                </div>
                <span className="text-purple-600 pl-8 pr-8">Nome da loja</span>
                <span className="text-purple-600">Em estoque</span>

                </div>

                <p className="text-2xl font-bold text-black">
                R$ 4,70
                </p>

                <div className="text-gray-800 text-sm leading-relaxed">
                texto de descrição topíssimo texto de descrição topíssimo texto de descrição topíssimo.
                </div>

            </div>



        </div>
        </div>
    )

}