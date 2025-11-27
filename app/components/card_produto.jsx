import Image from "next/image";

function CardProduto({ dados }) {

  if (!dados) return null;

  const { nome, preco, estoque, Imagens_produto } = dados;
  const imagemCapa = Imagens_produto?.[0]?.url_imagem;
  const estaDisponivel = estoque > 0;

  return (
    <div className="w-[229px] h-[310px] bg-white rounded-[35px] flex flex-col overflow-hidden shrink-0 relative cursor-pointer hover:opacity-90 transition">
        <div className="w-full h-[180px] shrink-0"></div>
        <div className="w-full h-[68px] flex-1"></div>

        <div className="p-[22px] flex-1 flex flex-col justify-end">
            
            <h3 className="text-black text-[26.65px] w-full truncate font-bold" title={nome}>
                {nome}
            </h3>
            
            <p className="text-black text-[23.02px] w-full truncate">
                R$ {preco?.toFixed(2).replace('.', ',')}
            </p>
            
            <p className={`text-[13.86px] w-full truncate ${estaDisponivel ? 'text-green-600' : 'text-red-500'}`}>
                {estaDisponivel ? "Disponível" : "Esgotado"}
            </p>
        </div>
       
        <div className="w-[180px] h-[180px] bg-gray-200 absolute top-4 left-1/2 -translate-x-1/2 rounded-[20px] overflow-hidden shadow-sm">
           {imagemCapa ? (
             <img src={imagemCapa} alt={nome} className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                Sem foto
             </div>
           )}
           <div className="w-[68px] h-[68px] absolute top-2 right-2 rounded-full bg-gray-500 priority z-10 border-2 border-white"></div>
        </div>
    </div>
  );
}

export default CardProduto;