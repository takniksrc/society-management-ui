import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import UsersConfig from 'app/main/users/UsersConfig';
import BreadCrumbsConfig from 'app/main/scrumboard/ScrumboardAppConfig';
import BillingConfig from 'app/main/billing/BillingConfig';

const routeConfigs = [ExampleConfig, UsersConfig, BreadCrumbsConfig, BillingConfig];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/example" />
	},
	{
		path: '/',
		component: () => <Redirect to="/users" />
	},
	{
		path: '/',
		component: () => <Redirect to="/scrumboard" />
	},
	{
		path: '/',
		component: () => <Redirect to="/billing" />
	},

];

export default routes;
