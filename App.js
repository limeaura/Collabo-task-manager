import React, { useState } from 'react'; 
import AuthForm from './components/AuthForm';
import TaskManager from './components/TaskManager';
import TeamDashboard from './components/TeamDashboard';
import TaskChat from './components/TaskChat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState('taskManager'); 

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />

      {!isAuthenticated ? (
        <AuthForm onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <>
        
          <div className="d-flex justify-content-center mb-4 gap-2 flex-wrap">
            <button
              className={`btn ${activeScreen === 'taskManager' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveScreen('taskManager')}
            >
              Task Manager
            </button>
            <button
              className={`btn ${activeScreen === 'taskChat' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveScreen('taskChat')}
            >
              Task Chat
            </button>
            <button
              className={`btn ${activeScreen === 'teamDashboard' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveScreen('teamDashboard')}
            >
              Team Dashboard
            </button>
          </div>

          {activeScreen === 'taskManager' && <TaskManager />}
          {activeScreen === 'taskChat' && <TaskChat />}
          {activeScreen === 'teamDashboard' && <TeamDashboard />}
        </>
      )}
    </div>
  );
}

export default App;
