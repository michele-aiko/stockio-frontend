"use client"
import Image from "next/image";
import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useRouter } from 'next/navigation';
import ModalEditarPerfil from "../../components/modal_editar_perfil";
import BotaoPerfil from "../../components/mostrar_botao_edit_perfil";
import CardProduto from "../../components/card_produto";
import ModalAlterarSenha from "../../components/modal_alterar_senha";
import { ContextoAutentic } from "../../../context/ContextoAutentic";
import api from '@/services/api';
import Link from 'next/link';
import NavbarLog from "../../components/navbar_logado";
import NavbarDeslog from "../../components/navbar_logado";

export default function PaginaDePerfil() {
  const params = useParams();
  const router = useRouter();
  const mostrarErro = useRef(false);
  const usernameProfile = params.usuario;

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meuPerfil, setMeuPerfil] = useState(false);

  const { usuarioLogado, logout } = useContext(ContextoAutentic);
  const link = usuarioLogado?.username ? (`/perfil/${usuarioLogado.username}`) : ("/login");

  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);

  useEffect(() => {
    if (!usernameProfile) return;

    mostrarErro.current = false;

    setLoading(true);

    api.get(`/usuario/u/${usernameProfile}`)
      .then(response => {
        setUsuario(response.data); // Apenas salva os dados da página
      })
      .catch(error => {
        setUsuario(null);
        if (mostrarErro.current) return;

        mostrarErro.current = true;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [usernameProfile, router]);

  useEffect(() => {
    if (usuario && usuarioLogado) {
        const perf = usuario.username.toLowerCase() === usuarioLogado.username.toLowerCase();

        setMeuPerfil(perf);
        
    } else {
        setMeuPerfil(false);
    }
  }, [usuario, usuarioLogado]);

  if (loading) return <div className="p-10">...</div>;
  if (!usuario) {
      return (
          <div className="flex flex-col items-center justify-center h-screen gap-4">
              <h1 className="text-2xl font-bold text-red-600">Ops! Usuário não encontrado.</h1>
              <p>O perfil @{usernameProfile} não existe.</p>
              <button onClick={() => router.push('/')} className="bg-black text-white cursor-pointer hover:opacity-90 px-4 py-2 rounded">Voltar para o Feed</button>
          </div>
      )
  }

  return (
    <main className="min-h-screen bg-yellow-50 flex flex-col">

      <div className="w-full h-[300px] lg:h-[449px] bg-black flex flex-col justify-between relative z-0">

        <div className="w-full flex justify-between items-center px-6 lg:px-[115px] pt-8">
          <Link href="/" className="w-fit block">
            <Image
              width={221}
              height={43}
              href="/feed"
              src={"/images/logo2.svg"}
              alt={"Logo da Stock.io branca"}
              className="cursor-pointer hover:opacity-90 transition"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
          {usuarioLogado ? (
            <>
              <Image src="/images/bag.svg" alt="Sacola" width={30} height={30} className="cursor-pointer hover:opacity-80"/>
              <Image src="/images/lojinha.svg" alt="Loja" width={30} height={30} className="cursor-pointer hover:opacity-80"/>
              <NavbarLog />
              <Image src="/images/exit.svg" alt="Sair" width={30} height={30} className="cursor-pointer hover:opacity-90 transition" onClick={() => {
                if(window.confirm("Deseja realmente sair?")) 
                  logout();
                }}/>
            </>) : 
            (<div className="flex gap-4">
              <Image src="/images/bag.svg" alt="Sacola" width={30} height={30} className="cursor-pointer hover:opacity-80"/>
              <Image src="/images/lojinha.svg" alt="Loja" width={30} height={30} className="cursor-pointer hover:opacity-80"/>
              <NavbarDeslog />
            </div>)}
          </div>
        </div>

        <div className="w-full px-6 lg:px-[115px] pb-10">
          <Link href="/" className="w-fit block">
            <Image
              className="dark:invert hover:opacity-90 transition"
              src="/images/seta_perfil.svg"
              alt="seta perfil"
              width={28}
              height={48}
              priority
            />
          </Link>
        </div>
      </div>
      
      <div className="w-full px-6 lg:px-[115px] relative z-10">

        <div className="flex flex-col lg:flex-row justify-between lg:items-start">
          
          {usuario.foto_perfil_url ? (<img src={usuario.foto_perfil_url} alt={`Foto de perfil de ${usuario.nome}`} className="w-[230px] h-[230px] transition mx-auto lg:ml-[65px] bg-gray-200 rounded-full mt-[-150px] shrink-0"></img>) :
          (<div className="w-[230px] h-[230px] cursor-pointer hover:opacity-90 transition mx-auto lg:ml-[65px] bg-gray-200 rounded-full mt-[-150px] border-yellow-50 shrink-0"></div>)}

          <div className="mt-8 self-center transition lg:self-auto" onClick={() => setModalEditarAberto(true)}>
            {meuPerfil && (
                <BotaoPerfil onClick={() => setModalEditarAberto(true)} />  
            )} 
              {modalEditarAberto && (
                <ModalEditarPerfil
                  Aberto={modalEditarAberto}
                  Fechado={() => setModalEditarAberto(false)}
                  usuarioAtual={usuario}

                  AbrirModalAlterarSenha={() => {
                    setModalEditarAberto(false);
                    setModalSenhaAberto(true);
                  }}
                  
                  Salvar={(dados) => {
                    setUsuario({ ...usuario, ...dados });
                    console.log("SALVAR:", dados);
                    setModalEditarAberto(false);
                  }}
                  Deletar={() => {}}
                />
              )}
          </div>
        </div>
        
        <div className="w-full max-w-[318px] mt-[5px] flex flex-col gap-3 mx-auto lg:ml-[65px]">
          <h1 className="text-black text-4xl mt-2 lg:text-[52.56px] font-md truncate">{usuario.nome}</h1>
          {/*<div className="flex items-center gap-2">
            <div className="text-xl lg:text-[29.15px] text-gray-500">@</div>
              <input type="text" className="placeholder-gray-500 text-xl lg:text-[29.15px]" placeholder="IG"/>
          </div>*/}

          <div className="flex items-center gap-2">
            <Image 
            className="dark:invert" 
            src="/images/email.svg" 
            alt="símbolo e-mail" 
            width={25}
            height={25}/>
             <h1 className="text-gray-500 text-xl lg:text-[29.15px] truncate">{usuario.email}</h1>
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
