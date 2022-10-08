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
	console.log('i am new charts', Charts?.total_payments);
	const [meter, setMeter] = useState();
	const [payment, setPayemnt] = useState();

	const [state, setstate] = useState();
	const [wapda, setWapda] = useState();
	const [faulty, setFaulty] = useState();

	useEffect(() => {
		dispatch(getCharts()).then(data => {
			console.log('i am called in then block', data.payload);
			setFaulty({
				series: [
					data.payload?.total_faulty_meter?.faulty_meter ? data.payload?.total_faulty_meter?.faulty_meter : 0
				],
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
			console.log(
				(data.payload?.total_payments?.total_received ? data.payload?.total_payments?.total_received : 1) /
					(data.payload?.total_payments?.total_receiveble
						? data.payload?.total_payments?.total_receiveble
						: 1),
				'new'
			);

			setWapda({
				series: [
					{
						name: 'Connections',
						data: [
							data.payload?.wapda_electricity_connection?.total_connection
								? data.payload?.wapda_electricity_connection?.total_connection
								: 0,
							data.payload?.wapda_electricity_connection?.new_connection
								? data.payload?.wapda_electricity_connection?.new_connection
								: 0
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
						categories: ['Total Connections', 'New Connections']
					},
					yaxis: {
						title: {
							text: 'Connections'
						}
					},
					fill: {
						opacity: 1
					},
					title: {
						text: 'Lesco Electricity'
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
							data.payload?.ka_electricity_connection?.total_connection
								? data.payload?.ka_electricity_connection?.total_connection
								: 0,
							data.payload?.ka_electricity_connection?.new_connection
								? data.payload?.ka_electricity_connection?.new_connection
								: 0
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
						categories: ['Total Connections', 'New Connections']
					},
					yaxis: {
						title: {
							text: 'Connections'
						}
					},
					fill: {
						opacity: 1
					},
					title: {
						text: 'Khyaban-e-Amin Electricity'
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
						((data.payload?.total_payments?.total_received
							? data.payload?.total_payments?.total_received
							: 0) /
							(data.payload?.total_payments?.total_receiveble
								? data.payload?.total_payments?.total_receiveble
								: 1)) *
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

			setMeter({
				series: [
					data.payload?.meter_types?.meter_type_normal ? data.payload?.meter_types?.meter_type_normal : 0,
					data.payload?.meter_types?.meter_type_2_Phase ? data.payload?.meter_types?.meter_type_2_Phase : 0,
					data.payload?.meter_types?.meter_type_3_Phase ? data.payload?.meter_types?.meter_type_3_Phase : 0
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
						offsetX: 80,
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
			className="grid grid-cols-6 gap-28 p-28 justify-center "
			variants={container}
			initial="hidden"
			animate="show"
		>
			<Card className="rounded-20 shadow basis-1/3 col-span-2 lg:col-span-2 sm:col-span-6 col-span-6">
				{/* <ReactApexChart options={payment.options} series={payment.series} type="pie" height={350} /> */}
				{!!payment && (
					<ReactApexChart options={payment.options} series={payment.series} type="radialBar" height={350} />
				)}
				<Typography style={{ textAlign: 'center', marginTop: '-1.7rem', paddingBottom: '0.5rem' }}>
					<b>Total Recieved :</b> {Charts?.total_payments?.total_received.toFixed(2)}
				</Typography>
				<Typography style={{ textAlign: 'center', paddingBottom: '1rem' }}>
					<b>Total Recievable :</b> {Charts?.total_payments?.total_receiveble.toFixed(2)}
				</Typography>
			</Card>
			<Card className="rounded-20 shadow basis-1/3 col-span-2 lg:col-span-2 sm:col-span-6 col-span-6 p-12">
				{!!state && <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />}
			</Card>
			<Card className="rounded-20 shadow basis-1/3 col-span-2 lg:col-span-2 sm:col-span-6 col-span-6 p-12">
				{!!wapda && <ReactApexChart options={wapda.options} series={wapda.series} type="bar" height={350} />}
			</Card>
			<Card className="rounded-20 shadow col-span-3 lg:col-span-3 sm:col-span-6 col-span-6">
				{!!meter && (
					<ReactApexChart options={meter.options} series={meter.series} type="radialBar" height={380} />
				)}
			</Card>
			<Card className="rounded-20 shadow basis-1/4 col-span-3 lg:col-span-3 sm:col-span-6 col-span-6">
				{!!faulty && (
					<ReactApexChart options={faulty.options} series={faulty.series} type="radialBar" height={350} />
				)}
			</Card>
		</motion.div>
	);
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
