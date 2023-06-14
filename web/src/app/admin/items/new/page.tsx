'use client'
import NewItemForm from '@/components/NewItemForm'

// import { api } from '@/lib/api'
// import iItem from '@/types/Item'
export default async function newItem() {
  // const response = await api.get('/categories')
  // const categories = response.data

  return (
    <div>
      <div className="m-2 flex  flex-col gap-2 ">
        <NewItemForm />
      </div>
    </div>
  )
}
// {checkbox
//   "name": "Novo item 2.0",
//   "description": "teste",
//   "price": 89.9,
//   "hasDiscount": true,
//   "discountPercentage": "11",
//   "discountValue": 10,
//   "discountedValue": 79.9,
//   "quantity": 452,
//   "categoriesId": [
//     "f2ad8438-acd9-4716-9ac4-e8aa24b974c6",
//     "7ae1302b-a8f0-4a89-9cd9-834aa4218f19",
//     "1e866d35-7178-4d09-b400-c24e36dd2064"
//   ],
//   "image":"d46b2e5b-c25d-4f22-940e-8ed36bbe5f42"
// }
