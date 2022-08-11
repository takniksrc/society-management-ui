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
import { Button } from '@material-ui/core';
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
				<div className="p-24">
					<h4>Settings </h4>
				</div>
			}
			contentToolbar={
				<div >
					{/*<Link to="/example/Property"> Property Management </Link> */}
					{/* <Link to="/Property"> Property Management </Link> */}
					<Button component={Link} to="/Property"  > Property Management </Button>
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
