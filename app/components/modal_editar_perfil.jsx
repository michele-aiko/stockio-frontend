"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext, useRef } from "react";
import api from '@/services/api'; 
import { ContextoAutentic } from "../../context/ContextoAutentic";

export default function ModalEditarPerfil({ Aberto, Fechado, Salvar, Deletar, AbrirModalAlterarSenha, usuarioAtual}) {

    const router = useRouter();
    const fotinha = useRef(null);
    const { atualizarDados, logout } = useContext(ContextoAutentic);

    const [formData, setFormData] = useState({
        nome: '',
        username: '',
        email: '',
        foto_perfil_url: ''
    });
    const [loading, setLoading] = useState(false);

    // Preenche o formulário quando o modal abre
    useEffect(() => {
        if (usuarioAtual) {
            setFormData({
                nome: usuarioAtual.nome || '',
                username: usuarioAtual.username || '',
                email: usuarioAtual.email || '',
                foto_perfil_url: usuarioAtual.foto_perfil_url || ''
            });
        }
    }, [usuarioAtual, Aberto]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // O resultado é uma string gigante: "data:image/png;base64,iVBORw0KGgo..."
                setFormData({ ...formData, foto_perfil_url: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Chama a API para salvar no banco
            await api.patch(`/usuario/${usuarioAtual.id}`, formData);

            // 2. Atualiza o Contexto Global (cabeçalho, etc)
            atualizarDados(formData);

            // 3. Avisa a página pai que salvou (para atualizar a tela de fundo)
            Salvar(formData);
            
            // 4. Lógica Especial: Se mudou o USERNAME, a URL atual não existe mais!
            // Precisamos redirecionar para a URL nova.
            if (formData.username !== usuarioAtual.username) {
                alert("Username alterado! Redirecionando...");
                router.push(`/perfil/${formData.username}`);
            } else {
                alert("Perfil atualizado com sucesso!");
                Fechado(); // Fecha o modal
            }

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Erro ao atualizar perfil");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        // 1. Confirmação de Segurança
        const confirmacao = window.confirm("Tem certeza que quer deletar todos os dados de perfil?");

        if (confirmacao) {
            setLoading(true);
            try {
                // 2. Chama a API para deletar
                await api.delete(`/usuario/${usuarioAtual.id}`);
                
                alert("Sua conta foi deletada.");
                
                // 3. Limpa tudo e manda pro login
                logout(); 

            } catch (error) {
                console.error(error);
                alert("Erro ao deletar conta. Tente novamente.");
                setLoading(false);
            }
        }
    };

    if(!Aberto) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4" onClick={Fechado}>

            <div className="bg-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center sm:max-h-screen max-h-[80vh] w-full max-w-md sm:max-w-[500px] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={Fechado} className="absolute right-5 text-gray-400 cursor-pointer hover:text-gray-600">
                    <Image src="/images/X-2.svg" alt="X" width={30} height={30}/>
                </button>

                <div className="relative w-[150px] h-[150px] mx-auto group">
                    <input type="file" ref={fotinha} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }}/>

                    <div className="w-full h-full rounded-full bg-gray-500 overflow-hidden shadow-md relative z-0">
                        {formData.foto_perfil_url ? (<img src={formData.foto_perfil_url} alt="Preview" className="w-full h-full object-cover" />) : 
                        (<div className="w-full h-full bg-gray-500"></div>)}
                    </div>

                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 w-[60px] h-[60px] bg-white cursor-pointer rounded-full flex items-center justify-center shadow-md hover:scale-110 transition" onClick={() => fotinha.current.click()}>
                        <Image src="/images/camera.svg" alt="camera" width={30} height={30}/>
                    </div>

                </div>

                <div className="rounded-full mt-8 bg-white z-0 flex px-7">
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="placeholder-gray-500 text-[20px] h-[50px] sm:w-[320px] w-[200px] bg-transparent" placeholder="Nome"/>
                </div>
                <div className="rounded-full mt-5 bg-white z-0 flex px-7">
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="placeholder-gray-500 text-[20px] h-[50px] sm:w-[320px] w-[200px] bg-transparent" placeholder="Username"/>
                </div>
                <div className="rounded-full mt-5 bg-white z-0 flex px-7">
                    <input type="text" name="email" value={formData.email} onChange={handleChange} className="placeholder-gray-500 text-[20px] h-[50px] sm:w-[320px] w-[200px] bg-transparent" placeholder="E-mail"/>
                </div>

                <button type="button" className="border-[#AF052A] border-2 bg-transparent text-[#AF052A] cursor-pointer hover:opacity-90 transition flex justify-center items-center flex-none text-lg mt-7 sm:w-[373px] w-[250px] h-[50px] rounded-full font-light" onClick={handleDelete}>DELETAR</button>                
                
                <button type="button" className="border-violet-600 border-2 text-violet-600  cursor-pointer hover:opacity-90 transition mt-4 text-lg h-[50px] w-[250px] flex justify-center items-center flex-none sm:w-[373px] rounded-full font-light" onClick={() => { AbrirModalAlterarSenha() ; Fechado() }}>ALTERAR SENHA</button>

                <button type="button" className="bg-violet-600 text-yellow-50 mt-4 text-lg h-[50px] w-[250px] cursor-pointer hover:opacity-90 transition flex justify-center items-center flex-none sm:w-[373px] rounded-full font-light" onClick={handleSubmit}>SALVAR</button>
            </div>
        </div>
    );
}