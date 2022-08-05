import { useEffect, useState ,useRef} from 'react';
import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useDispatch } from 'react-redux';
import UsersHeader from './UsersHeader';
import BasicInfoTab from './BasicInfoTab';
import AllUsersHead from './AllUsersHead';
import ContactDialog from './ContactDialog';
import ContactsSidebarContent from './ContactsSidebarContent';
import reducer from './store';
import { getUsers } from './store/newUsersSlice';
import { getUserData } from './store/userSlice';
import DataTable from './DataTable';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup
		.string()
		.required('You must enter a product name')
		.min(5, 'The product name must be at least 5 characters')
});
const useStyles = makeStyles({
	layoutRoot: {}
});

const Users = () => {
	const classes = useStyles();
	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch, control, onChange, formState } = methods;
	const form = watch();
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(getUsers(routeParams));
		dispatch(getUserData());
	}, [dispatch, routeParams]);

	return (
		<>
		{/* <FormProvider {...methods}> */}
			<FusePageSimple
				classes={{
					root: classes.layoutRoot
				}}
				header={<UsersHeader />}
				// contentToolbar={
				// 	<Tabs
				// 		// value={tabValue}
				// 		// onChange={handleTabChange}
				// 		indicatorColor="primary"
				// 		textColor="primary"
				// 		variant="scrollable"
				// 		scrollButtons="auto"
				// 		classes={{ root: 'w-full h-64' }}
				// 	>
				// 		<Tab className="h-64" label="Basic Info" />
				// 	</Tabs>
				// }
				// content={<AllUsersHead />}
				content={<DataTable />}


			// content={
			// 	<div className="p-16 sm:p-24 max-w-2xl">
			// 		<div>
			// 			<AllUsersHead />
			// 		</div>
			// 	</div>
			// }
			// leftSidebarContent={<ContactsSidebarContent />}

			/>
		{/* </FormProvider> */}
			<ContactDialog />
			</>

	);
}

export default Users;
