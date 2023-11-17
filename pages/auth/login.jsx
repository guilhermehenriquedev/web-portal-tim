import Link from "next/link";
import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { parseCookies } from "nookies";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Head from "@/components/Head";


//Ícones
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import HttpsIcon from "@mui/icons-material/Https";
import FaxIcon from '@mui/icons-material/Fax';

export default function Login() {
	const { register, handleSubmit, setValue } = useForm();
	const { signIn } = useContext(AuthContext);
	const [erros, setErros] = useState("");
	const [remember, setRemember] = useState(false);

	useEffect(() => getRememberMe(), [])

	async function handleSignIn(data) {
		const req = await signIn(data);

		req ? setErros(JSON.parse(req)) : null;
		remember ? handleRememberMe(data.email) : null;

	}

	const checkRememberMe = () => {
		var save = remember ? false : true;

		setRemember(save);
		!save ? localStorage.removeItem("@telesul:email") : null;

	}

	const handleRememberMe = (email) => {
		localStorage.setItem("@telesul:email", JSON.stringify(email));
	}



	const getRememberMe = () => {
		const email = localStorage.getItem("@telesul:email");

		if (email) {
			setValue("email", JSON.parse(email));
			setRemember(true);

		}
	}

	const handleErros = () => {

		if (erros.cod == "1") {

			return (
				<>
					<TextField
						error
						helperText={erros.msg}
						{...register("email")}
						
						margin="normal"
						required
						fullWidth
						id="email-address"
						label="Telefone"
						name="email"
						autoComplete="email"
						autoFocus
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FaxIcon />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						{...register("password")}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Senha"
						type="password"
						id="password"
						autoComplete="current-password"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<HttpsIcon />
								</InputAdornment>
							),
						}}
					/>
				</>
			)

		} else if (erros.cod == "2") {
			return (


				<>
					<TextField
						error
						{...register("email")}
						
						margin="normal"
						required
						fullWidth
						id="email-address"
						label="Telefone"
						name="email"
						autoComplete="email"
						autoFocus
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FaxIcon />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						error
						helperText={erros.msg}
						{...register("password")}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Senha"
						type="password"
						id="password"
						autoComplete="current-password"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<HttpsIcon />
								</InputAdornment>
							),
						}}
					/>
				</>
			)
		}
	}	

	const CustomContainerGradient = styled(Box)(() => ({
		flex: 0.8,
		height: "100vh",
		display: "flex",
		alignItems: "flex-start",
		flexDirection: "column",
		justifyContent: "center",
		background: "url(/img/tim-image.png)",
		padding: "100px",
		["@media (max-width:1280px)"]: {
			flex: 0.4,
		},
		["@media (max-width:400px)"]: {
			display: "none", //Retirar o sidebar visível em dispositivos móveis.
		},
	}));

	const CustomContainerLogin = styled(Box)(() => ({
		background: "#fff",
		flex: 0.35,
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "20px",
		["@media (max-width:1280px)"]: {
			flex: 0.6,
		},
		["@media (max-width:780px)"]: {
			flex: 1,
		},
		
	}));

	return (
		<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
			<CssBaseline />
			<Head title="Portal TIM | LOGIN" />
			
			
			<CustomContainerGradient>
				<Typography variant="h2" sx={{ color: "#fff", fontFamily: "Nunito", fontWeight: "900" }}>
					Bem vindo(a)!
				</Typography>
				<Typography variant="h6" sx={{ color: "#fff", fontFamily: "Nunito", fontWeight: "400" }}>
					Portal TIM
				</Typography>
			</CustomContainerGradient>
			
			
			<CustomContainerLogin>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}>
					
					<Typography variant="h4" sx={{ fontFamily: "Righteous" }}>
						PORTAL TIM
					</Typography>

					<Box component="form" onSubmit={handleSubmit(handleSignIn)}>

						{erros ? handleErros() :
							<>

								<TextField
									{...register("email")}
									
									margin="normal"
									required
									fullWidth
									id="email-address"
									label="Telefone"
									name="email"
									autoComplete="email"
									autoFocus
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FaxIcon />
											</InputAdornment>
										),
									}}
								/>

								<TextField
									{...register("password")}
									margin="normal"
									required
									fullWidth
									name="password"
									label="Senha"
									type="password"
									id="password"
									autoComplete="current-password"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<HttpsIcon />
											</InputAdornment>
										),
									}}
								/>
							</>
						}

						<FormControlLabel control={<Checkbox checked={remember} color="primary" />} label="Lembre-se" onClick={checkRememberMe} />
						<Button type="submit" fullWidth disableElevation variant="contained" sx={{ mb: 2 }}>
							Entrar
						</Button>
					</Box>
				</Box>
			</CustomContainerLogin>
		</Box>
	);
}

export async function getServerSideProps(req, res) {
	
	const { ["@telesul.token"]: token } = parseCookies(req);

	if (token) {
		return {
			redirect: {
				permanent: true,
				destination: "/",
			},
		};
	}

	return {
		props: {},
	};
}