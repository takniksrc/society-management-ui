import i18next from 'i18next';
import Users from './Users';
import SettingsComponent from './Settings';
import propertyManagement from './Property';
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
			component: Users
		},
		{
			path: '/Settings',
			component: SettingsComponent	
		}
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
