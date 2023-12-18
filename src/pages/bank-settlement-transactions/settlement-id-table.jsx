import React from 'react';
import RSPTable from '../../components/table';
import _ from 'lodash'
import { getSettlementIdTag, TagRenderer } from '../outward-transaction/utils';

const columnName=[
'payer name',
'payer address',
'payer account no',
'payer bank code',
'payer virtual payment address',
'Currency',
'AMOUNT',
'TIMESTAMP',
'payee name',
'payee address',
'payee account no',
'payee bank code',
'payee virtual payment address',
'payment type',
'purpose code',
'payee account type',
'REMARKS',
'Settlement id ',
'STATE',
'PREVIOUS SETTLEMENT REFERENCE NUMBER',
'Settlement reference number',
'ERROR CODE',
'ERROR MESSAGE',
]
const columnRenderMap={
    'remarks':(value)=>TagRenderer(getSettlementIdTag('remarks',value)),
    'state':(value)=>TagRenderer(getSettlementIdTag('state',value)),
}
export const SettlementIdTable=(props)=>{
    const columns=columnName.map((col)=>{
        const colDataIndex=_.split(col,' ').join("_").toLowerCase()
        return(
        {
            title:_.upperCase(col),
            dataIndex:colDataIndex,
            ...(columnRenderMap[col]?{render:columnRenderMap[col]}:{})
        }
        )})
        console.log({columns})
    return <>
    <RSPTable
            columns={columns}
            scroll={{ x: "max-content" }}
            dataSource={props.settlementIdTransactions}
    />
    </>
}