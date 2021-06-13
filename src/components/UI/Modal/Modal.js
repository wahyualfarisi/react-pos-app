import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = ({ 
    isShow, 
    onClose,
    onSubmit,
    title,
    children
}) => {

    

    return ReactDOM.createPortal(
        <div className={`modal ${isShow && 'show'}`} onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="modal-button">Close</button>
                    <button onClick={onSubmit} className="modal-button">Submit</button>
                </div>
            </div>
        </div>
    , document.getElementById('modal'))
}

export default Modal
