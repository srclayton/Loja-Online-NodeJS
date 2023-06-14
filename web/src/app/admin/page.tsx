'use client'
import React, { useState } from 'react'

const ImageInput = () => {
  const [selectedImages, setSelectedImages] = useState([])

  const handleImageChange = (event) => {
    const files = event.target.files
    const imagesArray = Array.from(files)
    setSelectedImages(imagesArray)
  }

  return <h1>ola</h1>
}

export default ImageInput
