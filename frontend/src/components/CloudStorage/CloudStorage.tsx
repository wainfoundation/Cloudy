import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { 
  CloudUpload as CloudUploadIcon,
  Folder as FolderIcon,
  InsertDriveFile as GenericFileIcon,
  Image as ImageIcon,
  Movie as VideoIcon,
  AudioFile as AudioIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { LinearProgress, IconButton, Tooltip } from '@mui/material';

const StorageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const StorageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const StorageStats = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const StorageBar = styled(LinearProgress)`
  height: 8px !important;
  border-radius: 4px;
  margin: 0.5rem 0;
`;

const StorageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #6b7280;
  font-size: 0.875rem;
`;

const DropzoneContainer = styled.div`
  border: 2px dashed #e5e7eb;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2rem;

  &:hover {
    border-color: #6366f1;
  }
`;

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const FileCard = styled(motion.div)`
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const FileIconBox = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto 0.5rem;
  color: #6366f1;
`;

const FileName = styled.div`
  font-size: 0.875rem;
  color: #1f2937;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const FileActions = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: none;
  ${FileCard}:hover & {
    display: flex;
  }
`;

const CloudStorage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Simulate file upload
    acceptedFiles.forEach(file => {
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
        
        if (progress >= 100) {
          clearInterval(interval);
          setFiles(prev => [...prev, file]);
        }
      }, 200);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.avi', '.mov'],
      'audio/*': ['.mp3', '.wav'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    }
  });

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon />;
    if (file.type.startsWith('video/')) return <VideoIcon />;
    if (file.type.startsWith('audio/')) return <AudioIcon />;
    return <GenericFileIcon />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalStorage = 10 * 1024 * 1024 * 1024; // 10GB
  const usedStorage = files.reduce((acc, file) => acc + file.size, 0);
  const usedPercentage = (usedStorage / totalStorage) * 100;

  return (
    <StorageContainer>
      <StorageHeader>
        <Title>Cloud Storage</Title>
        <StorageStats>
          <StorageBar 
            variant="determinate" 
            value={usedPercentage} 
            color={usedPercentage > 90 ? "error" : "primary"}
          />
          <StorageInfo>
            <span>{formatFileSize(usedStorage)} used</span>
            <span>{formatFileSize(totalStorage)} total</span>
          </StorageInfo>
        </StorageStats>

        <DropzoneContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <CloudUploadIcon style={{ fontSize: 48, color: '#6366f1', marginBottom: '1rem' }} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </DropzoneContainer>
      </StorageHeader>

      <FileGrid>
        {files.map((file, index) => (
          <FileCard
            key={file.name + index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FileIconBox>{getFileIcon(file)}</FileIconBox>
            <FileName>{file.name}</FileName>
            <FileSize>{formatFileSize(file.size)}</FileSize>
            <FileActions>
              <Tooltip title="Download">
                <IconButton size="small">
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton 
                  size="small"
                  onClick={() => setFiles(files.filter(f => f !== file))}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </FileActions>
            {uploadProgress[file.name] && uploadProgress[file.name] < 100 && (
              <LinearProgress 
                variant="determinate" 
                value={uploadProgress[file.name]} 
                style={{ marginTop: '0.5rem' }}
              />
            )}
          </FileCard>
        ))}
      </FileGrid>
    </StorageContainer>
  );
};

export default CloudStorage; 