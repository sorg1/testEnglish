import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import TableToolbarD from './TableToolbar';
import TableHeadD from './TableHead';
import TableRowD from './TableRow';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1
    }
}));

function EnhancedTable(props) {
    const {
        t,
        rows,
        onClickRow
    } = props;
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const headCells = [
        { id: 'hint', numeric: false, disablePadding: true, label: t('admin:hint') },
        { id: 'text', numeric: true, disablePadding: false, label: t('admin:text') },
        { id: 'option1', numeric: true, disablePadding: false, label: t('admin:option', {number: 1}) },
        { id: 'option2', numeric: true, disablePadding: false, label: t('admin:option', {number: 2}) },
        { id: 'option3', numeric: true, disablePadding: false, label: t('admin:option', {number: 3}) },
        { id: 'option4', numeric: true, disablePadding: false, label: t('admin:option', {number: 4}) }
    ];

    return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<div className={classes.tableWrapper}>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={'small'}
					>
						<TableHeadD
                            headCells={headCells}
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
                            {stableSort(rows, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
										<TableRowD
                                            key={row.name}
                                            row={row}
                                            labelId={labelId}
                                            handleClick={() => onClickRow(true, row)}
                                            isItemSelected={isItemSelected}
										>
										</TableRowD>
                                    );
                                })}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={[5]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
                        'aria-label': 'previous page'
                    }}
					nextIconButtonProps={{
                        'aria-label': 'next page'
                    }}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
    );
}

export default withTranslation()(EnhancedTable);
