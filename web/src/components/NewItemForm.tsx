'use client'
import { FormEvent, useEffect, useState } from 'react'
import { NumberFormatValues, NumericFormat } from 'react-number-format'
import Description from './Description'
import ImageAdmin from './ImageAdmin'
import AvatarAndName from './AvatarAndName'
import Select from 'react-select'
import { api } from '@/lib/api'
import iOption from '@/types/Option'

export default function NewItemForm() {
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [options, setOptions] = useState<iOption[]>([])
  const [priceValue, setPriceValue] = useState('')
  const [categoryIds, setCategoryIds] = useState([])
  const imagesIds: string[] = []
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get('/categories')
      const fetchedCategories: any[] = response.data

      const updatedOptions: iOption[] = fetchedCategories.map(
        (category: any) => ({
          value: category.name,
          label: category.name,
          id: category.id,
        }),
      )

      setOptions(updatedOptions)
      const ids: string[] = fetchedCategories.map(
        (category: any) => category.id,
      )
      setCategoryIds(ids)
    }

    fetchCategories()
  }, [])
  function handleValueChange(values: NumberFormatValues) {
    const { value } = values
    setPriceValue(value)
    console.log(value)
  }
  async function handleCreateItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    for (const fileImage of selectedImages) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileImage)
      const fireBirdImage = await api.post('/upload', uploadFormData)
      if (!fireBirdImage) return
      const imageResponse = await api.post('/images', {
        id: fireBirdImage.data.id,
        name: fireBirdImage.data.name,
        contentType: fireBirdImage.data.contentType,
        imageUrl: fireBirdImage.data.imageUrl,
      })
      imagesIds.push(imageResponse.data.id)
    }
    const newItem = await api.post('/items', {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseInt(priceValue),
      hasDiscount: true,
      discountPercentage: '11',
      discountValue: 10,
      discountedValue: 79.9,
      quantity: 452,
      categoriesId: categoryIds,
      image: imagesIds,
    })

    console.log(newItem)
  }
  return (
    <>
      <form onSubmit={handleCreateItem}>
        <AvatarAndName />
        <ImageAdmin
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
        <Description />
        <div className="flex gap-5">
          <label className="flex flex-col">
            Valor
            <NumericFormat
              value={null}
              required={true}
              allowNegative={false}
              name="price"
              className="h-10 w-32 rounded-lg bg-[#F1F1F1] p-4"
              placeholder={'R$123.50'}
              thousandSeparator={true}
              // fixedDecimalScale={true}
              decimalScale={2}
              // hundredSeparator={true}
              prefix={'R$'}
              onValueChange={handleValueChange}
            />
          </label>

          <label>
            <Select
              required={true}
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti={true}
            />
          </label>
        </div>
        <button
          className="font-alt inline-block self-end rounded-full bg-green-500 px-5 py-4 text-sm uppercase leading-none text-black hover:bg-green-600"
          type="submit"
        >
          Salvar
        </button>
      </form>
    </>
  )
}
