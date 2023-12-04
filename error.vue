<template>
    <div class="container mx-auto text-center">
        <p class="w-25 mx-auto p-4">{{ error.statusCode }}</p>

        <button class="py-2 px-3 border rounded-sm" @click="handleClearError">Go to products page</button>
    </div>
</template>

<script setup>
    defineProps(['error'])

    const handleClearError = () => clearError({ redirect: '/' })
</script>

<style scoped>

</style>