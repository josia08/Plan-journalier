import React, { useEffect, useState, createContext } from "react";
import { format } from "date-fns";
import "./home.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "../Table/table";
import Modal from "../modal/Modal";
import { MDBInput } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import axios from "axios";

export const AppContext = createContext(null);

const Home: React.FC = () => {
	// pour gérer les dates
	const currentDate = new Date();
	const formattedDate = format(currentDate, "dd MMMM yyyy");
	const [selectedDate, setSelectedDate] = useState(formattedDate);
	const handleSelectedDate = (e: any) => {
		const newDate = format(e.target.value, "dd MMMM yyyy");
		setSelectedDate(newDate);
	};

	// date
	function getDateAfter15Days() {
		// Créer une nouvelle instance de Date pour la date d'aujourd'hui
		const today = new Date();

		// Ajouter 15 jours à la date d'aujourd'hui
		const after15Days = new Date(today);
		after15Days.setDate(today.getDate() + 30);

		// Retourner la date après 15 jours
		return after15Days;
	}
	// Utiliser la fonction pour obtenir la date après 15 jours
	const dateAfter15Days = getDateAfter15Days();

	// gathering data
	const [donnee, setDonnee] = useState([]);
	useEffect(() => {
		fetch("http://localhost:3001/chapter")
			.then((response) => response.json())
			.then((data) => setDonnee(data))
			.catch((error) =>
				console.error("Erreur lors de chargement des donées", error)
			);
	}, []);

	const columns = ["Chapter", "Status", "Day", "Action"];

	// to open and close modal
	const [closeModal, SetCloseModal] = useState<boolean>(false);
	const close = () => {
		SetCloseModal(!closeModal);
	};

	// handling form
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm();
	const [chapterError, setChapterError] = useState(false);

	const onSubmit = async (data: any) => {
		if (!data.chapter) {
			setChapterError(true);
			return;
		}
		reset();

		const dataform = {
			name: data.chapter,
			status: false,
			date: format(data.date, "dd MMMM yyyy"),
		};

		console.log(dataform);

		const newData = [...donnee, dataform];
		setDonnee(newData);
		close();
		try {
			// Send form data to backend server
			const response = await axios.post(
				"http://localhost:3001/api/add-chapter",
				dataform,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data); 
			reset();
		} catch (error) {
			console.error("Error adding chapter:", error);
		}
	};

	return (
		<div className="home">
			<div className="ftco-section">
				<div className="container home-table">
					<div className="  row justify-content-center ">
						<div className="col-md-6 text-center mb-3">
							<h2 className="heading-section title">
								Daily Plan on {selectedDate}{" "}
							</h2>
						</div>
					</div>

					<div className="head">
						<div className="calendar">
							<input
								type="date"
								name=""
								id=""
								onChange={handleSelectedDate}
							/>
							<p></p>
						</div>
						<button className="buttonAdd" onClick={close}>
							Add New
						</button>
					</div>
					<AppContext.Provider
						value={{ donnee, columns, selectedDate, setDonnee }}
					>
						<Table />
					</AppContext.Provider>
				</div>
			</div>
			{closeModal && (
				<Modal handleClose={close}>
					<div className="modal-title">
						<h2>Add a new chapter</h2>
					</div>

					<form
						className="modal-content"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="input-content ">
							<MDBInput
								label="New Chapter"
								id="chapter"
								type="text"
								{...register("chapter", { required: true })}
							/>
							{errors.chapter && (
								<p className="alert alert-danger">
									Chapter is required
								</p>
							)}
						</div>

						<div className="input-content ">
							Choose a Date : <br />
							<input
								type="date"
								{...register("date", { required: true })}
							/>
							{errors.date && (
								<p className="alert alert-danger">Date is required</p>
							)}
						</div>
						{/* 
						{chapterError && (
							<p className="error-message">Date is required</p>
						)} */}

						<div className="modal-submit">
							<button
								type="submit"
								className="btn btn-danger button-submit"
							>
								Submit
							</button>
						</div>
					</form>
				</Modal>
			)}
		</div>
	);
};

export default Home;
