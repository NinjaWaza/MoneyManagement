<template>
  <div id="app">
    <div v-if="transactions.length > 0">
      <table border="1">
        <thead>
          <tr>
            <th>Transaction Date</th>
            <th>Amount</th>
            <th>Account From</th>
            <th>Account To</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.accountFrom }}</td>
            <td>{{ transaction.accountTo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TransactionService } from '@/services/transactionService'
import { Transaction } from 'shared/models/Transaction'

const transactions = ref<Transaction[]>([]) // Make transactions reactive
const transactionService = TransactionService()

onMounted(async () => {
  try {
    transactions.value = await transactionService.fetchTransactions() // Fetch transactions
    console.log('We got transactions:', transactions.value)
  } catch (e) {
    console.error('Error:', (e as Error).message) // Log error
  }
})
</script>
