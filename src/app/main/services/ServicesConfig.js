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
			path: '/services/boards/consumption-based-charges/:boardId/:boardUri?',
			component: lazy(() => import('./board/EKServiceTemplate'))
		},
		{
			path: '/services/boards/consumption-based-charges/:boardId/electricity-tip',
			component: lazy(() => import('./board/TIPService'))
		},
		{
			path: '/services/boards/consumption-based-charges',
			component: lazy(() => import('./board/ConsumptionBased'))
		},

		// {
		// 	path: '/services/boards/society-charges/garbage',
		// 	component: lazy(() => import('./board/SocietyCharges'))
		// },
		// {
		// 	path: '/services/boards/society-charges/cleanliness',
		// 	component: lazy(() => import('./board/SocietyCharges'))
		// },
		// {
		// 	path: '/services/boards/society-charges/cable',
		// 	component: lazy(() => import('./board/SocietyCharges'))
		// },
		// {
		// 	path: '/services/boards/society-charges/security',
		// 	component: lazy(() => import('./board/SocietyCharges'))
		// },
		// {
		// 	path: '/services/boards/society-charges/water',
		// 	component: lazy(() => import('./board/SocietyCharges'))
		// },
		{
			path: '/services/boards/society-charges/:boardId/:boardUri?',
			component: lazy(() => import('./board/SCDataTemplate'))
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
