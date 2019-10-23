import * as React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface TableRowProps {
    row: object;
    labelId: string;
    handleClick: any;
}

export default class SimpleTableRow extends React.Component<TableRowProps> {
    render() {
        const { row, labelId, handleClick, isItemSelected } = this.props;
        return (
            <TableRow
                hover
                onClick={handleClick}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.name}
                selected={isItemSelected}
            >
                <TableCell component="th" id={labelId} scope="row" padding="none">
                    {row.hint}
                </TableCell>
                <TableCell align="right">{row.text}</TableCell>
                <TableCell align="right">{row.options[0].text}</TableCell>
                <TableCell align="right">{row.options[1].text}</TableCell>
                <TableCell align="right">{row.options[2].text}</TableCell>
                <TableCell align="right">{row.options[3].text}</TableCell>
            </TableRow>
        );
    }
}
