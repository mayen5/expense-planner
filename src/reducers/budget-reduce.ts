import { v4 as uuidv4 } from 'uuid';
import { DraftExpense, Expense } from '../types/index';

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'hide-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-budget' }

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
}

export const initialBudgetState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: []
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialBudgetState,
    action: BudgetActions
): BudgetState => {
    switch (action.type) {
        case 'add-budget':
            return {
                ...state,
                budget: action.payload.budget
            }
        case 'show-modal':
            return {
                ...state,
                modal: true
            }
        case 'hide-modal':
            return {
                ...state,
                modal: false
            }
        case 'add-expense':
            const expense = createExpense(action.payload.expense)
            return {
                ...state,
                expenses: [ ...state.expenses, expense ],
                modal: false
            }
        case 'remove-budget':
            return { ...state, budget: 0 }
        default:
            return state
    }
}