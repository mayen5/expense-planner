import { AmountDisplay } from './AmountDisplay'


export const BudgetTracker = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='flex justify-center'>
                <img src="/graphic.jpg" alt="expense graphic" />
            </div>

            <div className='flex flex-col justify-center items-center gap-8'>
                <button
                    className='bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg'
                >
                    Reset App
                </button>

                <AmountDisplay
                    label={'Budget'}
                    amount={1000}
                />

                <AmountDisplay
                    label={'Available'}
                    amount={500}
                />

                <AmountDisplay
                    label={'Expenses'}
                    amount={500}
                />
            </div>
        </div>
    )
}
