import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/scrumboard/boards/:boardId/:boardUri?',
			component: lazy(() => import('./board/Board'))
		},
		{
			path: '/scrumboard/boards',
			component: lazy(() => import('./boards/Boards'))
		},
		{
			path: '/scrumboard',
			component: () => <Redirect to="/scrumboard/boards" />
		}
	]
};

export default ScrumboardAppConfig;
