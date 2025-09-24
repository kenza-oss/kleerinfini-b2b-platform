// UploadDocumentForm.jsx
import React, { useCallback, useState } from 'react';

const UploadDocumentForm = ({ documents, setDocuments }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleFiles = (files) => {
    const newDocuments = files.map((file, index) => ({
      id: documents.length + index + 1,
      name: file.name,
      type: 'document',
      date: new Date().toLocaleDateString(),
      status: 'pending'
    }));
    
    setDocuments([...documents, ...newDocuments]);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Approuvé</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">En attente</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Rejeté</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Inconnu</span>;
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'certificate':
        return '📑';
      case 'analysis':
        return '📊';
      case 'contract':
        return '📝';
      default:
        return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Zone */}
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragging ? 'border-image-orange bg-image-orange/10' : 'border-image-orange/50'
        }`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-4xl mb-4">📁</div>
        <p className="text-image-dark-text mb-2">Glissez-déposez vos fichiers ici ou</p>
        <label htmlFor="file-upload" className="cursor-pointer bg-image-orange text-white px-4 py-2 rounded-lg hover:bg-image-dark-orange transition-colors inline-block">
          Parcourir les fichiers
        </label>
        <input 
          id="file-upload" 
          type="file" 
          multiple 
          className="hidden" 
          onChange={handleFileInput}
        />
        <p className="text-image-dark-text/60 text-sm mt-2">Formats supportés: PDF, JPG, PNG, DOCX (max 10MB)</p>
      </div>

      {/* Documents List */}
      <div>
        <h3 className="font-semibold text-image-dark-text mb-4">Documents téléchargés</h3>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-image-orange/20">
              <div className="flex items-center gap-3">
                <span className="text-xl">{getTypeIcon(doc.type)}</span>
                <div>
                  <div className="font-medium text-image-dark-text">{doc.name}</div>
                  <div className="text-xs text-image-dark-text/50">Ajouté le {doc.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(doc.status)}
                <button className="text-image-orange hover:text-image-dark-orange text-sm font-medium">Télécharger</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentForm;