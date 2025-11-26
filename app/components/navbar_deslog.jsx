import Image from "next/image";
import Link from 'next/link';
function NavbarDeslog() {
    return (
    <Link href="/login">
        <Image src="/images/user_deslog.svg" alt="Usuario Deslogado" className="cursor-pointer hover:opacity-90 transition" width={30} height={30}/>
    </Link>);
}

export default NavbarDeslog;