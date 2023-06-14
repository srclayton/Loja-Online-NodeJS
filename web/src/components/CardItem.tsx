'use client'
import { UserCircle2 } from 'lucide-react'
import Image from 'next/image'

// export default function cardItem(props: any) {
//   return (
//     <>
//       {props.data.map((item: any) => (
//         <div
//           key={item.id}
//           className=" flex h-56 w-44 flex-col items-center  rounded bg-[#F9F9F9] shadow"
//         >
//           <Image
//             className=" m-3 rounded-full"
//             height={80}
//             width={80}
//             alt="Profile image"
//             src={item.images[0].imageUrl}
//           />
//           <div className="flex w-full  text-center text-lg">
//             <p className="line-clamp-2 w-5/6">{item.name}</p>
//           </div>
//           <p className="truncate text-sm text-gray-500">R$ {item.price}</p>
//           <p className="truncate text-sm text-gray-500">
//             Qnt.: {item.quantity}
//           </p>
//         </div>
//       ))}
//     </>
//   )
// }
import { useState } from 'react'

const itemsPerPage = 12 // Número de itens exibidos por página
const totalItems = 50 // Número total de itens

export default function cardItem(props: any) {
  const [currentPage, setCurrentPage] = useState(1)

  // Calcula os índices de início e fim dos itens na página atual
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Função para ir para a próxima página
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  // Função para ir para a página anterior
  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  // Filtra os itens com base na página atual
  const displayedItems = props.data.slice(startIndex, endIndex)

  return (
    <>
      {displayedItems.map((item) => (
        <div
          key={item.id}
          className=" flex h-56 w-44 flex-col items-center  rounded bg-[#F9F9F9] shadow"
        >
          <Image
            className=" m-3 rounded-full"
            height={80}
            width={80}
            alt="Profile image"
            src={item.images[0].imageUrl}
          />
          <div className="flex w-full  text-center text-lg">
            <p className="line-clamp-2 w-5/6">{item.name}</p>
          </div>
          <p className="truncate text-sm text-gray-500">R$ {item.price}</p>
          <p className="truncate text-sm text-gray-500">
            Qnt.: {item.quantity}
          </p>
        </div>
      ))}

      <div className="flex basis-full items-center justify-center gap-4 ">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage * itemsPerPage >= totalItems}
        >
          Next
        </button>
      </div>
    </>
  )
}
