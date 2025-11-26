"use client";
import { useState, createContext, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export const ContextoAutentic = createContext();

export function ProvedorAutentic({ children }) {
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [authVerificado, setAuthVerificado] = useState(false); 
    const router = useRouter();

    const logout = useCallback(() => {
        Cookies.remove('token');
        setUsuarioLogado(null);
        router.push('/login');
    }, [router]);

    const login = useCallback((token) => {
        Cookies.set('token', token, { expires: 1 });
        const decoded = jwtDecode(token);
        setUsuarioLogado({
            id: decoded.sub,
            username: decoded.username,
            email: decoded.email
        });
    }, []);
    
    const atualizarDados = (novosDados) => {
        setUsuarioLogado((prev) => {
            if (!prev) return null;
            return { ...prev, ...novosDados };
        });
    };

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                
                if (decoded.exp < currentTime) {
                    Cookies.remove('token');
                    setUsuarioLogado(null);
                } else {
                    setUsuarioLogado({
                        id: decoded.sub,
                        username: decoded.username,
                        email: decoded.email,
                    });
                }
            } catch (error) {
                Cookies.remove('token');
                setUsuarioLogado(null);
            }
        }
        
        setAuthVerificado(true); 

    }, []);

    const valor = { 
        usuarioLogado, 
        login, 
        logout,
        authVerificado,
        atualizarDados
    };

    if (!authVerificado) {
        return null;
    }

    return (
        <ContextoAutentic.Provider value={valor}> 
            {children}
        </ContextoAutentic.Provider>
    );
}