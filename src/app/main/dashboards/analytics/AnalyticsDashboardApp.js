import Typography from '@material-ui/core/Typography';
import ReactApexChart from 'react-apexcharts';
import withReducer from 'app/store/withReducer';
import { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';

import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { motion } from 'framer-motion';
import reducer from './store';
import { selectWidgetsEntities, getCharts } from './store/widgetsSlice';

function AnalyticsDashboardApp() {
	const dispatch = useDispatch();
	const Charts = useSelector(({ analyticsDashboardApp }) => analyticsDashboardApp.widgets);
	console.log('i am new charts', Charts?.total_payments?.total_receiveble);
	const [meter, setMeter] = useState({
		series: [
			Charts?.meter_types?.meter_type_normal,
			Charts?.meter_types?.meter_type_2_Phase,
			Charts?.meter_types?.meter_type_3_Phase
		],
		options: {
			chart: {
				height: 350,
				type: 'radialBar'
			},
			plotOptions: {
				radialBar: {
					offsetY: 0,
					startAngle: 0,
					endAngle: 270,
					hollow: {
						margin: 5,
						size: '30%',
						background: 'transparent',
						image: undefined
					},
					dataLabels: {
						name: {
							show: false
						},
						value: {
							show: false
						}
					}
				}
			},
			colors: ['#1ab7ea', '#0084ff', '#39539E'],
			labels: ['Normal', '2-Phase', '3-Phase'],
			legend: {
				show: true,
				floating: true,
				fontSize: '16px',
				position: 'left',
				offsetX: 160,
				offsetY: 15,
				labels: {
					useSeriesColors: true
				},
				markers: {
					size: 0
				},
				formatter: function (seriesName, opts) {
					return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
				},
				itemMargin: {
					vertical: 3
				}
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							show: false
						}
					}
				}
			]
		}
	});
	console.log(
		'I am valiue',
		// (Charts?.total_payments?.total_received
		(2400 / Charts?.total_payments?.total_receiveble) * 100
	);
	const [payment, setPayemnt] = useState({
		series: [
			(
				((Charts?.total_payments?.total_received === null ? 2000 : Charts?.total_payments?.total_received) /
					Charts?.total_payments?.total_receiveble) *
				100
			).toFixed(2)
		],
		options: {
			chart: {
				height: 350,
				type: 'radialBar'
			},
			plotOptions: {
				radialBar: {
					hollow: {
						size: '70%'
					}
				}
			},
			labels: ['Total Recieved']
		}
	});

	const [state, setstate] = useState({
		series: [
			{
				name: 'Connections',
				data: [
					Charts?.ka_electricity_connection?.total_connection,
					Charts?.ka_electricity_connection?.new_connection
				]
			}
		],
		options: {
			chart: {
				type: 'bar',
				height: 350,
				toolbar: {
					show: false
				}
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '20%',
					endingShape: 'rounded'
				}
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent']
			},
			xaxis: {
				categories: ['KA Total Connections', 'New Connections this month']
			},
			yaxis: {
				title: {
					text: 'Connections'
				}
			},
			fill: {
				opacity: 1
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return val + ' connections';
					}
				}
			}
		}
	});
	const [wapda, setWapda] = useState({
		series: [
			{
				name: 'Connections',
				data: [
					Charts?.wapda_electricity_connection?.total_connection,
					Charts?.wapda_electricity_connection?.new_connection
				]
			}
		],
		options: {
			chart: {
				type: 'bar',
				height: 350,
				toolbar: {
					show: false
				}
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '20%',
					endingShape: 'rounded'
				}
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent']
			},
			xaxis: {
				categories: ['Wapda Total Connections', 'New Connections this month']
			},
			yaxis: {
				title: {
					text: 'Connections'
				}
			},
			fill: {
				opacity: 1
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return val + ' connections';
					}
				}
			}
		}
	});
	const [faulty, setFaulty] = useState({
		series: [Charts?.total_faulty_meter?.faulty_meter],
		options: {
			chart: {
				height: 350,
				type: 'radialBar',
				toolbar: {
					show: false
				}
			},
			plotOptions: {
				radialBar: {
					startAngle: -135,
					endAngle: 225,
					hollow: {
						margin: 0,
						size: '70%',
						background: '#fff',
						image: undefined,
						imageOffsetX: 0,
						imageOffsetY: 0,
						position: 'front',
						dropShadow: {
							enabled: true,
							top: 3,
							left: 0,
							blur: 4,
							opacity: 0.24
						}
					},
					track: {
						background: '#fff',
						strokeWidth: '67%',
						margin: 0, // margin is in pixels
						dropShadow: {
							enabled: true,
							top: -3,
							left: 0,
							blur: 4,
							opacity: 0.35
						}
					},

					dataLabels: {
						show: true,
						name: {
							offsetY: -10,
							show: true,
							color: '#888',
							fontSize: '17px'
						},
						value: {
							formatter: function (val) {
								return parseInt(val);
							},
							color: '#111',
							fontSize: '36px',
							show: true
						}
					}
				}
			},
			fill: {
				type: 'gradient',
				gradient: {
					shade: 'dark',
					type: 'horizontal',
					shadeIntensity: 0.5,
					gradientToColors: ['#ABE5A1'],
					inverseColors: true,
					opacityFrom: 1,
					opacityTo: 1,
					stops: [0, 100]
				}
			},
			stroke: {
				lineCap: 'round'
			},
			labels: ['Total faulty Meters']
		}
	});

	useEffect(() => {
		dispatch(getCharts()).then(data => {
			console.log('i am called in then block', data.payload);
			setFaulty({
				series: [data.payload?.total_faulty_meter?.faulty_meter],
				options: {
					chart: {
						height: 350,
						type: 'radialBar',
						toolbar: {
							show: false
						}
					},
					plotOptions: {
						radialBar: {
							startAngle: -135,
							endAngle: 225,
							hollow: {
								margin: 0,
								size: '70%',
								background: '#fff',
								image: undefined,
								imageOffsetX: 0,
								imageOffsetY: 0,
								position: 'front',
								dropShadow: {
									enabled: true,
									top: 3,
									left: 0,
									blur: 4,
									opacity: 0.24
								}
							},
							track: {
								background: '#fff',
								strokeWidth: '67%',
								margin: 0, // margin is in pixels
								dropShadow: {
									enabled: true,
									top: -3,
									left: 0,
									blur: 4,
									opacity: 0.35
								}
							},

							dataLabels: {
								show: true,
								name: {
									offsetY: -10,
									show: true,
									color: '#888',
									fontSize: '17px'
								},
								value: {
									formatter: function (val) {
										return parseInt(val);
									},
									color: '#111',
									fontSize: '36px',
									show: true
								}
							}
						}
					},
					fill: {
						type: 'gradient',
						gradient: {
							shade: 'dark',
							type: 'horizontal',
							shadeIntensity: 0.5,
							gradientToColors: ['#ABE5A1'],
							inverseColors: true,
							opacityFrom: 1,
							opacityTo: 1,
							stops: [0, 100]
						}
					},
					stroke: {
						lineCap: 'round'
					},
					labels: ['Total faulty Meters']
				}
			});

			setWapda({
				series: [
					{
						name: 'Connections',
						data: [
							data.payload.wapda_electricity_connection?.total_connection,
							data.payload.wapda_electricity_connection?.new_connection
						]
					}
				],
				options: {
					chart: {
						type: 'bar',
						height: 350,
						toolbar: {
							show: false
						}
					},
					plotOptions: {
						bar: {
							horizontal: false,
							columnWidth: '20%',
							endingShape: 'rounded'
						}
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						show: true,
						width: 2,
						colors: ['transparent']
					},
					xaxis: {
						categories: ['Wapda Total Connections', 'New Connections this month']
					},
					yaxis: {
						title: {
							text: 'Connections'
						}
					},
					fill: {
						opacity: 1
					},
					tooltip: {
						y: {
							formatter: function (val) {
								return val + ' connections';
							}
						}
					}
				}
			});

			setstate({
				series: [
					{
						name: 'Connections',
						data: [
							data.payload.ka_electricity_connection?.total_connection,
							data.payload.ka_electricity_connection?.new_connection
						]
					}
				],
				options: {
					chart: {
						type: 'bar',
						height: 350,
						toolbar: {
							show: false
						}
					},
					plotOptions: {
						bar: {
							horizontal: false,
							columnWidth: '20%',
							endingShape: 'rounded'
						}
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						show: true,
						width: 2,
						colors: ['transparent']
					},
					xaxis: {
						categories: ['KA Total Connections', 'New Connections this month']
					},
					yaxis: {
						title: {
							text: 'Connections'
						}
					},
					fill: {
						opacity: 1
					},
					tooltip: {
						y: {
							formatter: function (val) {
								return val + ' connections';
							}
						}
					}
				}
			});

			setPayemnt({
				series: [
					(
						((data.payload.total_payments?.total_received === null
							? 2000
							: data.payload.total_payments?.total_received) /
							data.payload.total_payments?.total_receiveble) *
						100
					).toFixed(2)
				],
				options: {
					chart: {
						height: 350,
						type: 'radialBar'
					},
					plotOptions: {
						radialBar: {
							hollow: {
								size: '70%'
							}
						}
					},
					labels: ['Total Recieved']
				}
			});

			// setMeter({
			// 	series: [
			// 		data.payload.meter_types?.meter_type_normal,
			// 		data.payload.meter_types?.meter_type_2_Phase,
			// 		data.payload.meter_types?.meter_type_3_Phase
			// 	],
			// 	options: {
			// 		chart: {
			// 			height: 350,
			// 			type: 'radialBar'
			// 		},
			// 		plotOptions: {
			// 			radialBar: {
			// 				offsetY: 0,
			// 				startAngle: 0,
			// 				endAngle: 270,
			// 				hollow: {
			// 					margin: 5,
			// 					size: '30%',
			// 					background: 'transparent',
			// 					image: undefined
			// 				},
			// 				dataLabels: {
			// 					name: {
			// 						show: false
			// 					},
			// 					value: {
			// 						show: false
			// 					}
			// 				}
			// 			}
			// 		},
			// 		colors: ['#1ab7ea', '#0084ff', '#39539E'],
			// 		labels: ['Normal', '2-Phase', '3-Phase'],
			// 		legend: {
			// 			show: true,
			// 			floating: true,
			// 			fontSize: '16px',
			// 			position: 'left',
			// 			offsetX: 160,
			// 			offsetY: 15,
			// 			labels: {
			// 				useSeriesColors: true
			// 			},
			// 			markers: {
			// 				size: 0
			// 			},
			// 			formatter: function (seriesName, opts) {
			// 				return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
			// 			},
			// 			itemMargin: {
			// 				vertical: 3
			// 			}
			// 		},
			// 		responsive: [
			// 			{
			// 				breakpoint: 480,
			// 				options: {
			// 					legend: {
			// 						show: false
			// 					}
			// 				}
			// 			}
			// 		]
			// 	}
			// });
		});
	}, [dispatch]);


	const container = {
		show: {
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<motion.div
			className="flex flex-wrap p-28 items-center justify-center"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<Card className="w-3/12 rounded-20 shadow m-28 min-h-[30%]">
				{/* <ReactApexChart options={payment.options} series={payment.series} type="pie" height={350} /> */}
				<ReactApexChart options={payment.options} series={payment.series} type="radialBar" height={350} />
			</Card>
			<Card className="w-3/12 rounded-20 shadow m-28">
				<ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
			</Card>
			<Card className="w-3/12 rounded-20 shadow m-28">
				<ReactApexChart options={wapda.options} series={wapda.series} type="bar" height={350} />
			</Card>
			<Card className="w-2/5 rounded-20 shadow m-28">
				<ReactApexChart options={meter.options} series={meter.series} type="radialBar" height={350} />
			</Card>
			<Card className="w-2/5 rounded-20 shadow m-28">
				<ReactApexChart options={faulty.options} series={faulty.series} type="radialBar" height={350} />
			</Card>
		</motion.div>

		// <div className="w-full">
		// 	{/* <Widget1 data={Charts} /> */}
		// 	<motion.div
		// 		className="flex flex-col md:flex-row sm:p-8 container"
		// 		variants={container}
		// 		initial="hidden"
		// 		animate="show"
		// 	>
		// 		<motion.div variants={item} className="widget w-full p-16 pb-48">
		// 			<ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
		// 		</motion.div>
		// 	</motion.div>

		// 	<ReactApexChart options={payment.options} series={payment.series} type="pie" width={380} />
		// 	<ReactApexChart options={meter.options} series={meter.series} type="radialBar" height={350} />
		// 	{/* <motion.div
		// 		className="flex flex-col md:flex-row sm:p-8 container"
		// 		variants={container}
		// 		initial="hidden"
		// 		animate="show"
		// 	>
		// 		<div className="flex flex-1 flex-col min-w-0 pt-16">
		// 			<Typography
		// 				component={motion.div}
		// 				variants={item}
		// 				className="px-16 pb-8 text-18 font-normal"
		// 				color="textSecondary"
		// 			>
		// 				How are your active users trending over time?
		// 			</Typography>

		// 			<div className="flex flex-col sm:flex sm:flex-row pb-32">
		// 				<motion.div variants={item} className="widget flex w-full sm:w-1/3 p-16">
		// 					<Widget2 data={widgets.widget2} />
		// 				</motion.div>

		// 				<motion.div variants={item} className="widget flex w-full sm:w-1/3 p-16">
		// 					<Widget3 data={widgets.widget3} />
		// 				</motion.div>

		// 				<motion.div variants={item} className="widget w-full sm:w-1/3 p-16">
		// 					<Widget4 data={widgets.widget4} />
		// 				</motion.div>
		// 			</div>

		// 			<Typography
		// 				component={motion.div}
		// 				variants={item}
		// 				className="px-16 pb-8 text-18 font-normal"
		// 				color="textSecondary"
		// 			>
		// 				How many pages your users visit?
		// 			</Typography>

		// 			<motion.div variants={item} className="widget w-full p-16 pb-48">
		// 				<Widget5 data={widgets.widget5} />
		// 			</motion.div>

		// 			<Typography
		// 				component={motion.div}
		// 				variants={item}
		// 				className="px-16 pb-8 text-18 font-normal"
		// 				color="textSecondary"
		// 			>
		// 				Where are your users?
		// 			</Typography>

		// 			<motion.div variants={item} className="widget w-full p-16 pb-32">
		// 				<Widget6 data={widgets.widget6} />
		// 			</motion.div>
		// 		</div>

		// 		<div className="flex flex-wrap w-full md:w-320 pt-16">
		// 			<div className="mb-32 w-full sm:w-1/2 md:w-full">
		// 				<Typography
		// 					component={motion.div}
		// 					variants={item}
		// 					className="px-16 pb-8 text-18 font-normal"
		// 					color="textSecondary"
		// 				>
		// 					What are your top devices?
		// 				</Typography>

		// 				<motion.div variants={item} className="widget w-full p-16">
		// 					<Widget7 data={widgets.widget7} />
		// 				</motion.div>
		// 			</div>

		// 			<div className="mb-32 w-full sm:w-1/2 md:w-full">
		// 				<Typography
		// 					component={motion.div}
		// 					variants={item}
		// 					className="px-16 pb-8 text-18 font-normal"
		// 					color="textSecondary"
		// 				>
		// 					How are your sales?
		// 				</Typography>

		// 				<motion.div variants={item} className="widget w-full p-16">
		// 					<Widget8 data={widgets.widget8} />
		// 				</motion.div>
		// 			</div>

		// 			<div className="mb-32 w-full sm:w-1/2 md:w-full">
		// 				<Typography
		// 					component={motion.div}
		// 					variants={item}
		// 					className="px-16 pb-8 text-18 font-normal lg:pt-0"
		// 					color="textSecondary"
		// 				>
		// 					What are your top campaigns?
		// 				</Typography>
		// 				<motion.div variants={item} className="widget w-full p-16">
		// 					<Widget9 data={widgets.widget9} />
		// 				</motion.div>
		// 			</div>
		// 		</div>
		// 	</motion.div> */}
		// </div>
	);
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
