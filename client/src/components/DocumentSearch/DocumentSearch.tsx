import React, { useContext, useEffect, useState } from 'react';
import { Documents } from '../types/type';
import File from '../File/File';
import style from './style.module.css';

function DocumentSearch() {
  const [documents, setDocuments] = useState<Documents[]>([]);
  const [documentProps, setDocumentProps] = useState<Documents>();
  const [documentId, setDocumentId] = useState<string | undefined>();

  const result = documents.slice(0, 4);

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
    setDocumentProps(document);
  }

  function handleDelete() {
    if (documentProps) {
      const updatedDocuments = documents.filter(
        (document) => document.id !== documentProps.id
      );
      setDocuments(updatedDocuments);
      setDocumentProps(undefined);
    }
  }

  function handleDownload() {
    const textContent = `${documentProps?.image} ${documentProps?.name}
    Описание:
    ${documentProps?.description}
    `;
    const blob = new Blob([textContent], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'MyApp.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (
    event: any
  ) => {
    event.preventDefault();
    setDocumentId(event.target.value);
  };

  return (
    <>
      <div className={style.search}>
        <h4>Поиск документа</h4>
        <input
          type="text"
          placeholder="Введите ID документа"
          onChange={(e) => handleSearch(e)}
        />
        <h4>Результаты</h4>
        {!documentId
          ? result.map((document: Documents) => (
              <File
                document={document}
                onFileClick={handleFileClickInParent}
                key={document.id}
              />
            ))
          : documents
              .filter((el) => el.id === Number(documentId))
              .map((document: Documents) => (
                <File
                  document={document}
                  onFileClick={handleFileClickInParent}
                  key={document.id}
                />
              ))}
      </div>
      {documentProps ? (
        <>
          <div className={style.info_document_img}>
            <img src={documentProps.image} alt="" />
          </div>
          <div className={style.info_document_blok_description}>
            <h2>{documentProps.name}</h2>
            <div>
              <button className={style.info_document_btn1} onClick={handleDownload}>
                Скачать
              </button>
              <button className={style.info_document_btn2} onClick={handleDelete}>
                Удалить
              </button>
            </div>
            <h2>Описание:</h2>
            <div className={style.info_document_description}>
              {documentProps.description}
            </div>
          </div>
        </>
      ) : (
        <div className={style.text}>
          <p>Выберите документ, чтобы посмотреть его содержиое</p>{' '}
        </div>
      )}
    </>
  );
}

export default DocumentSearch;
