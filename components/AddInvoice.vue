<template>
    <div class="fixed w-full h-full top-0 left-0 bg-black/70">

        <div class="absolute w-1/2 left-1/2 -translate-x-1/2 top-1/3 rounded-md border p-3 bg-white">

            <div class="text-center">
                <span v-if="!invoice.editCurrentInvoice">Add invoice</span>
                <span v-else>Edit invoice</span>
            </div>

            <form @submit.prevent="submitForm" class="mt-4">
                <div class="flex gap-3 items-center">
                    <div class="w-1/3">
                        <label class="block mb-2">Name</label>
                        <input type="text" class="w-full rounded-md border h-8 pl-2" v-model="name">
                    </div>

                    <div class="w-1/3">
                        <label class="block mb-2">E-mail</label>
                        <input type="text" class="w-full rounded-md border h-8 pl-2" v-model="email">
                    </div>

                    <div class="w-1/3">
                        <label class="block mb-2">Date</label>
                        <input type="text" class="w-full rounded-md border h-8 pl-2" v-model="date">
                    </div>
                </div>

                <div class="flex gap-3 mt-4">
                    <button type="button" @click="cancelInvoice" class="px-3 py-2 rounded-md rounded-md border w-full">Cancel</button>
                    <button type="submit" @click="addInvoice" v-if="!invoice.editCurrentInvoice" class="px-3 py-2 rounded-md text-white bg-indigo-700 w-full">Add</button>
                    <button type="submit" @click="updateInvoice(invoice.currentInvoice[0].docId)" v-else class="px-3 py-2 rounded-md text-white bg-indigo-700 w-full">Update</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script setup>
import { ref , onMounted } from 'vue';

const name = ref(null);
const email = ref(null);
const dateUnix = ref(null);
const date = ref(null);
const dateOptions = ref(
    {
        year: "numeric",
        month: "short",
        day: "numeric"
    }
)

onMounted(() => {

    if ( !invoice.editCurrentInvoice ) {
        dateUnix.value = Date.now();
        date.value = new Date(dateUnix.value).toLocaleDateString('en-us', dateOptions.value);
    }
    
    //console.log(date.value)

    if ( invoice.editCurrentInvoice ) {
        const editCurrentItem = invoice.currentInvoice[0];

        name.value = editCurrentItem.name;
        email.value = editCurrentItem.email;
        date.value = editCurrentItem.date;
        //console.log(invoice.currentInvoice[0]);
    }
})

import { useInvoiceStore } from '@/stores/invoice';
const invoice = useInvoiceStore();

const cancelInvoice = () => {
    invoice.toggleModal();
}

// Firebase
import { collection, addDoc , doc , updateDoc} from "firebase/firestore"; 

const nuxtApp = useNuxtApp();

// Add invoice
const addInvoice = async () => {

    try {
        const docRef = await addDoc(collection(nuxtApp.$db, 'invoices'), {
            name: name.value,
            email: email.value,
            date: date.value
        });
        console.log("Document written with ID: ", docRef.id);
        invoice.toggleInvoice();
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

// Update invoice
const updateInvoice = async (id) => {
    try {

        const docRef = doc(nuxtApp.$db , 'invoices' , id);

        await updateDoc(docRef , {
            name: name.value,
            email: email.value,
            date: date.value
        })

        console.log("Document updated:" , docRef.id);
        invoice.deleteInvoice(id);
        await invoice.getInvoices();
        invoice.toggleInvoice();
        invoice.editInvoice();
        invoice.detailInvoice(id);

    } catch (e) {
        console.error("Not updated" , e)
    }

}

</script>