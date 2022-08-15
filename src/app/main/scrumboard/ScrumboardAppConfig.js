import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/analysisreport/boards/:boardId/:boardUri?',
			component: lazy(() => import('./board/Board'))
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
