import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";
interface data {
	goBackFunction: () => void;
}
const Headers: React.FC<data> = (props) => {
	let { name } = useParams();

	const [isBackground, setBackground] = useState(false);
	const changeBackground = () => {
		setBackground(!isBackground);
	};
	return (
		<div className="header">
			<div className="header-button">
				<button className="button-back" onClick={props.goBackFunction}>
					<img
						src="../../../../assets/icons/back-light.svg"
						alt=""
						className="icons-back"
					/>
				</button>
			</div>

			<div className="header-content">
				<div className="links-buttons-container">
					<Link
						to={`detail/plan`}
						onClick={changeBackground}
						className="link-button-background"
						
					>
						Plan
					</Link>
					<Link
						to={"detail/notes"}
						className="link-button"
						onClick={changeBackground}
					>
						Notes
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Headers;
