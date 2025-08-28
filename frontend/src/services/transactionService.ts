import { Transaction } from 'shared/models/Transaction'

export function TransactionService() {
  return {
    fetchTransactions(): Promise<Transaction[]> {
      return fetchTransactions()
    },
  }
}

async function fetchTransactions(): Promise<Transaction[]> {
  console.log("Let's call the backend with cookies")
  const res = await fetch('http://localhost:3000/api/transactions', {
    method: 'GET',
    credentials: 'include', // Include cookies in the request
  })

  if (res.status == 401) {
    throw new Error('Failed to fetch user because user is not authenticated')
  }

  if (!res.ok) throw new Error('Failed to fetch user')
  const transactions: Transaction[] = await res.json()
  return transactions
}
