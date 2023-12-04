<template>
    <div class="flex justify-between items-start">
        <div>
            <h3 class="text-3xl">Invoice: {{ signleInvoice.docId }}</h3>
            <p class="text-2xl">Name: {{ signleInvoice.name }}</p>
            <p class="text-xl">E-mail: {{ signleInvoice.email }}</p>
            <p class="text-md">Date: {{ signleInvoice.date }}</p>
        </div>

        <div class="flex gap-3">
            <button class="px-3 py-2 border rounded-md" @click="editItem">Edit</button>
            <button class="px-3 py-2 rounded-md text-white bg-indigo-700" @click="deleteItem(signleInvoice.docId)">Delete</button>
        </div>

        <Modal v-if="invoice.modalActive" />

        <AddInvoice v-if="invoice.invoiceModal" />

    </div>
</template>

<script setup>
import { ref , watchEffect } from 'vue';
const { id } = useRoute().params;
const router = useRouter();
const signleInvoice = ref(null);

// Create actions with ID to show details about item
import { useInvoiceStore } from '@/stores/invoice';
const invoice = useInvoiceStore();

invoice.detailInvoice(id);
signleInvoice.value = invoice.currentInvoice[0];

const editItem = () => {
    invoice.toggleInvoice();
    invoice.editInvoice();
}

watchEffect(() => {
    if ( !invoice.editCurrentInvoice ) {
        signleInvoice.value = invoice.currentInvoice[0];
    }
})

// Delete invoice
import { doc, deleteDoc } from "firebase/firestore";
const nuxtApp = useNuxtApp();

const deleteItem = async (id) => {
    try {
        await deleteDoc(doc(nuxtApp.$db, 'invoices', id));
        invoice.deleteInvoice(id);
        router.push({ path: '/invoices' });
        console.log("Document successfully deleted:" + id);
    } catch(e) {
        console.error("Error removing document: ", e);
    };
}
</script>