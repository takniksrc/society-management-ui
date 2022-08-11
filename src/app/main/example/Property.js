import SettingsComponent from "./Settings";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	layoutRoot: {}
});


function PropertyManagement() {
const classes = useStyles();

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot, 
			
			}}
			header={
				<div className="p-24">
					<h4>             Property Management </h4>
				</div>
			}
			/*
			contentToolbar={
				<div className="px-24">

				</div>
			}
			*/
			content={
				<div className="p-24">
					<div display="flex"  justifyContent="space-between">
					Customer Type
					 <br/>

					 {/* <Button variant="contained" style
					 ={{
                position: 'absolute',
                right: 5,
                top: 5,
          }}> Residential </Button> 
		*/}
		  			<Button variant = "contained" > Residential </Button>
					<Button variant="contained"> Commercial </Button>
					<Button variant="contained"> Construction </Button>
					</div>

					<div>
					Residential Property Type
					 <br/>
		  			<Button variant="contained"> House </Button>
					<Button variant="contained"> Flat </Button>
					<Button variant="contained"> Plot </Button>
					</div>

					<div>
					Commercial Property Type
					 <br/>
		  			<Button variant="contained"> Plot </Button>
					<Button variant="contained"> Shop </Button>
					</div>

					<div>
					Residential Property Size
					 <br/>
		  			<Button variant="contained"> 5 Marla </Button>
					<Button variant="contained"> 7 Marla  </Button>
					<Button variant="contained"> 10 Marla </Button>
					<Button variant="contained"> 1 Kanal </Button>
					<Button variant="contained"> 2 Kanal </Button>
					</div>

					<div>
					Commercial Property Size
					 <br/>
		  			<Button variant="contained"> 4 Marla </Button>
					<Button variant="contained"> 8 Marla  </Button>
					<Button variant="contained"> 12 Marla </Button>
					</div>
				</div>
			}
		/>
	);
}

export default PropertyManagement;