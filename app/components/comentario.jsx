"use client";

import Image from "next/image";

export default function Comentario({ imagem, nome, horas, dono, comentario, children }) {
  return (
    <div className="pt-8">
    <div className="border-l-1 border-black pl-5 ml-24">
        <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
            <Image
            width={128}
            height={128}
            src={imagem}
            alt={`Foto de perfil de ${nome}`}
            className="object-cover w-full h-full"
            />
        </div>
        <div className="flex flex-col ml-2 ">
            <p className="text-black text-xl mr-2 my-0">{nome}</p>
            {dono && (
            <p className="text-purple-500 text-xs font-light mt-[-6px]">Dono(a) da loja</p>
            )}
        </div>
        <p className="text-black font-light text-xs">
            {horas}h
        </p>
        </div>
        <p className="font-thin text-black ml-14">{comentario}</p>
        {children}
    </div>
    </div>
  );
}