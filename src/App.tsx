import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import LoginPage from './components/LoginPage';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900`}>
      <Sidebar />
      <main className="flex-1 p-8">
        <TaskList />
      </main>
    </div>
  );
}

export default App;