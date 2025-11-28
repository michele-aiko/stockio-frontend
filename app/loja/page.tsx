import Image from 'next/image';
import Navbar from '../components/navbar';
import { Estrelas } from '../components/estrelas_estaticas';
import { LuPencil } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";


export default function loja(){
    return(
        <div className="h-full h-full bg-black">
            <Navbar></Navbar>

            <div className=" h-1/2 items-center justify-center">
                <div className="relative bg-[url('/images/teste.png')] bg-cover bg-center h-[300px]">
                    <div className='absolute top-4 right-8 z-50 flex flex-col gap-2'>
                        <button className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700" type="button">
                            <LuPencil size={18} />
                        </button>

                        <button className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700" type='button'>
                            <FaPlus size={18} />
                        </button>
                        </div>
                    
                    <div className='flex flex-col justify-center items-center h-full'>
                    <p className='text-6xl'>Nome da loja</p>
                    <p>Categoria</p>
                    </div>
                </div>
            </div>

            <div className="h-1/2 p-12">
                <div className='flex flex-col items-center'>
                    <p className='text-4xl pb-4'>Reviews e Comentários</p>
                    <p className='text-4xl pb-4'>4.75</p>
                    <button type = 'button' className='bg-purple-700 rounded-full text-white p-2 px-10'>
                    Adicionar Review
                    </button>

                </div>
                

                <div className='w-full bg-yellow-50 m-8 p-8 rounded-lg'>
                    <div className="flex items-center mb-4 w-full">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                        width={128}
                        height={128}
                        src={"/images/teste.png"}
                        alt={`Foto de perfil`}
                        className="object-cover w-full h-full"
                        />
                    </div>
                    <p className="text-black text-2xl mr-2 ml-4">Nome de alguma cliente</p>

                    <div className="ml-auto">
                        <Estrelas nota={4}></Estrelas>
                    </div>

                </div>
                <p className="text-xl text-black font-thin ml-16">Texto de avaliação. Aqui vai aparecer as informações que saem do back</p>
                </div>
                
                
            </div>
        </div>

    );
}