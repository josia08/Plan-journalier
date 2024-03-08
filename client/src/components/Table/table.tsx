import React, { createContext, useContext } from "react";
import { format } from "date-fns";
import "./table.scss";
import { AppContext } from "../Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Table: React.FC = () => {
	const { donnee, columns, selectedDate, setDonnee } = useContext(AppContext);

	const newData = donnee.filter((item: any) => item.date === selectedDate);

	// pour retourner au page
	const link = (e: any) => {
		console.log(e.id);

		location.href = `detail/${e.id}`;
	};

	const handleDelete = async (id: any) => {
		const newdata = donnee.filter((item: any) => item.id !== id);
		console.log(newdata);
		setDonnee(newdata);

		try {
			const response = await axios.post(
				"http://localhost:3001/api/delete-all-links",
				{ id }
			);
			console.log(response.data.message); // Affichez le message de succès
			// Mettez à jour votre interface utilisateur ou effectuez d'autres actions nécessaires après la suppression réussie
		} catch (error) {
			console.error("Error deleting chapter links:", error);
			// Gérez les erreurs et fournissez des commentaires à l'utilisateur si nécessaire
		}
	};

	return (
		<div className="row">
			<div className="col-md-12">
				<div className="table-wrap">
					<table className="table table-responsive-xl table-hover">
						<thead className="table-header ">
							<tr>
								{columns.map((column: any) => (
									<th style={{ fontWeight: "bolder", color: "black" }}>
										{column}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{newData.map((item: any) => (
								<tr key={item.id}>
									<td onClick={() => link(item)}>{item.name}</td>
									<td onClick={() => link(item)}>
										<span className=" text-dark rounded finished">
											{item.status ? "Finished" : "Not finished"}
										</span>
									</td>
									<td className="test" onClick={() => link(item)}>
										D-1
									</td>
									<td>
										<span>
											<img
												src="assets/icons/delete-alt-2-svgrepo-com.svg"
												alt=""
												className="icons"
												onClick={() => handleDelete(item.id)}
											/>
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Table;
