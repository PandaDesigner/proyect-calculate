import {CalculatorComponents} from "./components/calculator/CalculatorComponents.tsx";

function App() {


  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen p-4"
        >
          <h1 className="text-6xl font-bold">Vite + React</h1>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
            <CalculatorComponents />
        </div>
    </>
  )
}

export default App
