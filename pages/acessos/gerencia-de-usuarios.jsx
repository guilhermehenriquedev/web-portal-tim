import React, { useState, useEffect } from "react";
import ContainerContent from "@/components/ContainerContent";
import MuiDataTable from "@/components/MuiDataTable";
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';


export default function Usuarios() {

    const [data, setData] = useState([]);

    const getData = async () => {
        //Função para buscar todos os usuários da empresa do usuário logado

        try {
            const _company = JSON.parse(localStorage.getItem("@telesul:user_properties")).company
            const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/users_ldap/?company=${_company}`);

            let responseData = await response.json();

            setData(responseData.data ? responseData.data : []);


        } catch (err) {

            setData([]);
            setOpenAlert(true);

        } finally {
            //setLoading(false);
        }
    }

    useEffect(() => {
        getData()
    }, []);

    const columns = [
        {
            name: "givenName",
            label: "Nome"
        },
        {
            name: "sn",
            label: "Sobrenome"
        },
        {
            name: "sAMAccountName",
            label: "Telefone"
        },
        {
            name: "title",
            label: "Função"
        },
        {
            name: "sAMAccountName",
            label: "Ação",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const link_editar = `/acessos/alterar-propriedades/?sAMAccountName=${value}`
                    return (
                        <Link href={link_editar} passHref >
                            <Tooltip title="Editar">
                                <IconButton>
                                    <ReorderIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    )
                },
            }
        }
    ]

    const rows = data.map((row, idx) => {

        return {
            id: idx,
            company: row.company,
            givenName: row.givenName,
            sn: row.sn,
            sAMAccountName: row.sAMAccountName,
            title: row.title,
        };
    })

    return (
        <ContainerContent title="Gerência de acessos">
            <MuiDataTable
                data={rows}
                columns={columns}
            ></MuiDataTable>

        </ContainerContent>
    );
}
