import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import PropertyConfig from 'app/main/Property/PropertyConfig';
import UsersConfig from 'app/main/users/UsersConfig';


const routeConfigs = [ UsersConfig, PropertyConfig];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),


	
];

export default routes;
