import { Redirect } from 'react-router-dom';
import i18next from 'i18next';
import UsersIndex from './UsersIndex';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const UsersConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/users',
			component: UsersIndex
			// component: () => <Redirect to="/userss/all" />

		}
        // ,{
		// 	path: '/users',
		// 	// component: UsersIndex
		// 	component: () => <Redirect to="/userss/all" />

		// }
	]
};

export default UsersConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
