import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";


export default function LogoAdmin() {
	const [isStopped] = useState(false);
	const [isPaused] = useState(false);

	return (
		<>
			<Grid
				container
				spacing={1}
				//onClick={goToHomePageLink}
				sx={{
					":hover": {
						opacity: "0.7",
						cursor: "pointer",
					},
				}}>
				
				<Grid item>
					
				</Grid>

				<Grid
					item
					style={{
						fontFamily: "Righteous",
						display: "grid",
						gridAutoFlow: "column",
						alignItems: "center",
						justifyItems: "flex-start",
						display: "flex",
						fontSize: 20,
						
					}}>
					
					<span>PORTAL TIM</span>
				</Grid>
			</Grid>
		</>
	);
}
