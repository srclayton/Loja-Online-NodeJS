import {
  ClipboardList,
  Home,
  LogOut,
  PackageSearch,
  PieChart,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="flex h-screen min-h-screen w-[235px] flex-col items-start bg-[#F1F1F1]">
      {/* Image profile */}
      <div className="flex h-28 w-52 items-center justify-center gap-2">
        <Image
          src={'https://github.com/srclayton.png'}
          width={39}
          height={39}
          alt=""
          className="rounded-full"
        />
        <h1>Company</h1>
      </div>
      <div className="flex grow flex-col">
        {/* Main tabs */}
        <div className="flex h-96 w-[235px] flex-col gap-2 px-8 py-3">
          {/* General button */}
          <Link
            href={'/admin'}
            className="strong flex h-11 w-32 items-center justify-center gap-3 rounded-md bg-[#0832DE] text-white"
          >
            <Home height={24} width={24} color="white" />
            General
          </Link>
          {/* Settings button */}
          <button className="strong flex h-11 w-32 items-center gap-3 rounded-md">
            <PieChart height={24} width={24} />
            Settings
          </button>
          {/* Items button */}
          <Link
            href={'/admin/items'}
            className="strong flex h-11 w-32 items-center gap-3 rounded-md"
          >
            <PackageSearch height={24} width={24} />
            Items
          </Link>
          {/* Categories button */}
          <button className="strong flex h-11 w-32 items-center gap-3 rounded-md">
            <ClipboardList height={24} width={24} />
            Categories
          </button>
        </div>
        {/* Secondary tabs */}
        <div className="flex grow items-end px-8 py-8">
          <Link href="/" className="flex h-11 w-32">
            <LogOut height={24} width={24} />
            Sign out
          </Link>
        </div>
      </div>
    </div>
  )
}
