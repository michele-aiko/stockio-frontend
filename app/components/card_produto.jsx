function CardProduto() {
  return (
    <div className="w-[229px] h-[310px] bg-white rounded-[35px] flex flex-col overflow-hidden shrink-0 relative cursor-pointer hover:opacity-90 transition">
        <div className="w-full h-[180px] shrink-0"></div>
        <div className="w-full h-[68px] flex-1"></div>

        <div className="p-[22px] flex-1">
            <input type="text" className="placeholder-black text-[26.65px] w-full truncate" placeholder="Nome do Produto"/>
            <input type="text" className="placeholder-black text-[23.02px] w-full truncate" placeholder="Preço"/>
            <input type="text" className="placeholder-black text-[13.86px] w-full truncate" placeholder="Disponibilidade"/>
        </div>
       
        <div className="w-[180px] h-[180px] bg-gray-200 absolute top-4 left-1/2 -translate-x-1/2">
           <div className="w-[68px] h-[68px] absolute top-2 right-2 rounded-full bg-gray-500 priority"></div>
        </div>
    </div>
  );
}

export default CardProduto;