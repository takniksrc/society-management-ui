import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/analysisreport/ReportsBoxesList/monthly_electricity_bill',
			component: lazy(() => import('./ReportsTemplates/MonthlyElectricityBill/monthlyElectricity'))
		},

		{
			path: '/analysisreport/ReportsBoxesList/meter_change_order',
			component: lazy(() => import('./ReportsTemplates/meterChangeOrder/disconnectedMeter'))
		},
		{
			path: '/analysisreport/ReportsBoxesList/new_meter',
			component: lazy(() => import('./ReportsTemplates/NewMeter/disconnectedMeter'))
		},
		{
			path: '/analysisreport/ReportsBoxesList/faulty_meter',
			component: lazy(() => import('./ReportsTemplates/FaultyMeter/disconnectedMeter'))
		},
		{
			path: '/analysisreport/ReportsBoxesList/daily_amount_receive',
			component: lazy(() => import('./ReportsTemplates/DailyAmountRecieve/disconnectedMeter'))
		},
		{
			path: '/analysisreport/ReportsBoxesList/rise_and_fall_of_unit',
			component: lazy(() => import('./ReportsTemplates/RiseAndFallOfUnit/disconnectedMeter'))
		},
		{
			path: '/analysisreport/ReportsBoxesList/arrear_list_with_proper_age',
			component: lazy(() => import('./ReportsTemplates/ArrearListWithProperAge/ArrearsListIndex'))
		},
		{
			path: '/analysisreport/ReportsBoxesList/temporarily_disconnected_order',
			component: lazy(() => import('./ReportsTemplates/DisconnectedMeter/disconnectedMeter'))
		},
		{
			path: '/analysisreport/ReportsBoxesList/permanent_disconnection_order',
			component: lazy(() => import('./ReportsTemplates/PermanentlyDisconnectedMeter/disconnectedMeter'))
		},
		{
			path: '/analysisreport/ReportsBoxesList',
			component: lazy(() => import('./ReportsBoxesList/ReportsIndex'))
		},
		{
			path: '/analysisreport',
			component: () => <Redirect to="/analysisreport/boards" />
		}
	]
};

export default ScrumboardAppConfig;
