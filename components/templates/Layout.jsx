import React, { useState, useContext, useEffect } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import Link from "next/link";
import Head from "next/head";
import LogoAtomus from "./LogoAdmin";

//MUI Components
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

//Ícones
import LegendToggleIcon from "@mui/icons-material/LegendToggle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import GppGoodIcon from '@mui/icons-material/GppGood';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import Users from "../Users";
import { render } from "react-dom";

const drawerWidth = 310; //Configuração do tamanho do drawer menu lateral

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "fixed",
		minHeight: "100vh",
		width: drawerWidth,
		"::-webkit-scrollbar": {
			width: "3px",
		},
		"::-webkit-scrollbar-track": {
			boxShadow: "nset 0 0 6px grey",
			borderRadius: "5px",
		},
		"::-webkit-scrollbar-thumb": {
			background: "#5e5e5e",
			borderRadius: "15px",
			height: "2px",
		},
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			position: "fixed",
			overflowX: "hidden", //Esconder scroll horizontal do sidebar
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("xs")]: {
				width: theme.spacing(9),
			},
			["@media (max-width:480px)"]: {
				display: "none", //Retirar o sidebar visível em dispositivos móveis.
			},
		}),
	},
}));



export default function BaseTemplate({ children }) {
	const { openDrawer, changeDrawer } = useContext(SettingsContext); //Coletando estado de fechamento e abertura do Drawer menu via Context API.
	const { themePallete } = useContext(SettingsContext); //Coletando estado de preferência da cor padrão do tema.

	const ListUsers = React.forwardRef(function ListUsers() {
		//Função resonsavel por renderizar ou nao a lista de usuarios
		var _funtion_user = JSON.parse(localStorage.getItem('@telesul:user_properties')).category
		if (_funtion_user != 'colaborador') {
			return (
				<Link href="/acessos/gerencia-de-usuarios" passHref>
					<CustomListItemText>
						<ListItemIcon sx={{ pl: 4 }}>
							<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
						</ListItemIcon>

						<ListItemText
							primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Lista de usuários</Typography>}
						/>
					</CustomListItemText>
				</Link>
			)
		} else {
			return (
				<></>
			)
		}

	});

	const GrupoCaptura = React.forwardRef(function GrupoCaptura() {
		var _funtion_user = JSON.parse(localStorage.getItem('@telesul:user_properties')).category
		if (_funtion_user != 'colaborador') {
			return (
				<List component="div">
					<Link href="/facilidades/grupo-de-captura" passHref>
						<CustomListItemText>
							<ListItemIcon sx={{ pl: 4 }}>
								<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
							</ListItemIcon>

							<ListItemText
								primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Grupo de captura</Typography>}
							/>
						</CustomListItemText>
					</Link>
				</List>
			)
		} else {
			return (
				<></>
			)
		}
	})

	const AppBar = styled(MuiAppBar, {
		shouldForwardProp: (prop) => prop !== "open",
	})(({ theme, open }) => ({
		zIndex: theme.zIndex.drawer + 1,
		display: "flex",
		alignContent: "center",
		justifyContent: "space-between",
		width: "100%",
		flexDirection: "row",
		background: themePallete.navbar,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(open && {
			marginLeft: drawerWidth,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	}));

	//Custom component que é cada botão de menu do Sidebar
	const CustomListItemButtom = styled(ListItemButton)(() => ({
		marginLeft: "0px",
		marginRight: "10px",
		marginTop: "5px",
		marginBottom: "5px",
		borderLeft: "5px solid transparent",
		"&:hover": {
			background: themePallete.hover,
			borderRadius: "0px 4px 4px 0px",
			borderLeft: `5px solid ${themePallete.navbar}`,
			cursor: "pointer",
			transition: "0.2s ease-out",
		},
		"&:active": {
			background: themePallete.background,
			borderRadius: "0px 4px 4px 0px",
		},
	}));

	//Custom component que é cada botão de submenu do Sidebar
	const CustomListItemText = styled(ListItemButton)(() => ({
		display: "flex",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		marginRight: "10px",
		borderLeft: "5px solid transparent",
		height: "46px",
		"&:hover": {
			background: themePallete.hover,
			borderRadius: "0px 4px 4px 0px",
			borderLeft: `5px solid ${themePallete.navbar}`,
			cursor: "pointer",
			transition: "0.2s ease-out",
		},
		"&:active": {
			background: themePallete.navbar,
			borderRadius: "0px 4px 4px 0px",
		},
	}));

	//Estados para controlar a abertura e fechamento do Drawer menu.
	const [openDropDownUsers, setopenDropDownUsers] = useState(false);
	const [openDropDownFacilidades, setopenDropDownFacilidades] = useState(false);

	//Função que abre e fecha o DropDown do menu INDICADORES.
	const handleClickOpenDropdownLdap = () => {
		if (openDrawer) {
			setopenDropDownUsers(!openDropDownUsers);
			setopenDropDownFacilidades(false);
		} else {
			changeDrawer();
			setopenDropDownUsers(true);
		}
	};

	//Função que abre e fecha o Dropdown do menu de FACILIDADES
	const handleClickOpenDropdownFacilidades = () => {
		if (openDrawer) {
			setopenDropDownFacilidades(!openDropDownFacilidades);
			setopenDropDownUsers(false);
		} else {
			changeDrawer();
			setopenDropDownUsers(true);
		}
	};

	//Arrow function que dispara a abertura e fechamento do Drawer menu.
	const toggleDrawer = () => {
		changeDrawer();
		setopenDropDownUsers(false);
		setopenDropDownFacilidades(false);
	};



	function toggleFullScreen() {
		document.documentElement.requestFullscreen();
		if (window.innerHeight == screen.height) {
			document.exitFullscreen();
		}
	}

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Head>
				<title>Portal TIM</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Box sx={{ display: "flex", width: "100%", height: "100%", background: "#ededed" }}>
				<AppBar position="fixed" elevation={0} open={openDrawer}>
					<Toolbar
						sx={{
							pr: "24px",
						}}>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: "15px",
								...(openDrawer && { display: "none" }),
							}}>
							<MenuIcon sx={{ "&:hover": { opacity: "0.3", cursor: "pointer" } }} />
						</IconButton>

						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: "15px",
								...(!openDrawer && { display: "none" }),
							}}>
							<ChevronLeftIcon sx={{ "&:hover": { opacity: "0.3", cursor: "pointer" } }} />
						</IconButton>
						<LogoAtomus />

						<IconButton edge="start" color="inherit" aria-label="open drawer" sx={{ ml: 2 }} onClick={toggleFullScreen}>
							<FullscreenRoundedIcon sx={{ color: "#fff", "&:hover": { opacity: "0.3", cursor: "pointer" } }} />
						</IconButton>
					</Toolbar>
					<Users />
				</AppBar>

				<Drawer variant="permanent" open={openDrawer} elevation={16}>
					<Toolbar
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							px: [1],
						}}></Toolbar>
					<Divider />


					<List component="nav">
						<CustomListItemButtom
							onClick={handleClickOpenDropdownLdap}
							sx={{
								background: `${openDropDownUsers ? themePallete.hover : ""}`,
								borderRadius: `${openDropDownUsers ? "0px 4px 4px 0px" : ""}`,
								borderLeft: `${openDropDownUsers ? `5px solid ${themePallete.navbar}` : ""}`,
							}}>
							<ListItemIcon>
								{openDrawer ? (
									<GppGoodIcon sx={{ color: themePallete.navbar }} />
								) : (
									<Tooltip title="Acessos" TransitionComponent={Zoom} placement="right">
										<GppGoodIcon sx={{ color: themePallete.navbar }} />
									</Tooltip>
								)}
							</ListItemIcon>
							<ListItemText
								primary={<Typography sx={{ fontSize: "14px", color: "#474747", fontWeight: "bold" }}>Acessos</Typography>}
							/>
							{openDropDownUsers ? <ExpandLess sx={{ fontSize: "15px" }} /> : <ExpandMore sx={{ fontSize: "15px" }} />}
						</CustomListItemButtom>

						<Collapse in={openDropDownUsers} timeout="auto" unmountOnExit>
							<List component="div">
								<Link href="/acessos/alterar-propriedades" passHref>
									<CustomListItemText>
										<ListItemIcon sx={{ pl: 4 }}>
											<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
										</ListItemIcon>
										<ListItemText
											primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Alterar propriedades de usuário</Typography>}
										/>
									</CustomListItemText>
								</Link>
								<ListUsers></ListUsers>
							</List>
						</Collapse>
					</List>


					<List component="nav">
						<CustomListItemButtom
							onClick={handleClickOpenDropdownFacilidades}
							sx={{
								background: `${openDropDownFacilidades ? themePallete.hover : ""}`,
								borderRadius: `${openDropDownFacilidades ? "0px 4px 4px 0px" : ""}`,
								borderLeft: `${openDropDownFacilidades ? `5px solid ${themePallete.navbar}` : ""}`,
							}}>
							<ListItemIcon>
								{openDrawer ? (
									<AppRegistrationIcon sx={{ color: themePallete.navbar }} />
								) : (
									<Tooltip title="Facilidades" TransitionComponent={Zoom} placement="right">
										<AppRegistrationIcon sx={{ color: themePallete.navbar }} />
									</Tooltip>
								)}
							</ListItemIcon>
							<ListItemText
								primary={<Typography sx={{ fontSize: "14px", color: "#474747", fontWeight: "bold" }}>Facilidades</Typography>}
							/>
							{openDropDownFacilidades ? <ExpandLess sx={{ fontSize: "15px" }} /> : <ExpandMore sx={{ fontSize: "15px" }} />}
						</CustomListItemButtom>

						<Collapse in={openDropDownFacilidades} timeout="auto" unmountOnExit>
								<GrupoCaptura></GrupoCaptura>
						</Collapse>
					</List>


				</Drawer>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						height: "100%",
						minHeight: "100vh",
						marginLeft: !openDrawer ? "60px" : "300px",
						background: themePallete.background,
						["@media (max-width:480px)"]: {
							marginLeft: "0px",
						},
					}}>
					{children}
				</Box>
			</Box>
		</Box>
	);
}
