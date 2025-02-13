import { ChangeEvent, FormEvent, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { categories } from '../data/categories'
import { DraftExpense, Value } from '../types/index';
import { ErrorMessage } from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';

export const ExpenseForm = () => {

    const [ expense, setExpense ] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [ error, setError ] = useState('')
    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        const isAmountField = [ 'amount' ].includes(name)
        setExpense({
            ...expense,
            [ name ]: isAmountField ? +value : value
        })
        return
    }

    const handleChangeDate = (date: Value) => {
        setExpense({
            ...expense,
            date
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(expense).includes('')) {
            setError('All fields are required')
            return
        }

        // Add expense
        dispatch({ type: 'add-expense', payload: { expense } })

        // Reset form
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='space-y-5'
        >
            <legend className='uppercase text-center text-2xl font-black border-b-2 border-blue-500 py-2'>
                New expense
            </legend>

            {
                error && <ErrorMessage> {error} </ErrorMessage>
            }

            <div className='flex flex-col gap-2'>
                <label
                    htmlFor="expenseName"
                    className='text-xl'
                >
                    Expense Name
                </label>
                <input
                    type="text"
                    id='expenseName'
                    placeholder='Add a Expense Name'
                    className='bg-slate-100 p-2 rounded-lg'
                    name='expenseName'
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label
                    htmlFor="amount"
                    className='text-xl'
                >
                    Quantity
                </label>
                <input
                    type="number"
                    id='amount'
                    placeholder='Add an Expense Quantity: Ex. 100'
                    className='bg-slate-100 p-2 rounded-lg'
                    name='amount'
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label
                    htmlFor="amount"
                    className='text-xl'
                >
                    Category
                </label>
                <select
                    id='category'
                    className='bg-slate-100 p-2 rounded-lg'
                    name='category'
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Select a category</option>
                    {
                        categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className='flex flex-col gap-2'>
                <label
                    htmlFor="expenseDate"
                    className='text-xl'
                >
                    Expense Date
                </label>
                <DatePicker
                    id='expenseDate'
                    className='bg-slate-100 p-2 border-0'
                    name='expenseDate'
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type='submit'
                className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
                value={'Add Expense'}
            />
        </form>
    )
}
