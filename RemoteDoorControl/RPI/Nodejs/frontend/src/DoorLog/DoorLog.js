import React, { useMemo} from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './columns.js'
import MOCK_DATA from './MOCK_DATA.json'
import './doorlog.css'

export const DoorLog = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns,
        data
    })

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance


    return (
        <div className="LoggingTable">
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                         ))}                        
                    </tr>
                ))}
               
            </thead>

            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }

                            </tr>
                        )
                    })
                }
            </tbody>

        </table>
        <iframe title="chart" width="450" height="260" src="https://thingspeak.com/channels/1628259/widgets/406200" sandbox=''></iframe>
        </div>
        )
}