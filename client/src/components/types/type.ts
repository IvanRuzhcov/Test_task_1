 export type Documents = {
    id:number;
    name:string;
    description:string;
    image:string
    
 }
 export interface FileProps {
   document: Documents;
   onFileClick: (document: Documents) => void;
 }