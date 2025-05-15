import './App.css'
import Footer from "./components/Footer.tsx";
import Converter from "./components/Converter.tsx";
import Header from "./components/Header.tsx";
import { ThemeProvider } from './context/ThemeContext.tsx';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Converter />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default App
