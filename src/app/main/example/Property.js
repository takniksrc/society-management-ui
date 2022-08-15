import SettingsComponent from "./Settings";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Chip } from '@material-ui/core';
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
			root: classes.layoutRoot
		}}
		header={
			<div className="p-24 font-extrabold">
				<h4> Property Management </h4>
			</div>
		}
		/*
		contentToolbar={
			<div >
			
				<Button component={Link} to="/Property"  > Property Management </Button>
			</div>
		}
			*/
			content= {
				<div className="p-24 space-y-20">
				<div className="space-y-20">
					Customer Type
					<br/>

					<div className="space-x-20">
					<Chip label="Residential" size="large" color = "blue"/>
					<Chip label="Commercial" />
					<Chip label="Construction" />
					{/* 
					<Button variant = "contained"> Residential </Button>
					<Button variant="contained"> Commercial </Button>
					<Button variant="contained"> Construction </Button>
					*/}
					</div>
					</div>
			
					<div className="space-y-20">
					Residential Property Type
					 <br/>
					 <div className="space-x-20">
					 <Chip label="House" size="large" color = "blue"/>
					<Chip label="Flat" />
					<Chip label="Plot" />
					{/* 
		  			<Button variant="contained"> House </Button>
					<Button variant="contained"> Flat </Button>
					<Button variant="contained"> Plot </Button>
					*/}
					</div>
					</div>

					<div className="space-y-20">
					Commercial Property Type
					 <br/>
					 <div className="space-x-20">
					 <Chip label="Plot" size="large" color = "blue"/>
					<Chip label="Shop" />
					{/* 
		  			<Button variant="contained"> Plot </Button>
					<Button variant="contained"> Shop </Button>
					*/}
					</div>
					</div>

					<div className="space-y-20">
					Residential Property Size
					 <br/>
					 <div className="space-x-20">
					 <Chip label="5 Marla" size="large" color = "blue"/>
					<Chip label="7 Marla" />
					<Chip label="10 Marla" />
					<Chip label="1 Kanal" />
					<Chip label="2 Kanal" />
					{/* 
		  			<Button variant="contained"> 5 Marla </Button>
					<Button variant="contained"> 7 Marla  </Button>
					<Button variant="contained"> 10 Marla </Button>
					<Button variant="contained"> 1 Kanal </Button>
					<Button variant="contained"> 2 Kanal </Button>
					*/}
					</div>
					</div>

					<div className="space-y-20">
					Commercial Property Size
					 <br/>
					 <div className="space-x-20">
					 <Chip label="4 Marla" />
					 <Chip label="8 Marla" />
					 <Chip label="12 Marla" />
					 {/*}
		  			<Button variant="contained"> 4 Marla </Button>
					<Button variant="contained"> 8 Marla  </Button>
					<Button variant="contained"> 12 Marla </Button>
					*/}
					</div>
					</div>
				</div>
			}
		/>
	);
}

export default PropertyManagement;