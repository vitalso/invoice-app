<template>
    <div class="container mx-auto relative">
        <div class="flex justify-between items-center gap-4">
            <h2 class="text-2xl font-medium py-4">Invoices</h2>

            <div class="relative ml-auto">
                <button class="px-3 py-2 border rounded-md" @click="toggleFilterMenu">Filter by: {{ filterInvoiceType }}</button>

                <ul v-show="filterMenu" class="absolute top-full left-0 p-3 border rounded-md flex flex-col gap-2 align-start">
                    <li @click="filterInvoice">Date</li>
                    <li @click="filterInvoice">Pending</li>
                    <li @click="filterInvoice">Paid</li>
                    <li @click="filterInvoice">Clear filter</li>
                </ul>
            </div>

            <button class="px-3 py-2 rounded-md text-white bg-indigo-700" @click="toggleAddInvoice">Add invoice</button>
        </div>

        <Invoice :item="item" v-for='item in filteredData' :key='item.id' />

        <Modal v-if="invoice.modalActive" />

        <AddInvoice v-if="invoice.invoiceModal" />
    </div>
</template>

<script setup>
import { ref , computed , onMounted } from 'vue';
const filterMenu = ref(false);
const filterInvoiceType = ref(null);

import { useInvoiceStore } from '@/stores/invoice';
const invoice = useInvoiceStore();

const toggleFilterMenu = () => {
    filterMenu.value = !filterMenu.value;
}

const toggleAddInvoice = () => {
    invoice.toggleInvoice();
    //console.log(invoice.invoiceModal);
}

onMounted(() => {
    invoice.getInvoices();
})

// Filter invoice
const filterInvoice = (e) => {
    toggleFilterMenu();
    if ( e.target.innerText === 'Clear filter' ) {
        filterInvoiceType.value = null;
        return;
    }

    filterInvoiceType.value = e.target.innerText;
}

const filteredData = computed(() => {

    return invoice.invoiceData.filter( (invoice) => {
        if ( filterInvoiceType.value === 'Date' ) {
            return invoice.date >= 'Nov 15, 2023';
        }

        return invoice;
    } )

})

//invoice.getInvoices();
//console.log(invoice.invoiceData);


</script>