import ReactDOM from 'react-dom';
import usePortal from 'hooks/usePortal';

const Portal = ({ id, title, children }) => {
  const target = usePortal(id, title);
  return ReactDOM.createPortal(children, target);
};

export default Portal;
