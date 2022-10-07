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
			path: '/billing/boards/1/electrcity-bills/billing',
			component: lazy(() => import('./board/GBDataTemplate'))
		},
		{
			path: '/billing/boards/:boardId/billing',
			component: lazy(() => import('./board/GBDataTemplate'))
		},
		{
			path: '/billing/boards/:boardId',
			component: lazy(() => import('./board/GenerateBills'))
		},
		{
			path: '/billing/boards',
			component: lazy(() => import('./boards/Boards'))
		},
		{
			path: '/billing/:billsId/pdf-bill',
			component: lazy(() => import('./invoices/BillTempelate'))
		},
		{
			path: '/billing/pdf-bills/:blockId',
			component: lazy(() => import('./invoices/BillTempelateMultiple'))
		},
		{
			path: '/billing',
			component: () => <Redirect to="/billing/boards" />
		}
	]
};

export default ScrumboardAppConfig;
