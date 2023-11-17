import React, { useState, useEffect } from "react";
import ContainerContent from "@/components/ContainerContent";
import MuiDataTable from "@/components/MuiDataTable";
import Tooltip from '@mui/material/Tooltip';
import ReorderIcon from '@mui/icons-material/Reorder';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function GerenciamentoHunt() {

    
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
            label: "Ação",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const link_informacoes = ''
                    return (

                        <Tooltip title="Deletar">
                            <DeleteForeverIcon>
                                <ReorderIcon />
                            </DeleteForeverIcon>
                        </Tooltip>

                    )
                },
            }
        }
    ]

    const data = [
        {
            "numero": "551140062356",
            "nome": "Guilherme Henrique",
        },
        {
            "numero": "551140065689",
            "nome": "Josue Mendes",
        },
        {
            "numero": "551121657485",
            "nome": "Teste da silva",
        }
    ]

    const rows = data.map((row, idx) => {

        return {
            numero: row.numero,
            nome: row.nome,
            tn: row.tn,

        };
    })

    return (
        <ContainerContent title="Gerenciamento Hunt">
            <MuiDataTable
                data={rows}
                columns={columns}
            ></MuiDataTable>

        </ContainerContent>
    );
}
