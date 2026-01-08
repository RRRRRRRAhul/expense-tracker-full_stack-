import ExpenseCard from "./ExpenseCard";



const ExpenseList = ({ expenses = [] }) => {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpenseList;
