/*
function SettingsComponent() {
	return (
		<div> 
			<h1> Settings </h1> 
			<button> Property Management </button>
		</div>
	);
}
*/
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Avatar } from '@material-ui/core';
import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import PropertyManagement from './Property';


const useStyles = makeStyles({
	layoutRoot: {}
});

function SettingsComponent() {
	const classes = useStyles();

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-10 pt-40 font-extrabold">
					<h3>Settings </h3>
				</div>
			}
			contentToolbar={
				<div>
					
					<Button className="pl-400 font-semibold"  startIcon={<Avatar src="C:\Users\zirva\Downloads\Home-icon.svg.png" />}   component={Link} to="/Property"  > Property Management </Button>
					
				</div>
			}
			content={
				<div className="p-24">
					<br />
				</div>
			}
		/>
	);
}

export default SettingsComponent;
