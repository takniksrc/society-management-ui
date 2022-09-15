import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'profile',
				title: 'DashBoard',
				translate: 'DASHBOARD',
				type: 'item',
				icon: 'person',
				url: '/dashboards/analytics'
			},
			{
				id: 'profile',
				title: 'User',
				translate: 'USER',
				type: 'item',
				icon: 'person',
				url: '/users'
			},
			{
				id: 'profile',
				title: 'cUSTOMER',
				translate: 'CUSTOMER',
				type: 'item',
				icon: 'person',
				url: '/customers'
			},
			{
				id: 'analysis-report',
				title: 'Analysis Report',
				translate: 'ANALYSISREPORT',
				type: 'item',
				icon: 'assessment',
				url: '/analysisreport'
			},
			{
				id: 'Billing',
				title: 'Billing',
				translate: 'BILLING',
				type: 'item',
				icon: 'assessment',
				url: '/billing'
			},
			{
				id: 'Services',
				title: 'Services',
				translate: 'SERVICES',
				type: 'item',
				icon: 'assessment',
				url: '/services'
			}
		]
	}
];

export default navigationConfig;
