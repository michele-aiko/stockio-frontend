"use client"
import { SlArrowLeft } from "react-icons/sl";
import Navbar from '../components/navbar';
import Image from 'next/image';
import {Estrelas} from '../components/estrelas_estaticas'
import HeaderAvaliacao from '../components/header_avaliacao'
import Comentario from '../components/comentario'


export default function avaliacoesComentarios(){
    return(
        <div className="h-full h-full">
            <Navbar></Navbar>

            <div className="bg-black h-2/5 p-8">
                <div className="flex flex-row items-center  mb-4">

                    <button className="ml-8 mr-8 hover:scale-125" type="button">
                        <SlArrowLeft size={24}></SlArrowLeft>
                    </button>

                    <HeaderAvaliacao 
                        nome="Nome do usuário"
                        imagem="/images/teste.png"
                        horas={2}
                    ></HeaderAvaliacao>

                    <div className="ml-auto mr-16">
                        <Estrelas nota={4}></Estrelas>
                    </div>

                </div>

                <p className="text-xl font-thin ml-24">Texto de avaliação. Aqui vai aparecer as informações que saem do back</p>
            
            </div>
            <div className="bg-yellow-50 h-1/2">
                <Comentario
                nome="Dona da loja"
                imagem="/images/teste.png"
                horas={1}
                comentario="Aqui vem o comentário topissimo da dona da loja"
                dono={true}></Comentario>

                <Comentario
                nome="Ana Braga"
                imagem="/images/teste.png"
                horas={1}
                comentario="Outro comentario top"
                dono={false}></Comentario>


            </div>
        </div>




    )
}

