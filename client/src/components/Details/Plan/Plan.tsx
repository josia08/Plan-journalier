import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Plan.scss";
import { useForm, useFieldArray } from "react-hook-form";
import Modal from "../../modal/Modal";
import { MDBInput } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

interface Data {}
const Plan: React.FC<Data> = () => {
	const { id } = useParams();

	// fetching data
	const [chapter, setChapter] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:3001/plans/${id}`)
			.then((response) => response.json())
			.then((data) => setChapter(data))
			.catch((error) =>
				console.error("Erreur lors de chargement des donées", error)
			);
	}, []);


	
	// to open modal
	const [modal, setModal] = useState(false);
	const showModal = () => {
		setModal(!modal);
	};

	// handle form
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
		reset,
	} = useForm();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "plans", 
	});

	const onSubmit = async (data: any) => {
		const newdata = {
			...data,
			id,
		};

		
		
	   const newPlan = [...chapter,{title:data.title,item:[...data.plans],id:2}]
	   console.log(newPlan,'/',chapter);
	   setChapter(newPlan)
	   
		
		try {
			// Send form data to backend server
			const response = await axios.post(
				"http://localhost:3001/api/add-plan",
				newdata,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data); 
			reset();
			showModal();
		} catch (error) {
			console.error("Error adding chapter:", error);
		}
	};

	return (
		<div className="detail-content">
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div className="detail-input-search">
					<img
						src="../../../../assets/icons/search-icon.png"
						alt=""
						className="icons-plan-search"
					/>
					<input
						type="text"
						className="form-control search "
						id="username"
						placeholder="search"
						name="username"
					/>
				</div>
				<button className="buttonAdd" onClick={showModal}>
					Add New
				</button>
			</div>
			
				<div className="detail-container">
					{chapter.map((item: any) => (
						<div className="item" >
							<div className="item-title">
								<p className="margin title">{item.title}</p>
							</div>
							<div className="gradient-list">
								{item.item.map((e: any) => (
									<div className="li display" >
										<p className="margin plan">{e.item}</p>
										<div
											style={{
												display: "flex",
												gap: "10px",
												marginRight: "10px",
											}}
										>
											<img
												src="../../../../assets/icons/delete-alt-2-svgrepo-com.svg"
												alt=""
												className="icons-plan-remove"
											/>
											<img
												src="../../../../assets/icons/pencil-icon.png"
												alt=""
												className="icons-plan"
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
		
			{modal && (
				<Modal handleClose={showModal}>
					<div className="modal-title">
						<h2>Add a new Plan</h2>
					</div>

					<form
						className="modal-content"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="input-content ">
							Title:
							<MDBInput
								label="New Title"
								id="form1"
								type="text"
								{...register("title", { required: true })}
							/>
							{errors.title && (
								<p className="alert alert-danger">
									This field is required
								</p>
							)}
						</div>
						<div className="input-content ">
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<p>Notes:</p>
								<div style={{ display: "flex", gap: "2px" }}>
									<p className="plus" onClick={() => append({})}>
										+
									</p>
								</div>
							</div>
							{fields.map((item, index) => (
								<div>
									<div
										key={item.id}
										className="add-input-container"
										style={{ display: "flex", marginBottom: "6px" }}
									>
										<MDBInput
											label="Item"
											id="form1"
											type="text"
											className="input-item"
											{...register(`plans[${index}].item`, {
												required: true,
											})}
										/>

										<p className="x" onClick={() => remove(index)}>
											x
										</p>
									</div>
									{errors.plans && (
										<p className="alert alert-danger">
											This field is required
										</p>
									)}
								</div>
							))}
						</div>
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

export default Plan;
