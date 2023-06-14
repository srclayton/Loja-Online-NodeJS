import React from 'react'

interface ImageInputProps {
  selectedImages: File[]
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>
}

export default ImageInputProps
