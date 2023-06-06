import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import jsPDF from 'jspdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class FileConverter extends React.Component {
  state = {
    inputFile: null,
    outputFile: null,
  };

  handleInputFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({ inputFile: file });
  };

  handleConversion = () => {
    const { inputFile } = this.state;
    const inputFileType = inputFile.name.split('.').pop().toLowerCase();

    if (inputFileType === 'pdf') {
      this.convertToPNG(inputFile);
    } else if (inputFileType === 'png') {
      this.convertToPDF(inputFile);
    }
  };

  convertToPNG = async (inputFile) => {
    const loadingTask = pdfjs.getDocument(URL.createObjectURL(inputFile));
    loadingTask.promise.then((pdf) => {
      pdf.getPage(1).then((page) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const viewport = page.getViewport({ scale: 1 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderTask = page.render({ canvasContext: context, viewport });
        renderTask.promise.then(() => {
          const pngDataUrl = canvas.toDataURL('image/png');
          this.setState({ outputFile: pngDataUrl });
        });
      });
    });
  };

  convertToPDF = () => {
    const { inputFile } = this.state;
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
  
        const pdfWidth = canvas.width;
        const pdfHeight = canvas.height;
  
        const pdf = new jsPDF({
          orientation: pdfWidth >= pdfHeight ? 'landscape' : 'portrait',
          unit: 'px',
          format: [pdfWidth, pdfHeight],
        });
  
        // Adjust image quality to reduce PDF size
        const imgData = canvas.toDataURL('image/jpeg', 0.6); // Set image quality to 60%
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  
        const outputData = pdf.output('datauristring');
        this.setState({ outputFile: outputData });
      };
    };
    reader.readAsDataURL(inputFile);
  };
  

  downloadOutputFile = () => {
    const { inputFile, outputFile } = this.state;
    const inputFileType = inputFile.name.split('.').pop().toLowerCase();
    const fileExtension = inputFileType === 'pdf' ? 'png' : 'pdf';
    const downloadLink = document.createElement('a');
    downloadLink.href = outputFile;
    downloadLink.download = `output.${fileExtension}`;
    downloadLink.click();
  };

  renderInputFileRequest = () => {
    const { inputFile } = this.state;
    if (!inputFile) {
      return (
        <div>
          <label htmlFor="inputFileInput">Select a file to convert:</label>
          <input id="inputFileInput" type="file" accept=".pdf,.png" onChange={this.handleInputFileChange} />
        </div>
      );
    }
    return null;
  };

  renderConversionButton = () => {
    const { inputFile } = this.state;
    const inputFileType = inputFile ? inputFile.name.split('.').pop().toLowerCase() : null;

    if (inputFileType === 'pdf') {
      return (
        <button disabled={!inputFile} onClick={this.handleConversion}>
          Convert to PNG
        </button>
      );
    } else if (inputFileType === 'png') {
      return (
        <button disabled={!inputFile} onClick={this.handleConversion}>
          Convert to PDF
        </button>
      );
    }

    return null;
  };

  renderOutputFilePreview = () => {
    const { outputFile } = this.state;

    if (outputFile) {
      const isPDF = outputFile.includes('data:application/pdf');

      return (
        <div>
          {isPDF ? (
            <Document file={outputFile}>
              <Page pageNumber={1} />
            </Document>
          ) : (
            <img id="pngImage" src={outputFile} alt="Output Preview" />
          )}
          <button onClick={this.downloadOutputFile}>Download Output</button>
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div>
        <h1>File Converter</h1>

        {this.renderInputFileRequest()}

        {this.renderConversionButton()}

        {this.renderOutputFilePreview()}
      </div>
    );
  }
}

export default FileConverter;
