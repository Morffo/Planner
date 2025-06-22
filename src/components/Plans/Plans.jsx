import Editor from "../Editor/Editor"
import "./Plans.css"
import ReactModal from "react-modal"
import { useEffect, useState } from "react"
import Plan from "../Plan/Plan"
import {plans} from "../../data"
import axios from "axios"
export default function Plans() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState(0)
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/plans');
            setData(response.data);
            console.log(response.data)
          } catch (error) {
            console.error('Ошибка:', error);
          }
        };
      
        fetchData();
      }, []);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: ''
      });
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/plans', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer YOUR_TOKEN' // Для авторизации
              },
              body: JSON.stringify(formData)
            });
            console.log("Success!")
      }
      catch(error) {
        console.log(error)
      }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        console.log(formData)
    }

    function handleModal() {
        console.log(isModalOpen)

        setIsModalOpen(!isModalOpen)
    }
    function handlePlan(index) {
        setSelectedPlan(index)
        console.log(selectedPlan)
    }

    const handleChangeEditor = (e) => {
        const value = e.target.value
        setFormData(prev => ({
            ...prev,
            ['content']: value
        }))
    }

    const handleUpdatePlanContent = async (newContent) => {
        try {
          const currentPlan = data[selectedPlan];
          
          if (!currentPlan?.title) {
            throw new Error("Нельзя обновить план без title");
          }
      
          const response = await axios.put(
            'http://127.0.0.1:8000/plans/update-content',
            { content: newContent },  // Только поле content
            {
              headers: {
                'X-Plan-Title': currentPlan.title,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
          );
      
          // Обновляем локальное состояние
          const updatedData = data.map(plan => 
            plan.title === currentPlan.title 
              ? { ...plan, content: newContent } 
              : plan
          );
          setData(updatedData);
      
          console.log("Успешное обновление:", response.data);
        } catch (error) {
          console.error("Детали ошибки:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
          });
          alert(`Ошибка обновления: ${error.response?.data?.detail || error.message}`);
        }
      };
      
    return (
        <>
  <ReactModal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  contentLabel="Добавление нового плана"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(3px)'
    },
    content: {
      position: 'relative',
      width: '90%',
      maxWidth: '480px',
      margin: '0 auto',
      padding: '2rem',
      borderRadius: '12px',
      border: 'none',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'white',
      inset: 'auto',
    }
  }}
>
  <button 
    onClick={() => setIsModalOpen(false)}
    style={{
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      color: '#868e96',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    }}
    onMouseOver={(e) => {
      e.currentTarget.backgroundColor = '#f1f3f5';
      e.currentTarget.color = '#495057';
    }}
    onMouseOut={(e) => {
      e.currentTarget.backgroundColor = 'transparent';
      e.currentTarget.color = '#868e96';
    }}
  >
    &times;
  </button>

  <div style={{ padding: '0.5rem' }}>
    <h2 style={{
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#212529',
      marginBottom: '1.75rem',
      textAlign: 'center',
      paddingRight: '20px' // Для кнопки закрытия
    }}>
      Создать новый план
    </h2>
    
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label 
          htmlFor="plan-title"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            color: '#495057',
            marginBottom: '0.75rem',
            fontWeight: 500
          }}
        >
          Название плана *
        </label>
        <input
          type="text"
          id="plan-title"
          required
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '0.95rem',
            transition: 'all 0.2s',
            backgroundColor: '#f8f9fa'
          }}
          placeholder="Например: Изучение React"
          onFocus={(e) => {
            e.target.style.borderColor = '#4263eb';
            e.target.style.backgroundColor = 'white';
            e.target.style.boxShadow = '0 0 0 2px rgba(66, 99, 235, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e9ecef';
            e.target.style.backgroundColor = '#f8f9fa';
            e.target.style.boxShadow = 'none';
          }}
          name="title"
          onChange={handleChange}
          value={formData.title}
        />
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label 
          htmlFor="plan-date"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            color: '#495057',
            marginBottom: '0.75rem',
            fontWeight: 500
          }}
        >
        </label>
        {/* <input
          type="date"
          id="plan-date"
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '0.95rem',
            transition: 'all 0.2s',
            backgroundColor: '#f8f9fa',
            appearance: 'none'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#4263eb';
            e.target.style.backgroundColor = 'white';
            e.target.style.boxShadow = '0 0 0 2px rgba(66, 99, 235, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e9ecef';
            e.target.style.backgroundColor = '#f8f9fa';
            e.target.style.boxShadow = 'none';
          }}
        /> */}
      </div>
      
      <div style={{ marginBottom: '1.75rem' }}>
        <label 
          htmlFor="plan-description"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            color: '#495057',
            marginBottom: '0.75rem',
            fontWeight: 500
          }}
        >
          Подробное описание
        </label>
        <textarea
          id="plan-description"
          rows={4}
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '0.95rem',
            resize: 'vertical',
            minHeight: '120px',
            transition: 'all 0.2s',
            backgroundColor: '#f8f9fa'
          }}
          placeholder="Опишите детали вашего плана..."
          onFocus={(e) => {
            e.target.style.borderColor = '#4263eb';
            e.target.style.backgroundColor = 'white';
            e.target.style.boxShadow = '0 0 0 2px rgba(66, 99, 235, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e9ecef';
            e.target.style.backgroundColor = '#f8f9fa';
            e.target.style.boxShadow = 'none';
          }}
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2rem'
      }}>
        <div style={{ fontSize: '0.8rem', color: '#868e96' }}>
          * Обязательное поле
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              color: '#495057',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.backgroundColor = '#f8f9fa';
              e.currentTarget.borderColor = '#dee2e6';
            }}
            onMouseOut={(e) => {
              e.currentTarget.backgroundColor = 'transparent';
              e.currentTarget.borderColor = '#e9ecef';
            }}
          >
            Отменить
          </button>
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.75rem',
              backgroundColor: '#4263eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(66, 99, 235, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.backgroundColor = '#3a56d0';
              e.currentTarget.boxShadow = '0 4px 12px rgba(66, 99, 235, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.backgroundColor = '#4263eb';
              e.currentTarget.boxShadow = '0 2px 8px rgba(66, 99, 235, 0.3)';
            }}
          >
            Сохранить план
          </button>
        </div>
      </div>
    </form>
  </div>
</ReactModal>
    <div className="plans-container">
        <div className="plans-header">
            <div className="search-bar">
                <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input type="text" className="search-input" placeholder="Поиск планов..." />
            </div>
            <button className="add-plan-btn" onClick={() => handleModal()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Новый план
            </button>
        </div>

        <div className="plans-grid">
            {data.map((plan, index) => <Plan key={index} title={plan.title} description={plan.description} onClick={() => handlePlan(index)}/>)}
            {/* <Plan title="Повышение до Senior" /> */}
            <div className="plan-card">
                <span className="plan-category">Обучение</span>
                <h3 className="plan-title">Изучить TypeScript</h3>
                <p className="plan-description">Пройти продвинутый курс по TypeScript и применить знания в проектах</p>
                <div className="plan-date">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>до 30.09.2024</span>
                </div>
                <div className="plan-actions">
                    <button className="plan-btn edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4V11L16.5 23.5L23.5 16.5L11 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 7L21 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button className="plan-btn delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    </div>
{data.length > 0 && (
  <Editor 
    title={data[selectedPlan]?.title || ''} 
    contenter={data[selectedPlan]?.content || ''}
    onSave={handleUpdatePlanContent}
  />
)}    </>
)
}