// import RadioTable from '@/components/RadioTable'
// import CardItem from '@/components/CardItem'
// import CardItem from '@/components/CardItem'
// import RadioTable from '@/components/RadioTable'
import TableWithPagination from '@/components/TableWithPagination'
import { api } from '@/lib/api'
import { PackageSearch } from 'lucide-react'
import Link from 'next/link'
export default async function ItemsPage() {
  const response = await api.get('/items')
  const items: any[] = response.data
  const itemsPerPage = 5
  return (
    <div className="flex h-full flex-col">
      <div className="mx-3 mt-10 flex h-full flex-wrap justify-center gap-2 ">
        {/* <RadioTable items={items} /> */}
        <TableWithPagination data={items} itemsPerPage={itemsPerPage} />
        {/* <CardItem data={items} /> */}
      </div>
      <div className="m-4 flex h-1/4 items-center justify-center ">
        <Link
          href={'/admin/items/new'}
          className="flex h-10 w-80 items-center justify-center gap-2 rounded bg-[#4340DA] text-white"
        >
          <PackageSearch />
          <h1>Criar produto</h1>
        </Link>
      </div>
    </div>
  )
}
