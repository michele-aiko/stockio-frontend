"use client";

import Image from "next/image";

export default function HeaderAvaliacao({ imagem, nome, horas}) {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <Image
          width={128}
          height={128}
          src={imagem}
          alt={`Foto de perfil de ${nome}`}
          className="object-cover w-full h-full"
        />
      </div>
        <p className="text-yellow-50 text-2xl mr-2 ml-4">{nome}</p>
      <p className="text-yellow-50 font-light text-sm">
        {horas}h
      </p>
    </div>
  );
}