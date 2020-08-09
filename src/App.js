import React from 'react';
import Navbar from './components/Navbar';
import Routes from './routes'
import './App.css';

let getInitialState = () => {
  const currentTheme = localStorage.getItem("currentTheme");
  return currentTheme || "light";
}
export const ThemeContext = React.createContext();
function App() {
  const [theme, setTheme] = React.useState(getInitialState());
  const handleThemeChange = () => {
    let updatedTheme;
    if (theme === 'light') {
      updatedTheme = 'dark';
    } else {
      updatedTheme = 'light';
    }
    setTheme(updatedTheme);
    localStorage.setItem("currentTheme",updatedTheme);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`body ${theme}`}>
        <Routes>
          <Navbar onThemeToggle={handleThemeChange}></Navbar>
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;