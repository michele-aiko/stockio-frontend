import Image from "next/image";
import Link from 'next/link';
import { useContext } from "react";
import { ContextoAutentic } from "../../context/ContextoAutentic";

function NavbarLog() {
    const { usuarioLogado } = useContext(ContextoAutentic);
    const link = usuarioLogado?.username ? `/perfil/${usuarioLogado.username}` : '/login';
    
    if (!usuarioLogado) return (
        <Link href="/login">
            <Image src="/images/user_deslog.svg" alt="Usuario Deslogado" className="cursor-pointer hover:opacity-90 transition" width={30} height={30}/>
        </Link>
    );
    return (
        <Link href={link}>
            <Image src="/images/user_log.svg" alt="Usuario Logado" width={30} height={30}/>
        </Link>
    );
}

export default NavbarLog;