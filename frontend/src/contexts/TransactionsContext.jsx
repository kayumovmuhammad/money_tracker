import axios from "axios";
import { create } from "zustand";

const useTransactions = create((set) => ({
    transactions: [],
    overal: {
        summary: 0,
        income: 0,
        waste: 0,
    },
    isTransactionsLoading: true,
    loadTransactions: (token) => {
        let axiosCalls = 0;
        set({ isTransactionsLoading: true });
        axios.get(`${import.meta.env.VITE_API_URL}/transaction/read/all`, { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json", "accept": "application/json", } }).then((res) => {
            console.log(res.data.transactions);
            set({ transactions: res.data.transactions });
            axiosCalls++;
            if (axiosCalls === 2) {
                set({ isTransactionsLoading: false });
            }
        });
        axios.get(`${import.meta.env.VITE_API_URL}/calculate/summary`, { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json", "accept": "application/json", } }).then((res) => {
            set({ overal: { summary: res.data.sum, income: res.data.income, waste: res.data.waste } });
            axiosCalls++;
            if (axiosCalls === 2) {
                set({ isTransactionsLoading: false });
            }
        })
    }
    
}));

export default useTransactions;