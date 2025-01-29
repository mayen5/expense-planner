import { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { BudgetActions, budgetReducer, BudgetState, initialBudgetState } from '../reducers/budget-reduce'

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
}

type BudgerProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({
    state: initialBudgetState,
    dispatch: () => null
})

export const BudgetProvider = ({ children }: BudgerProviderProps) => {
    const [ state, dispatch ] = useReducer(budgetReducer, initialBudgetState)

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}