"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import ModalEditarPerfil from "../../components/modal_editar_perfil";
import BotaoPerfil from "../../components/mostrar_botao_edit_perfil";
import CardProduto from "../../components/card_produto";
import NavbarsPerfil from "../../components/mostrar_icone_user";
import ModalAlterarSenha from "../../components/modal_alterar_senha";
import api from '../../services/api';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function PaginaDePerfil() {
  const params = useParams();
  const router = useRouter();
  const usernameProfile = params.usuario;
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);

  useEffect(() => {
    if (!usernameProfile) return;

    api.get(`/usuarios/u/${usernameProfile}`)
      .then(response => {
        setUsuario(response.data);
        setLoading(false);
      })
      .catch(error => {
        alert("Usuário não encontrado!");
        router.push('/feed');
      });
  }, [usernameProfile, router]);

  if (loading) return <p className="p-10">...</p>;
  if (!usuario) return null;


  return (
    <main className="min-h-screen bg-yellow-50 flex flex-col">

      <div className="w-full h-[300px] lg:h-[449px] bg-black flex flex-col justify-between relative z-0">

        <div className="w-full flex justify-between items-center px-6 lg:px-[115px] pt-8">
          <Image
            width={221}
            height={43}
            src={"/images/logo2.svg"}
            alt={"Logo da Stock.io branca"}
            className="cursor-pointer hover:opacity-90 transition"
          />

          <div className="hidden lg:flex items-center gap-6">
            <Image src="/images/bag.svg" alt="Sacolinha da Navbar" className="cursor-pointer hover:opacity-90 transition" width={30} height={30} />
            <Image src="/images/lojinha.svg" alt="Lojinha da Navbar" className="cursor-pointer hover:opacity-90 transition" width={30} height={30} />
            <NavbarsPerfil />
            <Image src="/images/exit.svg" alt="Sair" className="cursor-pointer hover:opacity-90 transition" width={30} height={30} />
          </div>
        </div>

        <div className="w-full px-6 lg:px-[115px] pb-10 cursor-pointer hover:opacity-90 transition">
          <Image
            className="dark:invert"
            src="/images/seta_perfil.svg"
            alt="seta perfil"
            width={28}
            height={48}
            priority
          />
        </div>
      </div>
      
      <div className="w-full px-6 lg:px-[115px] relative z-10">

        <div className="flex flex-col lg:flex-row justify-between lg:items-start">
          
          <div className="w-[230px] h-[230px] cursor-pointer hover:opacity-90 transition mx-auto lg:ml-[65px] bg-gray-200 rounded-full mt-[-150px] border-yellow-50 shrink-0"></div>

          <div className="mt-8 self-center transition lg:self-auto" onClick={() => setModalEditarAberto(true)}>
            <BotaoPerfil onClick={() => setModalEditarAberto(true)} />
              {modalEditarAberto && (
                <ModalEditarPerfil
                  Aberto={modalEditarAberto}
                  Fechado={() => setModalEditarAberto(false)}
                  AbrirModalAlterarSenha={() => {
                    setModalEditarAberto(false);
                    setModalSenhaAberto(true);
                  }}
                  Salvar={(dados) => {
                    console.log("SALVAR:", dados);
                    setModalEditarAberto(false);
                  }}
                  Deletar={() => {}}
                />
              )}
          </div>
        </div>
        
        <div className="w-full max-w-[318px] mt-[5px] flex flex-col gap-3 mx-auto lg:ml-[65px]">
          <input type="text" className="placeholder-black text-4xl lg:text-[52.56px]" placeholder="Nome"/>
          <div className="flex items-center gap-2">
            <div className="text-xl lg:text-[29.15px] text-gray-500">@</div>
            <input type="text" className="placeholder-gray-500 text-xl lg:text-[29.15px]" placeholder="IG"/>
          </div>

          <div className="flex items-center gap-2">
            <Image 
            className="dark:invert" 
            src="/images/email.svg" 
            alt="símbolo e-mail" 
            width={25}
            height={25}/>
            <input type="text" className="placeholder-gray-500 text-xl lg:text-[29.15px]" placeholder="E-mail"/>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between lg:items-end mt-12">
          <h1 className="text-3xl font-500 mt-12">Produtos</h1>
          <div type="text" className="text-violet-600 text-lg w-full lg:w-auto h-[43px] font-thin text-left lg:text-right cursor-pointer hover:opacity-90 transition">ver mais</div>
        </div>

        <div className="mt-4 w-full overflow-x-auto overflow-y-hidden">
          <div className="flex flex-nowrap gap-6">
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
          </div>
        </div>
      </div>
      {modalSenhaAberto && (
        <ModalAlterarSenha
          Aberto={modalSenhaAberto}
          Fechado={() => setModalSenhaAberto(false)}
          AbrirModalEditarPerfil={() => {
            setModalSenhaAberto(false);
            setModalEditarAberto(true);
          }}
          SalvarSenha={(dados) => {
            console.log("SALVAR:", dados);
            setModalSenhaAberto(false);
          }}
        />
      )}
    </main>
  );
}
