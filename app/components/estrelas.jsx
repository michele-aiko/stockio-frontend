"use client";
import { useState } from "react";
import { FaStar, FaRegStar } from 'react-icons/fa';


function EstrelasAvaliacao({onChange}) {
    const [avaliacao, setAvaliacao] = useState(0);
    const [hover, setHover] = useState(0);

    //Envia a informação da nota para o pai. Componente estrela estava sempre retornando nota 0
    function selecionar(valor) {
        console.log("⭐ Cliquei na estrela:", valor); // DEBUG
    setAvaliacao(valor);
        if (onChange) onChange(valor);
;}
    return (

        <div className="flex flex-row">
            {[1, 2, 3, 4, 5].map((valorEstrela) => (
            
            <div 
                key={valorEstrela} 
                onClick={() => selecionar(valorEstrela)}
                onMouseEnter={() => setHover(valorEstrela)}
                onMouseLeave={() => setHover(0)}
                className="cursor-pointer">
                
                {valorEstrela <= (hover || avaliacao) ? (<FaStar className="sm:w-[110px] sm:h-[110px] w-[60px] h-[60px] text-violet-600" />) : (<FaRegStar className="sm:w-[110px] sm:h-[110px] w-[60px] h-[60px] stroke-0 text-gray-400" />)}
            </div>
            ))}
        </div>
    );
}

export default EstrelasAvaliacao;