import React, { useContext, useEffect, useState } from 'react';
import { Documents } from '../type';
import File from '../File/File';
import './DocumentSearch.css';

function DocumentSearch() {
  const [documents, setDocuments] = useState<Documents[]>([]);
  const [props, setProps] = useState<Documents>();
  const [id, setId] = useState();
console.log(id)

  useEffect(() => {
    fetch('http://68.183.212.124:3000/user/docs')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Произошла ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Данные с сервера:', data);
        setDocuments(data);
      })
      .catch((error) => {
        console.error('Произошла ошибка:', error);
      });
  }, []);

  function handleFileClickInParent(document: Documents) {
    console.log('Кликнули на карточке с данными:', document);
    setProps(document);
  }

  function handleDelete() {
    if (props) {
      const updatedDocuments = documents.filter(
        (document) => document.id !== props.id
      );
      setDocuments(updatedDocuments);
      setProps(undefined);
    }
  }

  function handleDownload() {
    const textContent = `${props?.image} ${props?.name}
    Описание:
    ${props?.description}
    `;
    const blob = new Blob([textContent], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'MyApp.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  const handleSearch:React.ChangeEventHandler<HTMLInputElement> = (event:any):void => {
    event.preventDefault()
    setId(event.target.value)
  }

  const doc = documents.slice(0, 4);

  return (
    <>
      <div className="search">
        <h4>Поиск документа</h4>
        <input
          type="text"
          placeholder="Введите ID документа"
          onChange={(e)=>handleSearch(e)}
        />
        <h4>Результаты</h4>

        {  doc.map((document: Documents) => (
          <File
            document={document}
            onFileClick={handleFileClickInParent}
            key={document.id}
          />
        ))}
      </div>
      {props ? (
        <>
          <div className="info_document_img">
            <img src={props.image} alt="" />
          </div>
          <div className="info_document_blok_description">
            <h2>{props.name}</h2>
            <div>
              <button className="info_document_btn1" onClick={handleDownload}>
                Скачать
              </button>
              <button className="info_document_btn2" onClick={handleDelete}>
                Удалить
              </button>
            </div>
            <h2>Описание:</h2>
            <div className="info_document_description">{props.description}</div>
          </div>
        </>
      ) : (
        <div className="text">
          <p>Выберите документ, чтобы посмотреть его содержиое</p>{' '}
        </div>
      )}
    </>
  );
}

export default DocumentSearch;
