export const useSku = () => {
  const { getCategoryById } = useCategory()
  const generateSku = async (productName: string, categoryId: number, subcategoryId?: number): Promise<string> => {

    // Clean product name - remove special chars, take first 3-4 letters
    const cleanName = productName
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()
      .substring(0, 4)

    // Generate timestamp suffix for uniqueness
    const timestamp = Date.now().toString().slice(-4)

    // Build SKU
    const { data: category } = await getCategoryById(categoryId)
    const prefix = category.value!.name
    const subcatSuffix = subcategoryId ? `-${subcategoryId.toString().padStart(2, '0')}` : ''
    
    return `${prefix}-${cleanName}${subcatSuffix}-${timestamp}`
  }

  return {
    generateSku
  }
}