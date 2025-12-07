'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Star, 
  Edit2, 
  ShoppingCart 
} from 'lucide-react';
import { getProductById } from '../../../src/services/products';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const productData = await getProductById(id);
      setProduct(productData);
      
      setLoading(false);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Ops! Produto não encontrado. 🥺</h1>
        <button 
          onClick={() => router.push('/')}
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
        >
          Voltar para a loja
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/images/logo2.png" alt="Stock.io Logo" className="h-10 w-auto object-contain" />
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded"
            >
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">NF</span>
              </div>
            </button>
          ) : (
            <>
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="px-4 py-2 text-sm hover:bg-gray-800 rounded"
              >
                LOGIN
              </button>
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-sm font-medium transition-colors">
                CADASTRE-SE
              </button>
            </>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <button 
          onClick={() => router.back()} 
          className="mb-6 hover:bg-gray-200 p-2 rounded-full transition-colors inline-block"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-1 flex lg:flex-col gap-4 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-20 h-20 bg-white rounded-lg border border-gray-200 p-2 flex-shrink-0 cursor-pointer hover:border-purple-500 transition-colors">
                <img 
                  src={product.image} 
                  alt="Thumbnail" 
                  className="w-full h-full object-contain opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 bg-white rounded-3xl p-8 flex items-center justify-center relative shadow-sm order-1 lg:order-2 min-h-[400px]">
             <div className="relative w-full h-full flex items-center justify-center group">
                <div className={`absolute w-64 h-64 ${product.color ? product.color.replace('bg-', 'bg-opacity-20 bg-') : 'bg-purple-100'} rounded-full blur-3xl -z-0`}></div>
                
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-80 w-auto object-contain z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
             </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4 order-3">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              <button className="text-purple-600 hover:bg-purple-50 p-2 rounded-full">
                <Edit2 size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="ml-1 text-gray-700 font-bold">4.5</span>
              </div>
              <span>|</span>
              <span>15 reviews</span>
              <span className="ml-4 text-purple-600 font-medium">mercado</span>
              <span className="text-purple-400">3 disponíveis</span>
            </div>

            <div className="text-5xl font-bold text-gray-900 mt-2">
              R${typeof product.price === 'number' ? product.price.toFixed(2).replace('.', ',') : product.price}
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-lg mb-2">Descrição</h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {product.description || `Este ${product.name} é simplesmente incrível! 
                
                Feito com os melhores ingredientes selecionados para garantir um sabor inesquecível.
                
                INGREDIENTES:
                Farinha de trigo enriquecida, açúcar, chocolate nobre, manteiga e muito amor.
                
                ALÉRGICOS: CONTÉM GLÚTEN E LACTOSE.`}
              </p>
            </div>

            <div className="mt-auto pt-6">
               <button className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200 flex items-center justify-center gap-2">
                 <ShoppingCart size={20} />
                 Adicionar ao Carrinho
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailsPage;