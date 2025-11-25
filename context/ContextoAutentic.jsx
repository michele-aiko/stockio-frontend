"use client";
import { useState, createContext } from "react";

export const ContextoAutentic = createContext();
export function ProvedorAutentic({ children }) {
    //const [usuarioLogado, setUsuarioLogado] = useState({username: 'ana', logado: true});
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    // função de login que será chamada pelo back-end
    const login = (dadosDoUsuario) => {
        setUsuarioLogado(dadosDoUsuario);
    };

    // função de logout que será chamada pelo back-end
    const logout = () => {
        setUsuarioLogado(null);
    };

    const valor = { usuarioLogado, login, logout };

    return (
        <ContextoAutentic.Provider value={valor}> 
            {children}
        </ContextoAutentic.Provider>
    );
}