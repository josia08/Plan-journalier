import React, { useEffect, useState ,createContext} from "react";
import "./Details.scss";
import { useParams, Outlet, useNavigate } from "react-router-dom";

import Headers from "./Header/Header";



export const AppContext = createContext(null);
interface data {}
const Details: React.FC<data> = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Rediriger vers la première sous-route
		navigate("detail/plan", { replace: true });
	}, [navigate]);

	// retour vers le page d'acceuil
	const gobackHandler = () => {
		navigate("/");
	};


	

	return (
		<div className="detail">
			<Headers goBackFunction={gobackHandler} />
			<div className="test">
				<Outlet />
			</div>
			
		</div>
	);
};

export default Details;
