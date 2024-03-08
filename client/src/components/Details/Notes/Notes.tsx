import React from "react";
import './Notes.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from "../../../../Data";

const Notes = () => {
	console.log(data);

	return (
		<div className="notes">
			<div className="button">
				<button className="buttonAdd">
					Add New
				</button>
			</div>
			<div className="card mb-3">
				<div className="card-body d-flex justify-content-between align-items-center">
					<div>
						<p className="card-text mb-0">This event happened </p>
					</div>
					<div className="d-none d-md-block">
						<div className="badge badge-primary mr-2">Informal</div>
						<i
							className="iconUxt attention filled text-primary mr-2"
							aria-hidden="true"
						></i>
					</div>
				</div>
			</div>
			<div className="card mb-3">
				<div className="card-body d-flex justify-content-between align-items-center">
					<div>
						<p className="card-text mb-0">This event happened </p>
					</div>
					<div className="d-none d-md-block">
						<div className="badge badge-primary mr-2">Informal</div>
						<i
							className="iconUxt attention filled text-primary mr-2"
							aria-hidden="true"
						></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Notes;
