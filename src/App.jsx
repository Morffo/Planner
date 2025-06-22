import { useState } from 'react'
import Header from './components/Header/Header'
import Tasks from './components/Tasks/Tasks'
import Plans from "./components/Plans/Plans"
import Editor from './components/Editor/Editor'
import {Routes, Route} from "react-router-dom"
import LearningPage from './components/Learning/LearningPage'
import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState('tasks') // 'tasks' или 'plans'

  return (
 
    <>

      <Header />
      <Routes>
      <Route path="/edu" element={<LearningPage />} />
      <Route path="/" element = {

      <>
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Задачи
          </button>
          <button 
            className={`tab ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => setActiveTab('plans')}
          >
            Планы
          </button>
        </div>
      </div>

      <div className="app-container">
        {activeTab === 'tasks' ? <Tasks /> : <Plans />}
      </div>
      </> } />
      </Routes>
    </>
    
  )
}

export default App