import React, { useState } from 'react';
import { FileProps } from '../types/type';
import style from './style.module.css';

function File(props: FileProps) {
  const { document, onFileClick } = props;
  const [click, setClick] = useState(false);

  function handleFileClick() {
    setClick(!click);
    onFileClick(document);
  }

  return (
    <div className={style.contsiner_file} onClick={handleFileClick}>
      <div>
        <img className={style.contsiner_file_img} src={props.document.image} alt="" />
      </div>
      <div className={style.document_name}>
        <p className={style.document_name_text_1}>{props.document.name}</p>
        <p className={style.document_name_text_2}>12 MB</p>
      </div>
    </div>
  );
}

export default File;
