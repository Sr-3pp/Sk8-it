import type { Contest } from '~/types/contest'

export const useContest = () => {
  const getContests = () => $fetch('/api/contests')
  const getContest = (id: string) => $fetch(`/api/contest/${id}`)
  const deleteContest = (id: string) => $fetch('/api/contests', {
    method: 'DELETE',
    body: {
      id,
    },
  })

  const saveContest = (data: Contest) => $fetch('/api/contests', {
    method: 'POST',
    body: data,
  })

  return {
    getContests,
    deleteContest,
    saveContest,
    getContest
  }
}
