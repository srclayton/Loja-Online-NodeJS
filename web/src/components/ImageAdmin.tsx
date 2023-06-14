import { PlusSquare } from 'lucide-react'
import { MediaPicker } from './MediaPicker'
import ImageInputProps from '@/types/ImageInputProps'

export default function ImageAdmin({
  selectedImages,
  setSelectedImages,
}: ImageInputProps) {
  return (
    <div className="flex h-72 flex-col gap-6">
      <div className="m-2 mt-10 flex flex-wrap gap-2">
        <label
          className="flex h-56 w-44 cursor-pointer flex-col items-center justify-center rounded border border-[#0832DE] text-[#0832DE]"
          htmlFor="media"
        >
          <PlusSquare color="#0832DE" height={32} width={32} strokeWidth="1" />
          <p>Adicionar imagem</p>
        </label>
        <MediaPicker
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
      </div>
    </div>
  )
}
