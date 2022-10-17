import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import UsersConfig from 'app/main/users/UsersConfig';
import CustomersConfig from 'app/main/customer/CustomersConfig';
import AnalysisReportConfig from 'app/main/reports/ReportsConfig';
import BillingConfig from 'app/main/billing/BillingConfig';
import ServicesConfig from 'app/main/services/ServicesConfig';
import Login from 'app/login/Login';
import LoginConfig from 'app/login/LoginConfig';
import AnalyticsDashboardAppConfig from 'app/main/dashboards/analytics/AnalyticsDashboardAppConfig';
import RegisterConfig from 'app/register/RegisterConfig';

const routeConfigs = [
	LoginConfig,
	RegisterConfig,
	AnalyticsDashboardAppConfig,
	CustomersConfig,
	UsersConfig,
	AnalysisReportConfig,
	BillingConfig,
	ServicesConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),

	{
		path: '/',
		component: () => <Redirect to="/login" />
	}
];

export default routes;
