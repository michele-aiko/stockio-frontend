"use client"

export default function ProductCard({
    image, 
    name, 
    price,
    stock,
    storeImage
}){
    return(
        <div className=" relative w-45 h-65 bg-white rounded-4xl p-4 flex flex-col">
            {/*overflow-hidden esconde  a imagem que poderia vazar do container*/}
            <div className="h-35 rounded-4xl overflow-hidden flex items-center justify-center">
                <img src = {image} alt = {name} className="object-cover h-full w-full"/>
                {/* object cover faz com que a imagem ocupe todo o espaço, sem deformar e sem barras brancas */}
            </div>
            <h2 className="text-xl text-black pl-2 pt-2 w-37 overflow-hidden whitespace-nowrap text-ellipsis">{name}</h2>
            <p className = "text-l text-black pl-2 ">R${price}</p>
            <p className={stock?"text-lime-300 pl-2":"text-red-800 pl-2"}>{stock?"DISPONÍVEL":"INDISPONÍVEL"}</p>

            <div>
                <img src={storeImage} className="absolute top-4 right-4 w-1/4"/>
            </div>





        </div>




);}