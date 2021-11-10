import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadStatus from '../common/UploadStatus';
import { getFileType } from './FileTypes';

const FileDownload = ({ file, file_ext, removeComp }) => {
  const [downloadInfo, setDownloadInfo] = useState({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0,
  });

  const closeDialog = (fileId) => {};

  useEffect(() => {
    const options = {
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;

        setDownloadInfo({
          progress: Math.floor((loaded * 100) / total),
          loaded,
          total,
          completed: false,
        });
      },
    };

    axios
      .get(file.url, {
        responseType: 'blob',
        ...options,
      })
      .then(function (response) {
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers['content-type'],
          })
        );

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();

        setDownloadInfo((info) => ({
          ...info,
          completed: true,
        }));

        // setTimeout(() => {
        //   closeDialog();
        // });

        setTimeout(() => {
          removeComp();
        }, 2000);
      });
  }, []);

  // const formatBytes = (bytes) =>
  //   `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <DownloadStatus
      key={file.id}
      filename={file.name}
      fileMetaData={getFileType(file?.name.split('.').pop())}
      progress={downloadInfo?.progress}
      // error={file.error ? file.error : undefined}
      error={false}
      status={downloadInfo.completed ? 'Completed' : 'Downloading...'}
      closeDialog={() => closeDialog(file.id)}
      file_ext={file_ext}
    />
  );
};

export default FileDownload;
