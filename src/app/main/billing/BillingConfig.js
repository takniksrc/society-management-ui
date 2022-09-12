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
			path: '/billing/boards/1/electrcity-bills/billing',
			component: lazy(() => import('./board/GBDataTemplate'))
		},
		{
			path: '/billing/boards/:boardId/:boardUri?/billing',
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
			path: '/billing',
			component: () => <Redirect to="/billing/boards" />
		}
	]
};

export default ScrumboardAppConfig;
