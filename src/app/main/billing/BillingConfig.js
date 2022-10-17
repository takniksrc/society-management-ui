import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.accountant,
	routes: [
		{
			path: '/billing/ReportsBoxesList/1/electrcity-bills/billing',
			component: lazy(() => import('./BillingTable/BillingIndex'))
		},
		{
			path: '/billing/ReportsBoxesList/:boardname/:boardId/billing',
			component: lazy(() => import('./BillingTable/BillingIndex'))
		},
		{
			path: '/billing/ReportsBoxesList/:boardname/:boardId',
			component: lazy(() => import('./BillingTable/GenerateBillsHeader'))
		},
		{
			path: '/billing/ReportsBoxesList',
			component: lazy(() => import('./BillingBlocks/BillingBlocks'))
		},
		{
			path: '/billing/:billsId/pdf-bill',
			component: lazy(() => import('./invoices/BillUITemplate'))
		},
		{
			path: '/billing/pdf-bills/:blockId',
			component: lazy(() => import('./invoices/BillUITemplateMultiple'))
		},
		{
			path: '/billing',
			component: () => <Redirect to="/billing/boards" />
		}
	]
};

export default ScrumboardAppConfig;
