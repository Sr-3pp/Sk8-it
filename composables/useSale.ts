import type { Sale } from "~/server/utils/drizzle"

export const useSale = () => {
  const getSales = () => useAsyncData<Sale[]>('sales', () => $fetch('/api/sale'))
  
  const createSale = async (sale: Object, shipping: Object | null) => {
    try {
      const response = await $fetch('/api/sale', {
        method: 'POST',
        body: { sale, shipping }
      })
      return response
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create sale'
      })
    }
  }

  return {
    getSales,
    createSale
  }
}
