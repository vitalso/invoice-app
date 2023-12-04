<template>
    <div class="my-5">
        <NuxtLink :to="`/invoices/${item.docId}`"><span class="block">ID: {{ item.docId }}</span></NuxtLink>
        <span class="block">Name: {{ item.name }}</span>
        <span class="block">Email: {{ item.email }}</span>
        <span class="block">Date: {{ item.date }}</span>
    </div>
</template>

<script setup>
const props = defineProps(['item']);
</script>