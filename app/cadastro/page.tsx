"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';
import axios from 'axios';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    username: '',
    email: '',
    senha: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmPassword) {
      alert("As senhas não são iguais.");
      return;
    }
    const dadosParaEnviar = {
      nome: formData.nome,
      email: formData.email,
      username: formData.username,
      senha: formData.senha
    };
    try {
      await api.post('/usuario', dadosParaEnviar);
      alert('Usuário criado com sucesso!');
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Erro ao registrar');
      } else {
        alert('Ocorreu um erro desconhecido');
      }
    }
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#E8E4D9] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* lacunas para os dados pessoais */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-[#2B2B2B] rounded-3xl p-8 shadow-2xl">
            <h1 className="text-white text-3xl font-bold mb-8 text-center">
              CRIE SUA CONTA
            </h1>
            
            <div className="space-y-4">
              <input
                type="text"
                name="nome"
                placeholder="Nome Completo"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmar Senha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <button
                onClick={handleSubmit}
                className="w-full bg-[#6C5CE7] hover:bg-[#5B4CD6] text-white font-bold py-3 rounded-full transition-colors duration-200 shadow-lg mt-6"
              >
                CRIAR CONTA
              </button>
            </div>
            
            <p className="text-center text-white mt-6 text-sm">
              Já possui uma conta?{' '}
              <a href="/login" className="text-[#6C5CE7] hover:text-[#5B4CD6] font-semibold">
                Login
              </a>
            </p>
          </div>
        </div>
        

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-8">
          {/* logo stock.io */}
          <div className="text-center mb-8">
            <img 
              src="/logo.png" 
              alt="Stock.io Logo" 
              className="w-80 h-auto mx-auto"
            />
          </div>
          
          {/* bonequinha do stock.io */}
          <div className="relative">
            <img 
              src="/mascote.png" 
              alt="Personagem Stock.io" 
              className="w-72 h-auto mx-auto"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
