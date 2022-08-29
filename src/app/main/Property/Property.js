import FusePageCarded from "@fuse/core/FusePageCarded";
import { motion } from "framer-motion";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import { Button, Chip, Container, Box } from '@material-ui/core';
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import SettingsComponent from "./Settings";
import _ from '@lodash';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import withReducer from 'app/store/withReducer';
import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
	layoutRoot: {}
});
/*
const customerType = ["Residential", "Commercial", "Construction"];
const ResidentialPropertyType = ["House", "Flat", "Plot"];
const CommercialPropertyType = ["Plot", "Shop"];
const ResidentialPropertySize = ["5 Marla", "7 Marla", "10 Marla", "1 Kanal", "2 Kanal"];
const CommercialPropertySize = ["4 Marla", "8 Marla", "12 Marla"];

*/

const propertyData = [
	{ id: 1, customerType: "Residential", propertyType: ["House", "Flat", "Plot"], propertySize: ["5 Marla", "7 Marla", "10 Marla", "1 Kanal", "2 Kanal"] },
	{ id: 2, customerType: "Commercial", propertyType: ["Plot", "Shop"], propertySize: ["4 Marla", "8 Marla", "12 Marla"] },
	{ id: 3, customerType: "Construction", propertyType: [], propertySize: [] }
];





function PropertyManagement() {
	const classes = useStyles();

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-10 pt-40 font-extrabold">
					<h3> Property Management </h3>
				</div>
			}
			content={

				propertyData &&
				(propertyData.length > 0 ? (
					<motion.div
						className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40"
						variants={Container}
						initial="hidden"
						animate="show"
					>
						{propertyData.map((item) => {
							return (
								<motion.div variants={item} key={item.id}>

									<Card className="flex flex-col h-384 shadow">
										<CardContent className="flex flex-col flex-auto p-24">
											<div className='w-full'>
												<div className="flex items-center justify-between mb-16">
													<Chip
														className="font-semibold text-12"
														label={item.customerType}
														sx={{
															color: "green",
															backgroundColor: "gray"

														}}
														size="small"
													/>

												<div>
													
														<Typography className="text-16 font-medium">{item.propertyType}</Typography>
						
													</div>
												</div>

												<Typography className="text-16 font-medium">{item.propertySize}</Typography>







											</div>
										</CardContent>
									</Card>
								</motion.div>
							);
						})}
					</motion.div>
				) : (
					<div className="flex flex-1 items-center justify-center">
						<Typography color="text.secondary" className="text-24 my-24">
							No courses found!
						</Typography>
					</div>
				))
			}


		/>
	);
}
export default PropertyManagement;

{/*
				<div className="p-32" >

					{propertyData.map((item) => (
						<Box className="p-16 w-full rounded-16 mb-24 border shadow bg-zinc-900"
						>
							<Typography className="font-medium" variant="h6"> {item.customerType} </Typography>
							<div className="flex flex-wrap -m-8 mt-8">

								{propertyData.map((item) => (

									
										<Box className="relative w-full sm:w-160 h-160 m-8 p-16 shadow rounded-16"
										>

											<Typography className="truncate text-14 font-medium" variant="h6"> {item.propertyType} </Typography>

										</Box>
									
								))}

								
								{/*

									<div className="flex flex-wrap -m-8 mt-8">
										{/*{customerType.map((item) => ( //
										<Box

											className="relative w-full sm:w-160 h-160 m-8 p-16 shadow rounded-16" >
											<div className="flex shrink flex-col justify-center text-center">
												<Typography className="truncate text-14 font-medium">{item.propertySize}</Typography>
											</div>
										</Box>

										{/*	))} // 
									</div>

								</Box>
							))}

							</div>
						</Box>
					))}



				</div>
			}
		/>
	);
}
export default PropertyManagement;
*/}