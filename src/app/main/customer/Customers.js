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
import CustomersHeader from './CustomersHeader';
import AllCustomersHead from './AllCustomersHead';
import ContactDialog from './ContactDialog';
import reducer from './store';
import { getCustomers } from './store/newCustomersSlice';
import { getCustomerData } from './store/customerSlice';

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

const Customers = () => {
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
		dispatch(getCustomers(routeParams));
		dispatch(getCustomerData());
	}, [dispatch, routeParams]);

	return (
		<>
			<FusePageSimple
				classes={{
					root: classes.layoutRoot
				}}
				header={<CustomersHeader />}
				content={<AllCustomersHead />}
			/>
			<ContactDialog />
		</>
	);
}

export default Customers;
