<template>
    <div>
        <header class="p-4 bg-white border-b">
            <nav class="container mx-auto">
                <ul class="flex justify-center gap-3">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/invoices">Invoices</NuxtLink></li>
                </ul>
            </nav>
        </header>

        <main class="py-4">
            <div class="container mx-auto">
                <slot />
            </div>
        </main>
    </div>
  </template>
  
  <script setup>
  
  </script>
  