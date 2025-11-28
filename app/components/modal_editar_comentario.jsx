"use client";
import Image from "next/image";
import { useState } from "react";

export default function ModalEditarComentario({ Aberto, Fechado, Avaliar }) {

    const [comentario, setComentario] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const dados = {comentario: comentario};
        Avaliar(dados);
        Fechado();
    }


    if(!Aberto) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4" onClick={Fechado}>

            <div className="bg-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center sm:max-h-screen max-h-[80vh] w-full max-w-md sm:max-w-[1000px] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={Fechado} className="absolute right-5 text-gray-400 cursor-pointer hover:text-gray-600">
                    <Image src="/images/X-2.svg" alt="X" width={30} height={30}/>
                </button>

                <textarea className="placeholder-gray-500 mt-15 text-[20px] rounded-2xl h-60 sm:h-[500px] w-[250px] sm:w-[850px] bg-white pt-4 px-6 resize-none" placeholder="Comentário"></textarea>
                <button type="button" className="bg-violet-600 text-yellow-50 mt-10 text-md h-[35px] w-[250px] cursor-pointer hover:opacity-90 transition flex justify-center items-center flex-none sm:w-[500px] rounded-full font-normal" onClick={handleSubmit}>AVALIAR</button>
            </div>
        </div>
    );
}