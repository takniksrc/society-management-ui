import SettingsComponent from "./Settings";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { blue } from '@material-ui/core/colors';
import { Button, CardHeader, Chip } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
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
					 
					<Card className="flex flex-col h-256 shadow w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16">
					<CardHeader
       					 avatar={
          					<Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
          						  Customer Type
         					 </Avatar>
     							 }/>
								 
						
						<CardContent className="flex flex-col flex-auto items-center justify-center">
						
							<div className="flex flex-shrink-0 items-center justify-between px-24 h-64">
						<Typography className="font-medium truncate" color="inherit">
														Customer Type
													</Typography>
							
						
							<Typography className="text-center text-16 font-medium">
							{customerType.map(item => (
								{item} 
								))}
								</Typography>
								</div>
						</CardContent>
					</Card>
					


						<div className="space-y-20">
							Customer Type
							<br />


							<div className="space-x-20">
								{customerType.map(item => (
									<Chip label={item} />
								))}
									</div>
						</div>
								{/*
									
					<Card className="flex flex-col flex-auto items-center justify-center" sx={{ minWidth: 275 }}>
					<div className="flex flex-shrink-0 items-center justify-between px-24 h-64"> </div>
					<CardContent>
						<Typography className="text-center text-16 font-medium">
							Customer Type
						</Typography>
						<Typography className="text-center text-13 mt-8 font-normal" color="textSecondary">
							{customerType.map(item => (
								{ item }
							))}
						</Typography>
					</CardContent>
				</Card>


{/*
<Chip label="Residential" size="large" color = "blue"/>
<Chip label="Commercial" />
<Chip label="Construction" />

<Button variant = "contained"> Residential </Button>
<Button variant="contained"> Commercial </Button>
<Button variant="contained"> Construction </Button>
*/}
						

						<div className="space-y-20">
							Residential Property Type
							<br />
							<div className="space-x-20">
								{ResidentialPropertyType.map(item => (
									<Chip label={item} />
								))}

							</div>
						</div>

						<div className="space-y-20">
							Commercial Property Type
							<br />
							<div className="space-x-20">
								{CommercialPropertyType.map(item => (
									<Chip label={item} />
								))}

							</div>
						</div>

						<div className="space-y-20">
							Residential Property Size
							<br />
							<div className="space-x-20">
								{ResidentialPropertySize.map(item => (
									<Chip label={item} />
								))}
							</div>
						</div>

						<div className="space-y-20">
							Commercial Property Size
							<br />
							<div className="space-x-20">
								{CommercialPropertySize.map(item => (
									<Chip label={item} />
								))}
							</div>
						</div>
					</div>
			}
		/>
	);
}

export default PropertyManagement;