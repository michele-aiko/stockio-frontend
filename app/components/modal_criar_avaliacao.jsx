"use client";
import Image from "next/image";
import { useState } from "react";
import EstrelasAvaliacao from "./estrelas";
import Comentario from "./comentario";


export default function ModalCriarAvaliacao({ Aberto, Fechado, Salvar, nomeDaLoja }) {

    const [avaliacao, setAvaliacao] = useState("");
    const [nota, setNota] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const dados = {
            usuarioId: 1,
            lojaId: 1,
            nota: nota,
            comentario: avaliacao};
        Salvar(dados); //Envia esses novos dados 
        Fechado();
    }


    if(!Aberto) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4" onClick={Fechado}>

            <div className="bg-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center sm:max-h-screen max-h-[80vh] w-full max-w-md sm:max-w-[900px] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="relative mb-7 w-full">
                    <button type="button" onClick={Fechado} className="absolute top-1 right-1 text-gray-400 cursor-pointer hover:text-gray-600">
                        <Image src="/images/X-2.svg" alt="X" width={30} height={30}/>
                    </button>
                    <div className="text-[39px] mt-9 sm:mt-4 text-black">
                        <span className="font-thin">Você está avaliando </span>
                        <span className="font-normal">{nomeDaLoja}</span>
                    </div>
                </div>

                <EstrelasAvaliacao value = {nota} onChange={setNota}/>

                <textarea className="placeholder-gray-500 mt-15 text-[20px] rounded-2xl h-60 sm:h-[500px] w-full sm:w-[750px] bg-white pt-4 px-6 resize-none shrink-0 text-gray-400" 
                placeholder="Avaliação da loja"
                value = {avaliacao}
                onChange = {(e)=> setAvaliacao(e.target.value)}
                />

                <button type="button" className="bg-violet-600 text-white flex justify-center items-center flex-none text-lg mt-15 w-[300px] h-[35px] sm:w-[700px] rounded-full font-light" onClick={handleSubmit}>Avaliar</button>
            </div>
        </div>
        
    );
}