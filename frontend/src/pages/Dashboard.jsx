import SummaryCard from "../components/SummaryCard";
import StatsCharts from "../components/StatsCharts";
import TransactionList from "../components/TransactionList";
import Button from "../ui-components/Button";
import useTransactions from "../contexts/TransactionsContext";
import DashboardSkeleton from "../components/DashboardSkeleton";
import useModalStore from "../contexts/ModalContext";
import useSettingsStore from "../contexts/SettingsContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useAuth from "../contexts/AuthContext";

export default function Dashboard() {
    const { overal, isTransactionsLoading, loadTransactions } = useTransactions();
    const { setAddModalOpen } = useModalStore();
    const { currency, selectedDate, setSelectedDate } = useSettingsStore();
    const { user } = useAuth();

    const currentDate = new Date(selectedDate);

    const handlePrevMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() - 1);
        setSelectedDate(newDate.toISOString());
        loadTransactions(user.accessToken);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth() + 1);
        setSelectedDate(newDate.toISOString());
        loadTransactions(user.accessToken);
    };

    const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    if (isTransactionsLoading) {
        return <DashboardSkeleton />
    }

    return <div className="flex-1 overflow-y-auto flex flex-col items-center">
        <div className="w-full max-w-250">
            <div className="flex justify-center items-center gap-4 mb-6 mt-4">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-surface rounded-full transition-colors cursor-pointer">
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold min-w-[200px] text-center">{formattedDate}</h2>
                <button onClick={handleNextMonth} className="p-2 hover:bg-surface rounded-full transition-colors cursor-pointer">
                    <ChevronRight size={24} />
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 mb-7.5">
                <SummaryCard
                    title="Total Balance"
                    amount={`${overal.summary.toFixed(2)} ${currency}`}
                    variant="main"
                />
                <SummaryCard
                    title="Income"
                    amount={`${overal.income.toFixed(2)} ${currency}`}
                    variant="income"
                />
                <SummaryCard
                    title="Expenses"
                    amount={`${overal.waste.toFixed(2)} ${currency}`}
                    variant="outcome"
                />
            </div>

            

            {/* Stats Charts */}
            <StatsCharts />

            {/* Transactions Header */}
            <div className="mb-5 flex justify-between items-center">
                <h3 className="font-extrabold text-xl">Recent Transactions</h3>
                <Button
                    variant="ghost"
                    onClick={() => setAddModalOpen(true)}
                    className="py-2 px-4 text-[0.8rem] font-semibold hover:text-primary"
                >
                    + New Task
                </Button>
            </div>

            {/* Transaction List */}
            <TransactionList className="mb-5" />

            
        </div>
    </div>;
}