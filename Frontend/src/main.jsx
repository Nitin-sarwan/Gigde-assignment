import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './Services/Reducers/rootReducer.jsx'
const store=createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
    </BrowserRouter>
  </StrictMode>
)
