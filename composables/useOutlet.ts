export const useOutlet = () => {
  const getOutlets = () => useAsyncData('getOutlets', () => $fetch('/api/outlet'))
  
  return {
    getOutlets,
  }
}
