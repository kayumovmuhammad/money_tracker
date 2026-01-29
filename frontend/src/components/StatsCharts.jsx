import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography, Box } from '@mui/material';
import useTransactions from '../contexts/TransactionsContext';
import useSettingsStore from '../contexts/SettingsContext';

export default function StatsCharts() {
    const { overal, transactions } = useTransactions();
    const { selectedDate } = useSettingsStore();

    const transformData = (dataObj) => {
        if (!dataObj) return [];
        return Object.entries(dataObj).map(([key, value], index) => ({
            id: index,
            value: Math.abs(value),
            label: key,
        })).filter(item => item.value > 0);
    };

    const incomeData = transformData(overal.income_by_category);
    const expenseData = transformData(overal.waste_by_category);
    const summaryData = transformData(overal.sum_by_category);

    // --- Daily Trend Logic ---
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    const calculateDailyTrend = (type) => {
        if (!selectedDate) return [];
        
        const dateObj = new Date(selectedDate);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth(); // 0-indexed
        const daysInMonth = getDaysInMonth(year, month);
        
        // Initialize array for each day of the month (1 to daysInMonth)
        const dailyTotals = Array(daysInMonth).fill(0);

        // Filter transactions based on the requested type
        const filteredTransactions = transactions.filter(t => 
            type === 'expense' ? t.type !== 'income' : t.type === 'income'
        );

        filteredTransactions.forEach(t => {
            const amount = Math.abs(t.money_amount);
            
            if (t.payment_type === 'daily') {
                for (let i = 0; i < daysInMonth; i++) {
                    dailyTotals[i] += amount;
                }
            } else if (t.payment_type === 'weekly') {
                const targetDayOfWeek = parseInt(t.day); // 0 = Mon, 6 = Sun
                
                for (let day = 1; day <= daysInMonth; day++) {
                    const currentDayDate = new Date(year, month, day);
                    let jsDay = currentDayDate.getDay(); 
                    let normalizedDay = jsDay === 0 ? 6 : jsDay - 1;

                    if (normalizedDay === targetDayOfWeek) {
                        dailyTotals[day - 1] += amount;
                    }
                }
            } else if (t.payment_type === 'monthly') {
                 const dayOfMonth = parseInt(t.day);
                 if (dayOfMonth >= 1 && dayOfMonth <= daysInMonth) {
                     dailyTotals[dayOfMonth - 1] += amount;
                 }
            } else if (t.payment_type === 'annual') {
                const [m, d] = t.day.split('-').map(Number);
                if (m === month + 1 && d >= 1 && d <= daysInMonth) {
                    dailyTotals[d - 1] += amount;
                }
            } else if (t.payment_type === 'once') {
                const [y, m, d] = t.day.split('-').map(Number);
                if (y === year && m === month + 1 && d >= 1 && d <= daysInMonth) {
                    dailyTotals[d - 1] += amount;
                }
            }
        });

        return dailyTotals.map((amount, index) => ({
            day: index + 1,
            amount: amount 
        }));
    };

    const dailyExpensesData = calculateDailyTrend('expense');
    const dailyIncomeData = calculateDailyTrend('income');
    
    // Check if there is ANY data
    const hasAnyDailyData = dailyExpensesData.some(d => d.amount > 0) || dailyIncomeData.some(d => d.amount > 0);

    const hasIncome = incomeData.length > 0;
    const hasExpenses = expenseData.length > 0;
    const hasSummary = summaryData.length > 0;

    if (!hasIncome && !hasExpenses && !hasSummary && !hasAnyDailyData) {
        return null;
    }

    const ChartCard = ({ title, children, className }) => (
        <Card sx={{ 
            height: '100%', 
            borderRadius: '16px', 
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            backgroundColor: '#ffffff'
        }} className={className}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', height: 200, width: '100%' }}>
                    {children}
                </Box>
            </CardContent>
        </Card>
    );

    const PieChartContent = ({ data }) => (
        data.length > 0 ? (
            <PieChart
                series={[
                    {
                        data: data,
                        innerRadius: 30,
                        paddingAngle: 0,
                        cornerRadius: 0,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                ]}
                height={200}
                margin={{ right: 5 }}
                slotProps={{
                    legend: { hidden: true } 
                }}
                skipAnimation
            />
        ) : (
            <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                No data available
            </Typography>
        )
    );

    return (
        <div className="flex flex-col gap-5 mb-7.5 w-full">
            {/* Pie Charts Row */}
            <div className="flex gap-5 w-full flex-wrap">
                { summaryData.length > 0 && 
                    <ChartCard className="flex-1 min-w-[300px]" title="Balance Overview">
                        <PieChartContent data={summaryData} />
                    </ChartCard>
                }
                { incomeData.length > 0 && 
                    <ChartCard className="flex-1 min-w-[300px]" title="Income by Category">
                         <PieChartContent data={incomeData} />
                    </ChartCard>
                }
                { expenseData.length > 0 && 
                    <ChartCard className="flex-1 min-w-[300px]" title="Expenses by Category">
                         <PieChartContent data={expenseData} />
                    </ChartCard>
                }
            </div>

            {/* Line Chart Row */}
            {hasAnyDailyData && (
                <Card sx={{ 
                    width: '100%',
                    borderRadius: '16px', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#ffffff',
                    p: 2
                }}>
                    <div className="mb-4 pl-2">
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            Daily Income & Expenses - {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </Typography>
                    </div>
                    
                    <div className="w-full h-[300px]">
                        <LineChart
                            xAxis={[{ 
                                data: dailyExpensesData.map(d => d.day),
                                label: 'Day of Month',
                                valueFormatter: (v) => `Day ${v}`
                            }]}
                            series={[
                                {
                                    data: dailyExpensesData.map(d => d.amount),
                                    label: 'Expenses',
                                    area: true,
                                    color: '#ef4444', 
                                    showMark: false,
                                },
                                {
                                    data: dailyIncomeData.map(d => d.amount),
                                    label: 'Income',
                                    area: true,
                                    color: '#10b981',
                                    showMark: false,
                                },
                            ]}
                             slotProps={{
                                legend: { 
                                    direction: 'row',
                                    position: { vertical: 'top', horizontal: 'right' },
                                    padding: 0,
                                } 
                            }}
                            margin={{ left: 50, right: 20, top: 20, bottom: 30 }}
                        />
                    </div>
                </Card>
            )}
        </div>
    );
}
