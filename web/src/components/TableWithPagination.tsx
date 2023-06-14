'use client'
import { ChevronFirst, ChevronLast, Edit2 } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
const TableWithPagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = data.slice(startIndex, endIndex)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="flex h-full flex-col ">
      <div className="table-container h-5/6">
        <table className="w-full table-fixed">
          {/* Renderize os cabeçalhos da tabela */}
          <thead>
            <tr>
              <th className="w-72 text-center">Name</th>
              {/* <th className="w-3/6 ">Description</th> */}
              <th>Price</th>
              <th>Categories</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {/* Renderize os dados da tabela */}
            {currentData.map((item, index) => (
              <tr key={index}>
                <td className="flex items-center p-4">
                  <Image
                    src={item.images[0].imageUrl}
                    width={80}
                    height={80}
                    alt=""
                    className="rounded-full"
                  />
                  <span className="ml-2 truncate">{item.name}</span>
                </td>
                {/* <td className="truncate ">{item.description}</td> */}
                <td className="p-4 text-center">{item.price}</td>
                <td className="truncate p-4 text-center">
                  {item.categories[0].name}
                </td>
                <td className="p-4 text-center">{item.quantity}</td>
                <td>
                  <Edit2 />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* paginação */}
      <div className="m-5 flex justify-center gap-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          {' '}
          <ChevronFirst />
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ),
        )}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          {' '}
          <ChevronLast />
        </button>
      </div>
    </div>
  )
}

export default TableWithPagination
