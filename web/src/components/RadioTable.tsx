'use client'
import Image from 'next/image'

import { Edit2 } from 'lucide-react'
export default function RadioTable(props: any) {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <th className="w-72 text-center">Name</th>
          <th className="w-3/6 ">Description</th>
          <th>Price</th>
          <th>Categories</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item: any) => (
          <tr key={item.id}>
            <td className="flex items-center p-4">
              <Image
                src={item.images[0].imageUrl}
                width={39}
                height={39}
                alt=""
                className="rounded-full"
              />
              <span className="ml-2 truncate">{item.name}</span>
            </td>
            <td className="truncate ">{item.description}</td>
            <td className="p-4 text-center">{item.price}</td>
            <td className="p-4 text-center">{item.categories[0].name}</td>
            <td className="p-4 text-center">{item.quantity}</td>
            <td>
              <Edit2 />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
