import { defineStore } from 'pinia'

import { collection, getDocs } from "firebase/firestore";
const nuxtApp = useNuxtApp();

export const useInvoiceStore = defineStore('invoice' , {
    state: () => ({
        invoiceData: [],
        invoiceModal: null,
        modalActive: null,
        currentInvoice: null,
        editCurrentInvoice: null,
    }),

    getters: {},

    actions: {
        toggleInvoice() {
            this.invoiceModal = !this.invoiceModal;
        },

        toggleModal() {
            this.modalActive = !this.modalActive;
        },

        async getInvoices() {
            const querySnapshot = await getDocs(collection(nuxtApp.$db, 'invoices'));
            querySnapshot.forEach((doc) => {

                if ( !this.invoiceData.some( (invoice) => invoice.docId === doc.id) ) {
                    this.invoiceData.push({
                        docId: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        date: doc.data().date,
                    });
                }

                //console.log(this.invoiceData);
            });
        },

        detailInvoice(id) {
            return this.currentInvoice = this.invoiceData.filter( (invoice) => invoice.docId === id );
        },

        editInvoice() {
            this.editCurrentInvoice = !this.editCurrentInvoice;
        },

        deleteInvoice(id) {
            this.invoiceData = this.invoiceData.filter( (invoice) => invoice.docId !== id );
        },

        //async updateInvoice() {}
    }
})