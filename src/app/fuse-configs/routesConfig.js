import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import UsersConfig from 'app/main/users/UsersConfig';
import CustomersConfig from 'app/main/customer/CustomersConfig';
import AnalysisReportConfig from 'app/main/scrumboard/ScrumboardAppConfig';
import BillingConfig from 'app/main/billing/BillingConfig';
import ServicesConfig from 'app/main/services/ServicesConfig';
import Login from 'app/login/Login';



const routeConfigs = [CustomersConfig, UsersConfig, AnalysisReportConfig, BillingConfig, ServicesConfig];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
		{
			path: '/login',
			component: Login
		},
	{
		path: '/',
		component: () => <Redirect to="/customers" />
	},
	{
		path: '/',
		component: () => <Redirect to="/users" />
	},
	{
		path: '/',
		component: () => <Redirect to="/analysisreport" />
	},
	{
		path: '/',
		component: () => <Redirect to="/billing" />
	},
	{
		path: '/',
		component: () => <Redirect to="/services" />
	},

];

export default routes;
