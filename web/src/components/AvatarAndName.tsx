import { Camera } from 'lucide-react'

export default function AvatarAndName() {
  return (
    <div className="flex h-36 ">
      <div className="flex h-36 w-36 items-center justify-center rounded-full bg-slate-200">
        <Camera height={40} width={40} strokeWidth="1" />
      </div>
      <div className="flex flex-1  items-center ">
        <input
          required
          type="text"
          name="name"
          placeholder={`Nome do item!`}
          className="m-5 h-14 w-full truncate border border-none text-4xl font-semibold "
        />
      </div>
    </div>
  )
}
