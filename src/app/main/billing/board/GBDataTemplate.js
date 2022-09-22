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
import { useDispatch,useSelector } from 'react-redux';
import ContactDialog from './ContactDialog';
import reducer from '../store';
import BillingHeader from './BillingHeader';
import { getUsers } from '../store/newUsersSlice';
import { getBillingData } from '../store/billingSlice';
import AllBillsHead from './AllBillsHead';

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

const GBDataTemplate = () => {
	const classes = useStyles();
	const [tabValue, setTabValue] = useState(0);
	//const GetBills = useSelector(state => state.scrumboardApp.getBillsSlice);
   //console.log('i am GetBills',GetBills)

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

	// useDeepCompareEffect(() => {
	// 	dispatch(getUsers(routeParams));
	// 	dispatch(getBillingData());
	// }, [dispatch, routeParams]);

	return (
		<>
			<FusePageSimple
				classes={{
					root: classes.layoutRoot
				}}
				header={<BillingHeader />}
				content={<AllBillsHead />}
			/>
			<ContactDialog />
		</>
	);
}

export default GBDataTemplate;
