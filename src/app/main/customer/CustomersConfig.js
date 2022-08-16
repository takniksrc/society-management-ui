import { Redirect } from 'react-router-dom';
import i18next from 'i18next';
import Customers from './Customers';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const CustomersConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/customers',
			component: Customers
			// component: () => <Redirect to="/userss/all" />

		}
        // ,{
		// 	path: '/users',
		// 	// component: Customers
		// 	component: () => <Redirect to="/userss/all" />

		// }
	]
};

export default CustomersConfig;

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
