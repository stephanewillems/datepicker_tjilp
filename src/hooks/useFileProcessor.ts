import { useEffect } from 'react';
import * as XLSX from 'xlsx';
import { DataRow } from '../components/map/marker/panel/BulkUpload/ColumnMapComp';

// Defining the type for the function's parameters
interface UseFileProcessorProps {
  file: File | null;
  delimiter: string;
  setData: (data: DataRow[]) => void;
  setRawData: (data: DataRow[]) => void;
  setFileType: (fileType: string) => void;
  headerIncluded: boolean;
}

// The custom hook
const useFileProcessor = ({ file, delimiter, setData, setRawData, setFileType, headerIncluded }: UseFileProcessorProps) => {

  useEffect(() => {
    if (!file) return; // Early return if no file is provided

    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (!result) return;

      const fileType = file.name.split('.').pop()?.toLowerCase() || '';
      let jsonData: string[][] = [];

      if (fileType === 'csv') {
        setFileType('csv');
        const dataString = new TextDecoder().decode(result as ArrayBuffer);
        const workbook = XLSX.read(dataString, { type: 'string', FS: delimiter });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: '' });
      } else if (fileType === 'xlsx' || fileType === 'xls') {
        setFileType('excel');
        const workbook = XLSX.read(result, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: '' });
      } else {
        setFileType('unknown');
        setData([]);
        setRawData([]);
        return;
      }


      if (jsonData.length > 1) {
        let columnNames: string[];
        if (!headerIncluded) {
          columnNames = jsonData[0].map((name: any, index: number) => {
            return name === undefined || name === 'null' || name === 'Blank' || name === '' ? `Default ${index}` : name;
          });
          jsonData = jsonData.slice(1); // Remove the header row for further processing
        } else {
          columnNames = Array.from({ length: jsonData[0].length }, (_, index) => `Column ${index + 1}`);
        }

        const transformedData = jsonData.slice(0).map((row: any) => {
          const rowObj: DataRow = {};
          columnNames.forEach((columnName, index) => {
            // if undefined or null, set to empty string
            rowObj[columnName] = row[index] === undefined || row[index] === null ? '' : row[index];
          });
          return rowObj;
        });
        setData(transformedData);
        setRawData(transformedData);
      } else {
        setData([]);
        setRawData([]);
      }
    };

    reader.readAsArrayBuffer(file);

    // Cleanup function
    return () => reader.abort();
  }, [file, delimiter, setData, setRawData, headerIncluded]);
};

export default useFileProcessor;
