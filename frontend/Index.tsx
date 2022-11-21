import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/login'
import App from './App';
import utilities from './tailwind.json'
import { TailwindProvider } from 'tailwind-rn';

const store = configureStore({
    reducer: {
      login: loginReducer
    }
  })
  
export type RootState = ReturnType<typeof store.getState>

export default function AppWrapper() {
    return (
        <Provider store={store}>
            {/* @ts-ignore */}
            <TailwindProvider utilities={utilities}>
                <App />
            </TailwindProvider>
        </Provider>
    )
}