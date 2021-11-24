import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ElevationScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
	  disableHysteresis: true,
	  threshold: 0,
	  target: window ? window() : undefined,
	});
  
	return React.cloneElement(children, {
	  elevation: trigger ? 4 : 0,
	});
  }

  ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
  };
  

function Navbar(props) {
    return (
		<React.Fragment>
			<CssBaseline />
			<ElevationScroll {...props}>
				<AppBar>
				<Toolbar>
					<Typography variant="h6" component="div" className="justify-content-between">
						<Link href="/">
							<a className="navbar-brand" href="#">Logo</a>
		 				</Link>
						<Link href="/cart">
							<a href="" style={{ position: 'fixed', right: 20 }}>
								<AddShoppingCartIcon />
							</a>
						</Link>
					</Typography>
				</Toolbar>
				</AppBar>
			</ElevationScroll>
			<Toolbar />
		</React.Fragment>
    )
}

export default Navbar