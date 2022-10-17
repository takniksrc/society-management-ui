import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/services/boards/consumption-based-charges/:boardId/:boardUri?',
			component: lazy(() => import('./ConsumptionBasedAndSocietyCharges/ConsumptionBased/ConsumptionTabs/ConsumptionBasedTabsIndex'))
		},
		{
			path: '/services/boards/consumption-based-charges',
			component: lazy(() => import('./ConsumptionBasedAndSocietyCharges/ConsumptionBased/ConsumptionBasedIndex'))
		},
		{
			path: '/services/boards/society-charges/:boardId/:boardUri?',
			component: lazy(() => import('./ConsumptionBasedAndSocietyCharges/SocietyCharges/SocietyChargesTabs/SocietyChargesTabsIndex'))
		},
		{
			path: '/services/boards/society-charges',
			component: lazy(() => import('./ConsumptionBasedAndSocietyCharges/SocietyCharges/SocietyChargesIndex'))
		},

		{
			path: '/services/ServicesList',
			component: lazy(() => import('./ServicesBoxesList/ServicesIndex'))
		},
		{
			path: '/services',
			component: () => <Redirect to="/services/ServicesList" />
		}
	]
};

export default ScrumboardAppConfig;
