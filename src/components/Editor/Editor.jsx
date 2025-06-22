import { useState, useRef, useEffect } from "react";
import "./Editor.css";
import { marked } from "marked";

export default function Editor({ title, contenter, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(contenter || "");
  const [originalContent, setOriginalContent] = useState(contenter || "");

  const editorRef = useRef(null);

  useEffect(() => {
    setContent(contenter || "");
    setOriginalContent(contenter || "");
  }, [contenter]);

  // Автофокус при переходе в режим редактирования
  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setOriginalContent(content);
    // Здесь можно добавить логику сохранения на сервер
    console.log("Содержимое сохранено:", content);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setContent(originalContent);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(content); // Вызываем функцию сохранения с новым контентом
  };

  const handleCancel = () => {
    setIsEditing(false);
    setContent(contenter);
  };

  return (
    <div className="main-content">
      <div className="note-header">
        <input
          type="text"
          className="note-title"
          placeholder="Название заметки"
          value={title}
          disabled
        />
      </div>

      <div className="toolbar">
        {/* Ваши кнопки форматирования */}
      </div>

      <div className="editor-wrapper">
        {isEditing ? (
          <textarea
            ref={editorRef}
            className="editor"
            value={content}
            onChange={(e) => {setContent(e.target.value)}}
          />
        ) : (
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: marked(content || "") }}
          />
        )}
      </div>

      <div className="editor-controls">
        {isEditing ? (
          <>
            <button 
              className="control-btn cancel-btn"
              onClick={handleCancelClick}
            >
              Отменить
            </button>
            <button 
              className="control-btn save-btn"
              onClick={handleSave}
            >
              Сохранить
            </button>
          </>
        ) : (
          <button 
            className="control-btn edit-btn"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
        )}
      </div>
    </div>
  );
}