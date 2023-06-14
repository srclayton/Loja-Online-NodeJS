'use client'

import { Trash2 } from 'lucide-react'
import { ChangeEvent } from 'react'
import ImageInputProps from '@/types/ImageInputProps'
export function MediaPicker({
  selectedImages,
  setSelectedImages,
}: ImageInputProps) {
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) {
      return
    }
    for (const file of files) {
      setSelectedImages((prevState) => [...prevState, file])
    }
  }

  function onFileRemoved(indice: number) {
    const newPreviewList = [...selectedImages]
    newPreviewList.splice(indice, 1)
    setSelectedImages(newPreviewList)
  }
  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*"
        multiple
        className="invisible h-0 w-0"
      />
      {selectedImages[0] &&
        selectedImages.map((item, index) => (
          <div key={index}>
            <label className="flex h-56 w-44 flex-col items-center gap-2 rounded border bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="era para ser a imga"
                src={URL.createObjectURL(item)}
                className=" aspect-square w-full rounded-lg border object-cover"
              />
              <button
                onClick={() => onFileRemoved(index)}
                type="button"
                className="flex w-11/12 items-center justify-center gap-2 rounded border border-red-500 p-1 text-red-500 "
              >
                <Trash2 width={15} /> Remover
              </button>
            </label>
          </div>
        ))}
    </>
  )
}
