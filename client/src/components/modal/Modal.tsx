import React, { useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./modal.scss";

interface MyComponentProps {
	handleClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<MyComponentProps> = (props) => {
	return (
		<div className="modal-overlay">
			<div className="modal-container">
				<div className="close">
					<button
						className="modal-close-button"
						onClick={props.handleClose}
					>
						X
					</button>
				</div>
				{props.children}
			</div>
		</div>
	);
};

export default Modal;
