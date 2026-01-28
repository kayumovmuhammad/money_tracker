import SummaryCard from "../components/SummaryCard";
import TransactionList from "../components/TransactionList";
import Button from "../ui-components/Button";
import useTransactions from "../contexts/TransactionsContext";
import DashboardSkeleton from "../components/DashboardSkeleton";
import useModalStore from "../contexts/ModalContext";

export default function Dashboard() {
    const { overal, isTransactionsLoading } = useTransactions();
    const { setAddModalOpen } = useModalStore();

    if (isTransactionsLoading) {
        return <DashboardSkeleton />
    }

    return <div className="flex-1 overflow-y-auto flex flex-col items-center">
        <div className="w-full max-w-250">
            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 mb-7.5">
                <SummaryCard
                    title="Total Balance"
                    amount={`$${overal.summary.toFixed(2)}`}
                    variant="main"
                />
                <SummaryCard
                    title="Income"
                    amount={`$${overal.income.toFixed(2)}`}
                    variant="income"
                />
                <SummaryCard
                    title="Expenses"
                    amount={`$${overal.waste.toFixed(2)}`}
                    variant="outcome"
                />
            </div>

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
            <TransactionList />
        </div>
    </div>;
}