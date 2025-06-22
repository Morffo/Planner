import { useState, useEffect } from 'react';
import axios from 'axios';
import './LearningPage.css';

const LearningPage = () => {
  const [learningData, setLearningData] = useState({
    progress: 0,
    currentCourse: '',
    hoursStudied: 0,
    goals: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    const fetchLearningData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/learning');
        setLearningData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Ошибка загрузки данных');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLearningData();
  }, []);

  const addLearningGoal = async () => {
    if (!newGoal.trim()) return;
    
    try {
      setIsLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/learning/goals', {
        text: newGoal
      });
      
      setLearningData(prev => ({
        ...prev,
        goals: [...prev.goals, response.data]
      }));
      setNewGoal('');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка добавления цели');
    } finally {
      setIsLoading(false);
    }
  };

  const completeGoal = async (goalId) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/learning/goals/${goalId}`, {
        completed: true
      });
      
      setLearningData(prev => ({
        ...prev,
        goals: prev.goals.map(goal => 
          goal.id === goalId ? { ...goal, completed: true } : goal
        )
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка обновления цели');
    }
  };

  return (
    <div className="learning-container">
      {/* Заголовок страницы */}
      <header className="learning-header">
        <h1>Мой прогресс в обучении</h1>
        <p>Отслеживайте свои успехи и достижения</p>
      </header>

      {/* Блок с основной статистикой */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <h3>Общий прогресс</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${learningData.progress}%` }}
            ></div>
          </div>
          <span className="stat-value">{learningData.progress}%</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <h3>Текущий курс</h3>
          <p className="stat-value">
            {learningData.currentCourse || 'Не выбран'}
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <h3>Часов изучено</h3>
          <p className="stat-value">
            {learningData.hoursStudied} часов
          </p>
        </div>
      </div>

      {/* Блок целей обучения */}
      <section className="goals-section">
        <div className="section-header">
          <h2>Мои учебные цели</h2>
          <div className="input-group">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Добавить новую цель..."
              disabled={isLoading}
            />
            <button 
              onClick={addLearningGoal}
              disabled={isLoading || !newGoal.trim()}
            >
              {isLoading ? 'Добавление...' : 'Добавить'}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <ul className="goals-list">
          {learningData.goals.map(goal => (
            <li key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
              <label>
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => !goal.completed && completeGoal(goal.id)}
                  disabled={goal.completed || isLoading}
                />
                <span>{goal.text}</span>
              </label>
              {goal.completed && (
                <span className="completed-badge">Выполнено</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Блок последних достижений */}
      <section className="achievements-section">
        <h2>Последние достижения</h2>
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-icon">🏆</div>
            <h3>Завершил курс React</h3>
            <p>15 октября 2023</p>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">🎯</div>
            <h3>100 часов кодинга</h3>
            <p>1 ноября 2023</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningPage;