import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/services/boards/consumption-based-charges/:boardId/:boardUri?',
			component: lazy(() => import('./board/EKServiceTemplate'))
		},
		{
			path: '/services/boards/consumption-based-charges',
			component: lazy(() => import('./board/ConsumptionBased'))
		},
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
