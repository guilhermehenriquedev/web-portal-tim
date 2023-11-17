import React, { useState, useEffect } from "react";
import ContainerContent from "../../components/ContainerContent";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SwipeDownIcon from '@mui/icons-material/SwipeDown';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


export default function changeuserprops(props) {

    const [data, setData] = useState({});
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertPassword, setOpenAlertPassword] = useState(false);

    const handleClose = (event, reason) => {
        //Fecha o pop-up de notificação
        if (reason === "clickaway") {
            return;
        }
        setOpenAlert(false);
        setOpenAlertPassword(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    async function getData() {
        //Busca os dados do usuário AD pelo samaccountname
        
        var sAMAccountName = props.id

        if (props.id == '') {
            var sAMAccountName = JSON.parse(localStorage.getItem('@telesul:user_properties')).email.split('@')[0]
        }

        const req = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/search_user_properties?samaccountname=${sAMAccountName}`);
        const res = await req.json();
        console.log(res.data)
        setData(res.data)

    }

    async function postData() {
        // Função para enviar os dados de alteraço para o Active Directory

        //valida se a senha digitada estão iguais
        const _password = document.getElementById('_password').value
        const _confirm_password = document.getElementById('_confirm_password').value
        if (_password != _confirm_password){
            setOpenAlertPassword(true)
            return (<></>)
        }

        var _data = {}
        //propriedades para alteração
        _data['_sn'] = document.getElementById('_sn').value
        _data['_givenName'] = document.getElementById('_givenName').value

        //informações do usuario corrente
        _data['_company_user'] = JSON.parse(localStorage.getItem("@telesul:user_properties")).company
        _data['_displayName_user'] = document.getElementById('_displayName_user').value
        _data['_sAMAccountName_user'] = document.getElementById('_sAMAccountName_user').value
        _data['_password'] = document.getElementById('_password').value

        const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/change_properties`, {
            method: 'POST',
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify(_data)
        })
        if (response.ok){
            setOpenAlert(true)
        }
        
        const res = await response;
        return res.status
    }

    useEffect(() => getData(), [])


    return (

        <ContainerContent title="Alterar propriedades do usuário">
            <h5>Edite os campos que possuem o *</h5>

            <Box sx={{ flexGrow: 1, mt: 3 }}>
                <Grid container item spacing={2} xs={12}>
                    <Grid item xs={3}>
                        <TextField
                            id="_displayName_user"
                            disabled
                            fullWidth
                            label="Usuário"
                            value={data.displayName}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField

                            id="_sAMAccountName_user"
                            disabled
                            fullWidth
                            label="Telefone do usuário"
                            value={data.sAMAccountName}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1, mt: 3 }}>
                <Grid container item spacing={2} xs={12}>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            required
                            id="_givenName"
                            label="Nome (givenName)"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            required
                            id="_sn"
                            label="Sobrenome (sn)"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            required
                            id="_password"
                            label="Digite sua senha"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            type="password"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            required
                            id="_confirm_password"
                            label="Confirme sua senha"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            type="password"
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start ",
                    mb: 2,
                    mr: 2,
                    mt: 2,
                }}
            >
                <Stack spacing={1} direction="row">
                    <Button variant="contained" startIcon={<SwipeDownIcon />} onClick={() => postData()}>
                        Enviar alterações
                    </Button>
                </Stack>
            </Box>

            <Snackbar open={openAlert} autoHideDuration={3000} disableWindowBlurListener={true} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    Propriedades Alteradas com sucesso!
                </Alert>
            </Snackbar>

            <Snackbar open={openAlertPassword} autoHideDuration={3000} disableWindowBlurListener={true} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
                    Senhas não estão iguais, verifique e tente novamente!
                </Alert>
            </Snackbar>

        </ContainerContent>

    )
}

export async function getServerSideProps(req, res) {

    if (req.query.sAMAccountName == null) {
        var id = ''
    } else {
        var id = req.query.sAMAccountName
    }


    return {
        props: {
            id: id
        }
    }

}