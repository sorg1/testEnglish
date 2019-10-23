import * as React from 'react';
import EmployeeCreationDialog from '../EmployeeCreationDialog';
import {
	Menu,
	MenuItem,
	Divider,
	TextField,
	Theme,
	createStyles,
	WithStyles,
	withStyles,
	InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { prefillEmployeeCreationForm } from '../EmployeeCreationDialog/actions';
import Highlight from '../Highlight';
import api from '../../lib/api';
import { debounce } from 'lodash';
import { WithTranslation, withTranslation } from 'react-i18next';
import { UIEmployee } from '@api/v1';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = (theme: Theme) =>
	createStyles({
		popover: {
			width: theme.spacing(30),
			maxWidth: theme.spacing(30)
		},
		menuItem: {
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		},
		searchField: {
			padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
			'&:focus': {
				outline: 'none'
			}
		},
		results: {
			maxHeight: theme.spacing(27),
			overflow: 'auto'
		}
	});

interface EmployeeSearchState {
	searchText: string;
	dialogOpen: boolean;
	results: UIEmployee[];
}

interface EmployeeSearchOwnProps {
	anchorEl: HTMLElement;
	onClose: (event?: React.SyntheticEvent) => void;
	onSelect: (employee: UIEmployee) => void;
	disableCreation: boolean;
	resetOption?: {
		text: string;
		value: any;
	};
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({ prefillEmployeeCreationForm }, dispatch);

interface EmployeeSearchProps
	extends EmployeeSearchOwnProps,
		ReturnType<typeof mapDispatchToProps>,
		WithStyles<typeof styles>,
		WithTranslation {}

class EmployeeSearch extends React.Component<
	EmployeeSearchProps,
	EmployeeSearchState
> {
	searchField: HTMLInputElement;
	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			dialogOpen: false,
			results: []
		};
		this.searchEmployees = debounce(this.searchEmployees.bind(this), 250);
	}
	handleEmployeeCreation(employee: UIEmployee) {
		this.setState({ searchText: '', dialogOpen: false });
		if (employee) {
			this.handleSelect(employee);
		}

		this.searchEmployees();
	}
	componentDidUpdate(prevProps: EmployeeSearchProps) {
		if (this.props.anchorEl && !prevProps.anchorEl) {
			this.searchEmployees(this.state.searchText);
		}
	}
	onChangeInput(event: React.SyntheticEvent<HTMLInputElement>) {
		const searchText = event.currentTarget.value;
		const [firstName, lastName] = searchText
			? searchText.replace(/\s+/, '\n').split('\n')
			: ['', ''];
		this.props.prefillEmployeeCreationForm({ firstName, lastName });
		this.setState({ searchText });
		this.searchEmployees(searchText);
	}
	searchEmployees(search = '') {
		api
			.get<UIEmployee[]>('/api/v1/employees', { params: { search } })
			.then(({ data }) => this.setState({ results: data }));
	}
	handleSelect(employee: UIEmployee) {
		this.props.onSelect(employee);
		this.props.onClose();
	}
	render() {
		const { resetOption, disableCreation, t, classes } = this.props;
		const textCreateEmployee = this.state.searchText
			? t('employees:new_one', { name: this.state.searchText })
			: t('employees:label_create');
		return [
			<Menu
				key="0"
				open={Boolean(this.props.anchorEl)}
				anchorEl={this.props.anchorEl}
				getContentAnchorEl={null}
				onClose={this.props.onClose}
				disableAutoFocusItem
				onEntered={() => (this.searchField ? this.searchField.focus() : null)}
				classes={{ paper: classes.popover }}
			>
				<TextField
					className={classes.searchField}
					value={this.state.searchText}
					onChange={this.onChangeInput.bind(this)}
					placeholder={t('employees:search')}
					fullWidth
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
						inputRef: r => (this.searchField = r)
					}}
				/>
				{this.state.results.length
					? [
							<Divider key="divider" />,
							<div key="list" className={classes.results}>
								{this.state.results.map(employee => (
									<MenuItem
										key={employee.id}
										button
										onClick={() => this.handleSelect(employee)}
									>
										<div className={classes.menuItem}>
											<Highlight highlight={this.state.searchText}>
												{`${employee.firstName} ${employee.lastName}`}
											</Highlight>
										</div>
									</MenuItem>
								))}
							</div>
					  ]
					: null}
				{resetOption || !disableCreation
					? [
							<Divider key="divider" />,
							resetOption ? (
								<MenuItem
									key="reset"
									button
									onClick={() => this.handleSelect(resetOption.value)}
								>
									<div className={classes.menuItem}>{resetOption.text}</div>
								</MenuItem>
							) : null,
							!disableCreation ? (
								<MenuItem
									key="create"
									button
									onClick={() => this.setState({ dialogOpen: true })}
								>
									<div className={classes.menuItem}>{textCreateEmployee}</div>
								</MenuItem>
							) : null
					  ]
					: null}
			</Menu>,
			<EmployeeCreationDialog
				key="1"
				open={this.state.dialogOpen}
				onClose={employee => this.handleEmployeeCreation(employee)}
			/>
		];
	}
}

export default withTranslation()(
	withStyles(styles)(
		connect(
			null,
			mapDispatchToProps
		)(EmployeeSearch)
	)
);
