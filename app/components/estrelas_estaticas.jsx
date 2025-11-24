import { IoIosStar } from "react-icons/io";

export function Estrelas({ nota }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <IoIosStar
          key={i}
          size={20}
          className={i <= nota ? "text-yellow-300" : "text-gray-500"}
        />
      ))}
    </div>
  );
}
