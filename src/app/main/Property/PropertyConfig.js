import i18next from 'i18next';
import SettingsComponent from './Settings';
import en from './i18n/en';
import tr from './i18n/tr';
import PropertyManagement from './Property';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);

const PropertyConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/Property',
			component: PropertyManagement
		},
		{
			path: '/Settings',
			component: SettingsComponent
		}
	]
};

export default PropertyConfig;

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
