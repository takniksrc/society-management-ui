import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ReportsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/analysisreport/ReportsList/monthly_electricity_bill',
			component: lazy(() => import('./ReportsTemplates/MonthlyElectricityBill/MonthlyElectricityBillIndex'))
		},

		{
			path: '/analysisreport/ReportsList/meter_change_order',
			component: lazy(() => import('./ReportsTemplates/MeterChangeOrder/MeterChangeOrderIndex'))
		},
		{
			path: '/analysisreport/ReportsList/new_meter',
			component: lazy(() => import('./ReportsTemplates/NewMeter/NewMeterIndex'))
		},
		{
			path: '/analysisreport/ReportsList/faulty_meter',
			component: lazy(() => import('./ReportsTemplates/FaultyMeter/FaultyMeterIndex'))
		},
		{
			path: '/analysisreport/ReportsList/daily_amount_receive',
			component: lazy(() => import('./ReportsTemplates/DailyAmountRecieve/DailyAmountRecievedIndex'))
		},
		{
			path: '/analysisreport/ReportsList/rise_and_fall_of_unit',
			component: lazy(() => import('./ReportsTemplates/RiseAndFallOfUnit/RiseAndFallOfUnitIndex'))
		},
		{
			path: '/analysisreport/ReportsList/arrear_list_with_proper_age',
			component: lazy(() => import('./ReportsTemplates/ArrearListWithProperAge/ArrearsListIndex'))
		},
		{
			path: '/analysisreport/ReportsList/temporarily_disconnected_order',
			component: lazy(() => import('./ReportsTemplates/DisconnectedMeter/DisconnectedMeterIndex'))
		},
		{
			path: '/analysisreport/ReportsList/permanent_disconnection_order',
			component: lazy(() => import('./ReportsTemplates/PermanentlyDisconnectedMeter/PermanentlyDisconnectedMeterIndex'))
		},
		{
			path: '/analysisreport/ReportsList',
			component: lazy(() => import('./ReportsBoxesList/ReportsIndex'))
		},
		{
			path: '/analysisreport',
			component: () => <Redirect to="/analysisreport/ReportsList" />
		}
	]
};

export default ReportsConfig;
