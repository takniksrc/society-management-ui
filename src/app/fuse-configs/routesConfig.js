import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import SettingsComponent from 'app/main/example/Settings';
import propertyManagement from 'app/main/example/Property';

const routeConfigs = [ExampleConfig];

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
		component: () => <Redirect to="/Settings" />
	},
	{
		path: '/',
		component: () => <Redirect to="/Property" />
	}
];

export default routes;
