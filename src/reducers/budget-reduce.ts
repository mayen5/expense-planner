export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'remove-budget' }

export type BudgetState = {
    budget: number
}

export const initialBudgetState: BudgetState = {
    budget: 0
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
        case 'remove-budget':
            return { ...state, budget: 0 }
        default:
            return state
    }
}