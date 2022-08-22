import { motion } from "framer-motion";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import { Button, Chip, Container } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import SettingsComponent from "./Settings";

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
			content={
				<motion.div className="flex flex-wrap py-24" variants={Container} >

					{customerType.map(item => (
						<motion.div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16 border mb-24" 
						style = {{
							background: "#F6F9FB"
						}}>
							

							<Card className="flex flex-col h-100 shadow">
								<div className="flex items-center justify-between mb-16">

									<Chip
										className=" content-center  h-40 font-semibold text-center text-lg pl-10 pt-10 px-24"
										label="Customer Type"

										style={{
											backgroundColor: "#d1fae5"

										}}
									/>
								</div>



								<CardContent>
									{/*
									<Typography variant="h6" component="div">
										Customer Type
									</Typography>
								*/}
									<Typography className="content-center text-center" variant="subtitle1" >
										<br />
										{item}
									</Typography>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			}

		/>
	);
}


export default PropertyManagement;

		/*			{ResidentialPropertyType.map(item => (
						<motion.div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16">
							<Card className="flex flex-col h-256 shadow">
								<div className="flex items-center justify-between mb-16">
									<Chip className="flex content-center px-24 w-fit h-40 font-semibold text-center text-lg" label="Residential Property Type" variant="h6"
										style={{
											backgroundColor: "#d1fae5",

										}}
									/>
								</div>
								<CardContent>


									<Typography variant="subtitle1" className=" justify-center content-center text-center">
										<br />
										{item}
									</Typography>
								</CardContent>
							</Card>
						</motion.div>
					))}

					{CommercialPropertyType.map(item => (
						<motion.div className="w-full pb-24 sm:w-1/2 lg:w-1/2 sm:p-16">
							<Card className="flex flex-col h-256 shadow">
								<Chip className="flex content-center px-24 w-fit h-40 font-semibold text-center text-lg" label="Commercial Property Type" variant="h6"
									style={{
										backgroundColor: "#d1fae5",

									}}
								/>
								<CardContent>

									<Typography className="content-center text-center" variant="subtitle1" >
										<br />
										{item}
									</Typography>
								</CardContent>
							</Card>
						</motion.div>
					))}

					{ResidentialPropertySize.map(item => (
						<motion.div className="w-full pb-24 sm:w-1/2 lg:w-1/5 sm:p-16">
							<Card className="flex flex-col h-256 shadow">
								<Chip className="flex content-center px-24  h-40 font-semibold text-center text-lg" label="Residential Property Size" variant="h6"
									style={{
										backgroundColor: "#d1fae5",

									}}
								/>
								<CardContent>

									<Typography className="content-center text-center" variant="subtitle1" >
										<br />
										{item}
									</Typography>
								</CardContent>
							</Card>
						</motion.div>
					))}

					{CommercialPropertySize.map(item => (
						<motion.div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16">
							<Card className="flex flex-col h-256 shadow">
								<Chip className="flex content-center px-24 w-fit h-40 font-semibold text-center text-lg" label="Commercial Property Size" variant="h6"
									style={{
										backgroundColor: "#d1fae5",

									}}
								/>
								<CardContent>

									<Typography className="content-center text-center" variant="subtitle1" >
										<br />
										{item}
									</Typography>
								</CardContent>
							</Card>
						</motion.div>
					))}


				</motion.div>
								*/


