import "./Task.css"
export default function Task({onClick, onClickDelete, isActive, ...props}) {
    
    return (
        <>
        <li className={isActive ? "task-item active": "task-item"} onClick={onClick}>
                    <span className="task-priority priority-medium"></span>
                    <input type="checkbox" className="task-checkbox" />
                    <span className="task-text">{props.title}</span>
                    
                    <div className="task-actions">
                        <button className="task-action-btn">✎</button>
                        <button className="task-action-btn"onClick={onClickDelete}>✕</button>
                    </div>
                </li>
        </>
    )
}