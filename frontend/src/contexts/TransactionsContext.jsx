import axios from "axios";
import { create } from "zustand";
import useSettingsStore from "./SettingsContext";

const useTransactions = create((set) => ({
    transactions: [],
    overal: {
        summary: 0,
        income: 0,
        waste: 0,
        income_by_category: {},
        waste_by_category: {},
        sum_by_category: {},
    },
    isTransactionsLoading: true,
    loadTransactions: (token) => {
        const { selectedDate } = useSettingsStore.getState(); // it's a string
        const month = selectedDate.split("-")[1];
        const year = selectedDate.split("-")[0];

        let axiosCalls = 0;
        set({ isTransactionsLoading: true });
        axios.get(`${import.meta.env.VITE_API_URL}/transaction/read/all`, { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json", "accept": "application/json", } }).then((res) => {
            set({ transactions: res.data.transactions });
            axiosCalls++;
            if (axiosCalls === 2) {
                set({ isTransactionsLoading: false });
            }
        });
        const frm = `${year}-${month}-01`;
        const to = `${year}-${month}-${new Date(year, month, 0).getDate()}`;
        axios.post(`${import.meta.env.VITE_API_URL}/calculate/summary`, {
            frm,
            to
        }, { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json", "accept": "application/json", } }).then((res) => {
            set({ overal: { 
                summary: res.data.sum, 
                income: res.data.income, 
                waste: res.data.waste,
                income_by_category: res.data.income_by_category,
                waste_by_category: res.data.waste_by_category,
                sum_by_category: res.data.sum_by_category,
            } });
            axiosCalls++;
            if (axiosCalls === 2) {
                set({ isTransactionsLoading: false });
            }
        })
    }
    
}));

export default useTransactions;