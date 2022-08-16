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

const customerType = ["Residential", "Commercial", "Construction"];
const ResidentialPropertyType = ["House", "Flat", "Plot"];
const CommercialPropertyType = ["Plot", "Shop"];
const ResidentialPropertySize = ["5 Marla", "7 Marla", "10 Marla", "1 Kanal", "2 Kanal"];
const CommercialPropertySize = ["4 Marla", "8 Marla", "12 Marla"];

function PropertyManagement() {
const classes = useStyles();

return (
	<FusePageSimple
		classes={{
			root: classes.layoutRoot
		}}
		header={
			<div className="px-10 pt-40 font-extrabold">
				<h4> Property Management </h4>
			</div>
		}
		
			content= {
				<div className="p-24 space-y-20">
				<div className="space-y-20">
					Customer Type
					<br/>

					
					<div className="space-x-20">
					{customerType.map(item => (
						<Chip label= {item} />
					))}
							
							
					
					{/* 
					<Chip label="Residential" size="large" color = "blue"/>
					<Chip label="Commercial" />
					<Chip label="Construction" />
					
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
					 {ResidentialPropertyType.map(item => (
						<Chip label= {item} />
					))}
					 
					</div>
					</div>

					<div className="space-y-20">
					Commercial Property Type
					 <br/>
					 <div className="space-x-20">
					 {CommercialPropertyType.map(item => (
						<Chip label= {item} />
					))}
					
					</div>
					</div>

					<div className="space-y-20">
					Residential Property Size
					 <br/>
					 <div className="space-x-20">
					 {ResidentialPropertySize.map(item => (
						<Chip label= {item} />
					))}
					</div>
					</div>

					<div className="space-y-20">
					Commercial Property Size
					 <br/>
					 <div className="space-x-20">
					 {CommercialPropertySize.map(item => (
						<Chip label= {item} />
					))}
					</div>
					</div>
				</div>
			}
		/>
	);
}

export default PropertyManagement;