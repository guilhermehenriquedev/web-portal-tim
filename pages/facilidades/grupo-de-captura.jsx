import React, { useState, useEffect } from "react";
import ContainerContent from "@/components/ContainerContent";
import MuiDataTable from "@/components/MuiDataTable";
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';

export default function GrupoDeCaptura() {


    const columns = [
        {
            name: "numero",
            label: "Numero"
        },
        {
            name: "nome",
            label: "Nome"
        },
        {
            name: "tn",
            label: "TN"
        },
        {
            name: "tn",
            label: "Ação",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const link_informacoes = '/facilidades/gerenciamento-hunt'
                    return (
                        <Link href={link_informacoes} passHref >
                            <Tooltip title="Exibir informações">
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

    const data = [{
        "numero": "551140062356",
        "nome": "Guilherme Henrique",
        "tn": "teste"
    }]

    const rows = data.map((row, idx) => {

        return {
            numero: row.numero,
            nome: row.nome,
            tn: row.tn,

        };
    })

    return (
        <ContainerContent title="Grupo de captura">
            <MuiDataTable
                data={rows}
                columns={columns}
            ></MuiDataTable>
        </ContainerContent>
    );
}
