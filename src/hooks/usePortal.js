import { useRef, useEffect } from 'react';

function createRootElement(id, title) {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);

  if (title) {
    const titleElement = document.createElement('h4');
    titleElement.setAttribute('id', 'portal_title');
    titleElement.innerHTML = title;
    titleElement.style.paddingLeft = '20px';
    titleElement.style.paddingBlock = '15px';
    rootContainer.appendChild(titleElement);
  }
  return rootContainer;
}

function addRootElement(rootElem) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild.nextElementSibling
  );
}

const usePortal = (id, title) => {
  const rootElemRef = useRef(null);

  useEffect(() => {
    // Look for existing target dom element to append to
    const existingParent = document.querySelector(`#${id}`);
    // Parent is either a new root or the existing dom element
    const parentElem =
      existingParent || createRootElement(id, title || '');

    // If there is no existing DOM element, add a new one.
    if (!existingParent) {
      addRootElement(parentElem);
    }

    // Add the detached element to the parent
    parentElem.appendChild(rootElemRef.current);

    return function removeElement() {
      rootElemRef.current.remove();
      if (parentElem.childElementCount === 1) {
        if (
          parentElem.contains(document.getElementById('portal_title'))
        )
          parentElem.removeChild(
            document.getElementById('portal_title')
          );
      } else if (!parentElem.childElementCount) parentElem.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  }

  return getRootElem();
};

export default usePortal;
