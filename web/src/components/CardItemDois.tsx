const itemsPerPage = 10 // Número de itens exibidos por página
const totalItems = 100 // Número total de itens
let currentPage = 1 // Página atual

// Função para calcular os índices de início e fim dos itens na página atual
function calculatePagination() {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1)

  // Simulando o carregamento dos itens da página atual
  const items = []
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(`Item ${i + 1}`)
  }

  // Exemplo: Renderizar os itens na tela
  renderItems(items)

  // Exemplo: Atualizar os controles de paginação na tela
  updatePaginationControls()
}

// Função para ir para a próxima página
function nextPage() {
  currentPage++
  calculatePagination()
}

// Função para ir para a página anterior
function previousPage() {
  currentPage--
  calculatePagination()
}

// Função para ir para uma página específica
function goToPage(page) {
  currentPage = page
  calculatePagination()
}

// Função para renderizar os itens na tela (exemplo)
function renderItems(items) {
  const itemList = document.getElementById('item-list')
  itemList.innerHTML = ''

  items.forEach((item) => {
    const listItem = document.createElement('li')
    listItem.textContent = item
    itemList.appendChild(listItem)
  })
}

// Função para atualizar os controles de paginação na tela (exemplo)
function updatePaginationControls() {
  const previousButton = document.getElementById('previous-button')
  const nextButton = document.getElementById('next-button')
  const pageButtons = document.getElementsByClassName('page-button')

  previousButton.disabled = currentPage === 1
  nextButton.disabled = currentPage === Math.ceil(totalItems / itemsPerPage)

  for (let i = 0; i < pageButtons.length; i++) {
    const pageButton = pageButtons[i]
    const page = i + 1

    pageButton.classList.toggle('active', page === currentPage)
  }
}

// Exemplo: Associar eventos aos botões de paginação
const previousButton = document.getElementById('previous-button')
const nextButton = document.getElementById('next-button')
const pageButtons = document.getElementsByClassName('page-button')

previousButton.addEventListener('click', previousPage)
nextButton.addEventListener('click', nextPage)

for (let i = 0; i < pageButtons.length; i++) {
  const pageButton = pageButtons[i]
  const page = i + 1

  pageButton.addEventListener('click', () => {
    goToPage(page)
  })
}

// Calcular a paginação inicial ao carregar a página
calculatePagination()
