export default function Description() {
  return (
    <div>
      <p className="text-lg text-[#747474] ">Descrição</p>
      <textarea
        required
        name="description"
        spellCheck={false}
        className="h-28 w-full flex-1 resize-none  rounded-lg border-0 bg-[#F1F1F1] p-2 text-lg  leading-relaxed placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Fique livre para adicionar uma descrição, tamanho e mais detalges sobre o produto."
      />
    </div>
  )
}
