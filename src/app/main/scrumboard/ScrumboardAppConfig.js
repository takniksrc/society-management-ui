import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
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
