export const FILE_ICONS = [
   {
      ext: ['txt', 'doc', 'docx', 'pdf', 'pptx', 'ppt'],
      path: '/static/folder/txt_file.png',
      type: 'document',
   },
   {
      ext: ['png', 'svg', 'jpg', 'jpeg', 'webp'],
      path: '/static/folder/image_file.png',
      type: 'image',
   },
];

export const FOLDER_ICONS = [
   {
      type: 'folder-filled',
      path: '/static/folder/filled_container.png',
   },
   {
      type: 'folder-empty',
      path: '/static/folder/empty_folder.png',
   },
];

export const getFileIcon = (t) =>
   FILE_ICONS.find((f) => f.ext.includes(t)).path;

export const getFileType = (e) =>
   FILE_ICONS.find((f) => f.ext.includes(e)).type;

export const extFilenamewoExt = (name) => name.split('.')[0];
