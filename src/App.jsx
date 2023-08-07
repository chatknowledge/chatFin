import './App.css'
import { GlobalProvider } from './components/globalContext'
import Header from './components/header'
import Pages from './components/pages'
import Chat from './pages/chat'
import PDF from './pages/pdf'

function App() {
    return (
        <GlobalProvider>
            <Header></Header>
            <Pages>
                <Chat></Chat>
                <PDF></PDF>
            </Pages>
        </GlobalProvider>
    )
}

export default App
