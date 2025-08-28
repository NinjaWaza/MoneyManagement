export type Transaction = {
    id: number
    user_id: string
    amount: number
    type: string
    accountFrom: string
    accountTo: string
    date: Date
}