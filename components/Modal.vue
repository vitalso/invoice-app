<template>
    <div class="fixed w-full h-full top-0 left-0 bg-black/70 z-10">

        <div class="absolute w-1/4 left-1/2 -translate-x-1/2 top-1/3 rounded-md border p-3 bg-white">
            <p class="text-2xl text-center my-5">Are you sure you want to exis?</p>

            <div class="flex gap-3">
                <button class="w-full px-3 py-2 rounded-md text-white bg-indigo-700" @click="closeModal">Return</button>
                <button class="w-full px-3 py-2 rounded-md border" @click="closeInvoice">Close</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useInvoiceStore } from '@/stores/invoice';
const invoice = useInvoiceStore();

const closeModal = () => {
    invoice.toggleModal();
}

const closeInvoice = () => {
    invoice.toggleModal();
    invoice.toggleInvoice();
    // Edit invoice
    if ( invoice.editCurrentInvoice ) {
        invoice.editInvoice();
    }
}

</script>