import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import classNames from 'classnames';
import { withWidth, createStyles, Theme, WithStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import QuestionAnswerRounded from '@material-ui/icons/QuestionAnswerRounded';
import { openSidebar, closeSidebar } from './actions';
import { State } from '../reducers';

const styles = (theme: Theme) =>
	createStyles({
		hide: {
			display: 'none'
		},
		drawerPaper: {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: theme.spacing(22),
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
		},
		drawerPaperClose: {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			width: theme.spacing(7),
			'@media print': {
				display: 'none'
			}
		},
		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		logOut: {
			transform: 'rotate(180deg)'
		},
		justifyCenter: {
			justifyContent: 'center'
		},
		justifyFlexEnd: {
			justifyContent: 'flex-end'
		},
		flexGrow: {
			flexGrow: 1
		},
		flexDirColumn: {
			flexDirection: 'column'
		},
		flex: {
			display: 'flex'
		},
		link: {
			textDecoration: 'none',
			color: 'inherit'
		},
		activeLink: {
			'& > *': {
				background: theme.palette.grey[200]
			}
		},
		logo: {
			width: '100px',
			margin: '12px'
		},
		icon: {
			minWidth: theme.spacing(5)
		}
	});

const mapStateToProps = (state: State) => ({
	open: state.sidebar.open
});
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			openSidebar,
			closeSidebar
		},
		dispatch
	);

interface SidebarAppProps
	extends WithStyles<typeof styles>,
		WithWidth,
		ReturnType<typeof mapStateToProps>,
		ReturnType<typeof mapDispatchToProps>,
		RouteComponentProps<{}>,
		WithTranslation {}

class SidebarApp extends React.Component<SidebarAppProps> {
	render() {
		const { open, classes, t, width } = this.props;

		const isSmall = width === 'xs' || width === 'sm';
		return (
			<Drawer
				variant={isSmall ? 'temporary' : 'permanent'}
				classes={{
					paper: classNames(
						classes.drawerPaper,
						!open && classes.drawerPaperClose
					)
				}}
				open={open}
				onClose={this.props.closeSidebar}
			>
				{!isSmall
					? [
							<div className={classes.toolbar} key="0">
								<IconButton
									onClick={
										open ? this.props.closeSidebar : this.props.openSidebar
									}
								>
									{!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
								</IconButton>
							</div>,
							<Divider key="1" />
					  ]
					: null}
				<List component="nav">
					<NavLink
						to={{ pathname: '/app/admin' }}
						className={classes.link}
						activeClassName={classes.activeLink}
						onClick={this.props.closeSidebar}
					>
						<ListItem button>
							<ListItemIcon className={classes.icon}>
								<QuestionAnswerRounded />
							</ListItemIcon>
							<ListItemText primary={t('sidebar:questions')} />
						</ListItem>
					</NavLink>
				</List>
				<Divider />
				<List component="nav">
					<NavLink
						to={{ pathname: '/app/test' }}
						className={classes.link}
						activeClassName={classes.activeLink}
						onClick={this.props.closeSidebar}
					>
						<ListItem button>
							<ListItemIcon className={classes.icon}>
								<PlaylistAddCheck />
							</ListItemIcon>
							<ListItemText primary={t('sidebar:test')} />
						</ListItem>
					</NavLink>
				</List>
			</Drawer>
		);
	}
}

export default withRouter(
	withTranslation()(
		withWidth()(
			withStyles(styles)(
				connect(
					mapStateToProps,
					mapDispatchToProps
				)(SidebarApp)
			)
		)
	)
);
