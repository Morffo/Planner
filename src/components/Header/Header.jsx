import "./Header.css";
import { useContext } from "react";
import {ThemeContext} from "../../context"
export default function Header() {
    const {theme, toggleTheme} = useContext(ThemeContext)
    return (
        <div className={theme==="dark"? "app-header" : "dark"}>
            <div className="app-title">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="header-icon"
                >
                    <path d="M3 3h18v18H3z"></path>
                    <path d="M3 9h18M9 9v12"></path>
                </svg>
                <span className="header-text">Планер</span>
            </div>
            <div className="app-controls">
                <button className="btn">Экспорт</button>
                <button className="btn btn-primary">Синхронизировать</button>
            </div>
        </div>
    )
}