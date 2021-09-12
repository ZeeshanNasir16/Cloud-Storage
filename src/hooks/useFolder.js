import { useReducer, useEffect } from 'react';
import { database } from '../firebase';
import { useAuth } from '../Context/AuthContext';

const ACTIONS = {
   SELECT_FOLDER: 'select-folder',
   UPDATE_FOLDER: 'update-folder',
   SET_CHILD_FOLDERS: 'set-child-folders',
   SET_CHILD_FILES: 'set-child-files',
};

export const ROOT_FOLDER = { name: 'Home', id: null, path: [] };

function reducer(state, { type, payload }) {
   switch (type) {
      case ACTIONS.SELECT_FOLDER:
         return {
            ...state,
            folderId: payload.folderId,
            folder: payload.folder,
         };

      case ACTIONS.UPDATE_FOLDER:
         return {
            ...state,
            folder: payload.folder,
         };

      case ACTIONS.SET_CHILD_FOLDERS:
         return {
            ...state,
            childFolders: payload.childFolders,
         };
      case ACTIONS.SET_CHILD_FILES:
         return {
            ...state,
            childFiles: payload.childFiles,
         };

      default:
         return state;
   }
}

// ! Null is passed because firebase does not really work well with undefined
// ! Undefined will throw us an error
export function useFolder(folderId = null, folder = null) {
   const { currentUser } = useAuth();

   const [state, dispatch] = useReducer(reducer, {
      folderId,
      folder,
      childFolders: null,
      childFiles: null,
   });

   // ? To change state on changing folderid or folder (selecting folder)
   useEffect(() => {
      dispatch({
         type: ACTIONS.SELECT_FOLDER,
         payload: { folderId, folder },
      });
   }, [folderId, folder]);

   useEffect(() => {
      //? If folder id is null, means if folder is root folder or folder created first
      if (folderId === null) {
         return dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: { folder: ROOT_FOLDER },
         });
      } else {
         database.folders
            .doc(folderId)
            .get()
            .then((doc) => {
               dispatch({
                  type: ACTIONS.UPDATE_FOLDER,
                  payload: { folder: database.formattedDoc(doc) },
               });
            })
            .catch(() => {
               // ? If error occured in getting folder, then we gonna update to the root folder instead
               dispatch({
                  type: ACTIONS.UPDATE_FOLDER,
                  payload: { folder: ROOT_FOLDER },
               });
            });
      }
   }, [folderId]);

   // ? To get folders if folder id or user changes
   useEffect(() => {
      return database.folders
         .where('parentId', '==', folderId)
         .where('userId', '==', currentUser.uid)
         .orderBy('createdAt')
         .onSnapshot((snapshot) => {
            dispatch({
               type: ACTIONS.SET_CHILD_FOLDERS,
               payload: {
                  childFolders: snapshot.docs.map(
                     database.formattedDoc
                  ),
               },
            });
         });
   }, [folderId, currentUser]);

   // ? To get files if folder id or user changes
   useEffect(() => {
      return database.files
         .where('folderId', '==', folderId)
         .where('userId', '==', currentUser.uid)
         .orderBy('createdAt')
         .onSnapshot((snapshot) => {
            dispatch({
               type: ACTIONS.SET_CHILD_FILES,
               payload: {
                  childFiles: snapshot.docs.map(
                     database.formattedDoc
                  ),
               },
            });
         });
   }, [folderId, currentUser]);

   return state;
}
