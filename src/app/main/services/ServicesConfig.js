import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/services/ServicesBoxesList/consumption-based-charges/:boardId/:boardUri?',
			component: lazy(() => import('./board/EKServiceTemplate'))
		},
		{
			path: '/services/ServicesBoxesList/consumption-based-charges',
			component: lazy(() => import('./board/ConsumptionBased'))
		},
		{
			path: '/services/ServicesBoxesList/society-charges/:boardId/:boardUri?',
			component: lazy(() => import('./board/SCDataTemplate'))
		},
		{
			path: '/services/ServicesBoxesList/society-charges',
			component: lazy(() => import('./board/SocietyCharges'))
		},

		{
			path: '/services/ServicesBoxesList',
			component: lazy(() => import('./ServicesBoxesList/ServicesIndex'))
		},
		{
			path: '/services',
			component: () => <Redirect to="/services/ServicesBoxesList" />
		}
	]
};

export default ScrumboardAppConfig;
