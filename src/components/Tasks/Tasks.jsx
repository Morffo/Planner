import "./Tasks.css"
import Task from "../Task/Task"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Tasks() {
    const [data, setData] = useState([])
    const [currentTask, setCurrentTask] = useState(0)
    const [taskName, setTaskName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName.trim()) { // Проверка на пустую строку
          createItem(taskName);
          setTaskName(""); // Очищаем поле после добавления
        }
      };

    function handleTask(e) {
        setTaskName(e.target.value);
    }
    function handleClick(index) {
        setCurrentTask(index)
        console.log(index)
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/tasks');
            setData(response.data);
            console.log(response.data)
          } catch (error) {
            console.error('Ошибка:', error);
          }
        };
      
        fetchData();
      }, []);

      const deleteItem = async (title) => {
        try {
          await fetch(`http://127.0.0.1:8000/tasks/${title}`, {
            method: 'DELETE',
          });
          console.log('Удалено успешно');
          const response = await axios.get('http://127.0.0.1:8000/tasks');
          setData(response.data);
        } catch (error) {
          console.error('Ошибка удаления:', error);
        }
      };
      const createItem = async (taskTitle) => {
        try {
            await fetch(`http://127.0.0.1:8000/tasks/${taskTitle}`, {
                method: 'POST'
            });
        console.log("Создано успешно");
        const response = await axios.get('http://127.0.0.1:8000/tasks');
        setData(response.data);
        }
        catch (error) {
            console.error('Ошибка удаления:', error)
        }
        }
      
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-title">Мои задачи</div>
                <button className="btn" style={{
    padding: "0.25rem 0.5rem",
    fontSize: "0.9rem"
  }}>+ Категория</button>
            </div>

            <form className="task-form" onSubmit={handleSubmit}>
                <input type="text" className="task-input" placeholder="Добавить задачу..." required value={taskName} onChange={handleTask}/>
                <button className="add-task-btn">+</button>
            </form>

            <div className="task-filter">
                <button className="filter-btn active">Все</button>
                <button className="filter-btn">Сегодня</button>
                <button className="filter-btn">Важные</button>
            </div>

            <ul className="task-list">
 {data.map((task, index) => (
  <Task 
    title={task.title} // Используем реальное свойство из данных
    position={index + 1} // Если нужно показать порядковый номер
    key={task.id || index}
    onClick={() => {handleClick(index)}}
    isActive = {currentTask === index}
    onClickDelete={() => {deleteItem(task.title)}} // Лучше использовать task.id, если есть

  />
))}
                
            </ul>

            <div className="task-stats">
                Выполнено: <span id="completed-count">1</span> из <span id="total-count">4</span>
            </div>
        </div>
    )
}