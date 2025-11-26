"use client";
import Image from "next/image";
import api from '@/services/api';
import { useState, useContext } from "react";
import { ContextoAutentic } from "@/context/ContextoAutentic";
import PasswordField from "@/components/PasswordField";

export default function ModalAlterarSenha ({ Aberto, Fechado, AbrirModalEditarPerfil, SalvarSenha }) {
    const { usuarioLogado } = useContext(ContextoAutentic);
    const [loading, setLoading] = useState(false);

    const estiloCaixa = "w-full border rounded-full bg-gray-100 border-transparent focus-within:border-violet-500 transition px-4";
    const estiloInput = "py-3 text-gray-700 placeholder-gray-500";
    const estiloIcone = "text-gray-500 hover:text-violet-600";

    const [form, setForm] = useState({
        senhaAntiga: '',
        novaSenha: '',
        confirmarSenha: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (form.novaSenha !== form.confirmarSenha) {
            alert("A nova senha e a confirmação não coincidem!");
            return;
        }
        if (form.novaSenha.length < 6) {
            alert("A nova senha deve ter no mínimo 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            await api.patch(`/usuario/${usuarioLogado.id}/change-password`, {
                senhaAntiga: form.senhaAntiga,
                novaSenha: form.novaSenha
            });

            alert("Senha alterada com sucesso!");
            Fechado();

        } catch (error) {
            alert(error.response?.data?.message || "Erro ao alterar senha. Verifique sua senha antiga.");
        } finally {
            setLoading(false);
        }
    };

    if(!Aberto) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4" onClick={Fechado}>

            <div className="bg-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center sm:max-h-screen max-h-[80vh] w-full max-w-md sm:max-w-[500px] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={Fechado} className="cursor-pointer absolute right-5 text-gray-400 hover:text-gray-600">
                    <Image src="/images/X-2.svg" alt="X" width={30} height={30}/>
                </button>

                <button type="button" onClick={AbrirModalEditarPerfil} className="cursor-pointer absolute left-15 mt-15 text-gray-400 hover:text-gray-600">
                    <Image src="/images/seta_senha.svg" alt="X" width={18} height={24}/>
                </button>

                <Image src="/images/key.svg" alt="X" width={180} height={180}/>

                <div className="rounded-full mt-8 bg-white z-0 flex px-7 flex-col gap-4">
                    <PasswordField type="password" name="senhaAntiga" value={form.senhaAntiga} onChange={handleChange} className="placeholder-gray-500 text-[20px] sm:w-[320px] w-[200px] bg-transparent transition right h-[50px] flex pl-4" placeholder="Senha Antiga"/>
                </div>
                <div className="rounded-full mt-5 bg-white z-0 flex px-7">
                    <PasswordField type="password" name="novaSenha" value={form.novaSenha} onChange={handleChange} className="placeholder-gray-500 text-[20px] sm:w-[320px] w-[200px] bg-transparent transition right h-[50px] flex pl-4"  placeholder="Nova Senha"/>
                </div>
                <div className="rounded-full mt-5 bg-white z-0 flex px-7">
                    <PasswordField type="password" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} className="placeholder-gray-500 text-[20px] sm:w-[320px] w-[200px] bg-transparent transition right h-[50px] flex pl-4"  placeholder="Confirmar Senha"/>
                </div>

                <button type="button" className="bg-violet-600 cursor-pointer hover:opacity-90 transition text-yellow-50 mt-20 mb-15 text-lg h-[50px] w-[250px] flex justify-center items-center flex-none sm:w-[373px] rounded-full font-light" onClick={handleSubmit} disabled={loading}>{loading ? "SALVANDO..." : "SALVAR"}</button>
            </div>
        </div>
    );
}