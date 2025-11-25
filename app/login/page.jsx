"use client"
//Usado para o unuário escolher como a senha será mostrada
import Image from 'next/image';
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import PasswordField from "@/components/PasswordField";
import { useRouter } from 'next/navigation';
import api from '../../services/api';
import Cookies from 'js-cookie';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email: email, senha: senha });
      
      const { access_token } = response.data;

      Cookies.set('token', access_token, { expires: 1 });
      const decoded = jwtDecode(access_token);
      const username = decoded.username;

      router.push(`/perfil/${username}`);
    } catch (error) {
      alert('Email ou senha inválidos');
    }
  };
  return (
  <main>
    <div className = "flex min-h-screen bg-yellow-50 justify-between">
      {/* Uso justify-between porque é uma página com dois principais elementos,
      o mascote na esquerda e o formulário na direita*/}
      <div>
        <div className="pl-50 pt-10">
          <Image 
            width={250}
            height={50}
            src={"/images/logo.png"}
            alt={"Logo da Stock.io"}></Image>
        </div>

        <div className="pl-50">
          <Image 
            width={350}
            height={350}
            src={"/images/stockles.png"}
            alt={"Stockles, mascote da empreasa"}></Image>
        </div>
      </div>

      <div className = "w-2/5 min-w-100 bg-slate-950 rounded-t-[3rem] p-16 mr-24 mt-10 translate-y-2 transform hover:translate-y-0 transition-all duration-300 ease-linear"> 
      {/* usei rounded-t-[3rem] porque o maior raio padrão da documentação não chega perto da referência */}
        <h2 className="text-center font-league pt-1 text-4xl text-yellow-50 font-bold mb-10 mt-7">BEM VINDO DE VOLTA!</h2>

          <form onSubmit={handleLogin}>
            <div>
              <label
              htmlFor = "email"
              className="sr-only" //Essa label não aparece na tela, deixei ela por causa do leitor de acessibilidade
              >E-mail</label>
              <input
                id = "email" 
                type = "text" 
                placeholder="E-mail" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="text-lg text-gray-500 font-league w-full pt-1 p-1 pl-4 mb-6 bg-yellow-50 rounded-full focus:border-2 focus:border-grey">
              </input>
            </div>

            <div>
              <label
              htmlFor = "Senha"
              className="sr-only" 
              >Senha</label>
              <PasswordField
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="flex items-center text-lg text-gray-500 w-full p-1 pl-4 mb-4 bg-yellow-50 rounded-full focus:border-2 focus:border-grey"
              inputClass="flex-1 bg-yellow-50 focus:outline-none "
              buttonClass="px-2"
              />
            </div>
          

            <div className="w-full text-center pb-5">
              <a 
              href="INSIRA O LINK"
              className="text-base text-center font-league font-base underline"
              >Esqueceu sua senha?</a>
            </div>

            <div>
              <button type="submit" className="bg-violet-600 text-yellow-50 text-lg w-full rounded-full font-semibold p-1 mb-4 transform hover:scale-103">ENTRAR</button>
            </div>
          </form>
          

          <div>
            <p className="text-yellow-50 text-base">
                Não possui uma conta?  
                <a 
                  href="/cadastro" 
                  className="text-violet-600 hover:underline"
                >  Cadastre-se</a>
            </p>
          </div>

        </div>
      </div>
      </main>

    )
}
