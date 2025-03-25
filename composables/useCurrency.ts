export const useCurrency = () => {
  const toCurrency = (value: number, currency: string = 'MXN') => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
    }).format(value)
  }
  return {
    toCurrency,
  }
}
