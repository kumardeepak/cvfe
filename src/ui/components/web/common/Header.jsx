import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import history from "../../../../web.history";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1
	}
};

class Header extends React.Component {
	state = {
		open: false,
		auth: true,
		anchorEl: null
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleChange = (event, checked) => {
		this.setState({ auth: checked });
	};

	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		history.push("/")
	};

	render() {
		const { classes} = this.props;
		const { auth, anchorEl, open } = this.state;
		const openEl = Boolean(anchorEl);

		return (
			<div>
				<AppBar position="fixed" className={classNames(classes.appBar, open && classes.appBarShift)}>
					<Toolbar disableGutters={!open}  style={{paddingLeft:'50px'}}>
						
					<Typography
					className={classes.flex}
            gutterBottom
            variant="title"
            component="h2"
            style={{
              marginTop: "-.7%",
              textAlign:'center',
              
              paddingTop: "25px",
              paddingBottom: "8px"
            }}
          > Tarento.ai demonstration
              </Typography>
						{auth && (
							<div>
								<IconButton size="medium" style={{
              
              marginRight: "30px",fontSize:'24px'
              
              
             
            }}
									aria-owns={openEl ? 'menu-appbar' : null}
									aria-haspopup="true"
									onClick={this.handleMenu}
									color="inherit"
								>
									<AccountCircle/>
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									open={openEl}
									onClose={this.handleClose}
								>
									<MenuItem onClick={this.handleClose}>Logout</MenuItem>
									
								</Menu>
							</div>
						)}
					</Toolbar>
				</AppBar>
				
			</div>
		);
	}
}

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Header);
