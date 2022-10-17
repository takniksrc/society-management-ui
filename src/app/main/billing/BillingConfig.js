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
			path: '/billing/BillingBlocks/1/electrcity-bills/billing',
			component: lazy(() => import('./BillingTable/BillingIndex'))
		},
		{
			path: '/billing/BillingBlocks/:boardname/:boardId/billing',
			component: lazy(() => import('./BillingTable/BillingIndex'))
		},
		{
			path: '/billing/BillingBlocks/:boardname/:boardId',
			component: lazy(() => import('./BillingTable/GenerateBillsHeader'))
		},
		{
			path: '/billing/BillingBlocks',
			component: lazy(() => import('./BillingBlocks/BillingBlocksIndex'))
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
			component: () => <Redirect to="/billing/BillingBlocks" />
		}
	]
};

export default ScrumboardAppConfig;
