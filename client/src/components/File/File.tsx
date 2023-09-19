import React, { useState } from 'react';
import { FileProps } from '../type';
import './File.css';



function File(props: FileProps) {
  const { document, onFileClick } = props;
  const [click, setClick] = useState(false);

  function handleFileClick() {
    setClick(!click);
    onFileClick(document); 
  }

  return (
    <div className="contsiner_file" onClick={handleFileClick}>
      <div>
        <img className="contsiner_file_img" src={props.document.image} alt="" />
      </div>
      <div className="document_name">
        <p className="document_name_text_1">{props.document.name}</p>
        <p className="document_name_text_2">12 MB</p>
      </div>
    </div>
  );
}

export default File;
