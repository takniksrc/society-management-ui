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
	{ customerType: "Residential", propertyType: ["House", "Flat", "Plot"], propertySize: ["5 Marla", "7 Marla", "10 Marla", "1 Kanal", "2 Kanal"] },
	{ customerType: "Commercial", propertyType: ["Plot", "Shop"], propertySize: ["4 Marla", "8 Marla", "12 Marla"] },
	{ customerType: "Construction", propertyType: [], propertySize: [] }
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



				<div className="p-32">
					{propertyData.map((item, index) => (

						<Box key={index}
							className="p-16 w-full rounded-16 mb-24 border"
						>
							<Typography className="font-medium" variant="h6">{item.customerType}</Typography>

							<div className="flex flex-wrap -m-8 mt-8">
								{item.propertyType.map((itemone, index) => (
									<Box key={index}
										className="relative w-full sm:w-160 h-160 m-8 p-16 shadow rounded-16"
									>

										<Typography className="truncate text-16 font-medium">{itemone}</Typography>
										<div className="flex flex-wrap -m-8 mt-8 space-x-4 space-y-4">
											{item.propertySize.map((itemtwo, index) => (
												<Chip key={index} label={itemtwo} />

											))}
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


--------------------


// propertyData && (propertyData.length > 0 ? (
    <motion.div
    className="flex flex-wrap py-24"
    variants={Container}
    initial="hidden"
    animate="show"
>
    {propertyData.map(item => {

        return (
            <motion.div

                className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16"

            >
                <Card className="flex flex-col h-256 shadow">
                    <div
                        className="flex flex-shrink-0 items-center justify-between px-24 h-64"
                        style={{
                            background: "gray",
                            color: "red"
                        }}
                    >
                        <Typography className="font-medium truncate" color="inherit">
                            {item.customerType}
                        </Typography>
                        {propertyData.propertyType.map((item) => (
                            <div className="flex items-center justify-center opacity-75">

                                <Icon className="text-20 mx-8" color="inherit">
                                    access_time
                                </Icon>
                                <div className="text-14 font-medium whitespace-nowrap">
                                    {item.propertyType}
                                </div>

                            </div>
                        ))}
                    </div>
                    <CardContent className="flex flex-col flex-auto items-center justify-center">
                        <Typography className="text-center text-16 font-medium">
                            {item.propertySize}
                        </Typography>
                        <Typography
                            className="text-center text-13 mt-8 font-normal"
                            color="textSecondary"
                        >
                            {item.propertySize}
                        </Typography>
                    </CardContent>


                </Card>
            </motion.div>
        );
    })}
</motion.div>

