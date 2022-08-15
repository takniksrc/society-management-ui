import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: '/billing/boards/:boardId/:boardUri?',
		// 	component: lazy(() => import('./board/Board'))
		// },
		{
			path: '/services/boards/consumption-based-charges/1/electricity-khayaban-amin',
			component: lazy(() => import('./board/EKService'))
		},
		{
			path: '/services/boards/consumption-based-charges/2/electricity-tip',
			component: lazy(() => import('./board/TIPService'))
		},
		{
			path: '/services/boards/consumption-based-charges',
			component: lazy(() => import('./board/ConsumptionBased'))
		},
		{
			path: '/services/boards/society-charges',
			component: lazy(() => import('./board/SocietyCharges'))
		},
		{
			path: '/services/boards',
			component: lazy(() => import('./boards/Boards'))
		},
		{
			path: '/services',
			component: () => <Redirect to="/services/boards" />
		}
	]
};

export default ScrumboardAppConfig;
