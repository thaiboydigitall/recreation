import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { createContext } from 'react'
import UserStore from './stores/UserStore.ts'

type ContextStoreType = {
  user : UserStore
}

export const Context = createContext<ContextStoreType | null>(null);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{
    user : new UserStore()
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>

)
