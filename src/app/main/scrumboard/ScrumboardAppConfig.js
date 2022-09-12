import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/analysisreport/boards/monthly_electricity_bill',
			component: lazy(() => import('./board/MonthlyElectricityBill/monthlyElectricity'))
		},
		{
			path: '/analysisreport/boards/meter_change_order',
			component: lazy(() => import('./board/meterChangeOrder/disconnectedMeter'))
		},
		{
			path: '/analysisreport/boards/new_meter',
			component: lazy(() => import('./board/NewMeter/disconnectedMeter'))
		},
		{
			path: '/analysisreport/boards/faulty_meter',
			component: lazy(() => import('./board/FaultyMeter/disconnectedMeter'))
		},
		{
			path: '/analysisreport/boards/daily_amount_receive',
			component: lazy(() => import('./board/DailyAmountRecieve/disconnectedMeter'))
		},
		{
			path: '/analysisreport/boards/rise_and_fall_of_unit',
			component: lazy(() => import('./board/RiseAndFallOfUnit/disconnectedMeter'))
		},
		{
			path: '/analysisreport/boards/arrear_list_with_proper_age',
			component: lazy(() => import('./board/ArrearListWithProperAge/disconnectedMeter'))
		},
		{
			path: '/analysisreport/boards/temporarily_disconnected_order',
			component: lazy(() => import('./board/DisconnectedMeter/disconnectedMeter'))
		},
		{
			path: '/analysisreport/boards/permanent_disconnection_order',
			component: lazy(() => import('./board/PermanentlyDisconnectedMeter/disconnectedMeter'))
		},
		{
			path: '/analysisreport/boards',
			component: lazy(() => import('./boards/Boards'))
		},
		{
			path: '/analysisreport',
			component: () => <Redirect to="/analysisreport/boards" />
		}
	]
};

export default ScrumboardAppConfig;
