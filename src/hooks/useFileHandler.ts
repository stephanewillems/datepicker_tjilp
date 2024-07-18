import { useState } from 'react';
import { getCreationDate } from '../lib/helpers/pdfMetaData/getCreationDate';

const useFileHandler = (initialFileName = 'No file selected') => {
  const [fileName, setFileName] = useState(initialFileName);
  const [file, setFile] = useState<File | null>(null);
  const [creationDate, setCreationDate] = useState<string | null>(null);
  const [isEncrypted, setIsEncrypted] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const { creationDate, isEncrypted, newFile } = await getCreationDate(file);
        setIsEncrypted(isEncrypted);
        setCreationDate(creationDate);

        if (newFile) {
          setFileName(newFile.name);
          setFile(newFile);
        } else {
          setFileName(file.name);
          setFile(file);
        }
      } catch (error) {
        console.error('Error fetching file metadata:', error);
        setFileName(initialFileName);
        setFile(null);
        setCreationDate(null);
        setIsEncrypted(false);
      }
    } else {
      setFileName(initialFileName);
      setFile(null);
      setCreationDate(null);
      setIsEncrypted(false);
    }
  };

  return { fileName, file, creationDate, isEncrypted, handleFileChange };
};

export default useFileHandler;
