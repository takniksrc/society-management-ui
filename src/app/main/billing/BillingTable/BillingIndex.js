import { useEffect, useState ,useRef} from 'react';
import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import BillsPaymentDiscountDialog from './BillsPaymentDiscountDialog';
import BillingHeader from './BillingHeader';

import BillsTables from "./BillsTables";
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

const BillingIndex = () => {
	const classes = useStyles();

	return (
		<>
			<FusePageSimple
				classes={{
					root: classes.layoutRoot
				}}
				header={<BillingHeader />}
				content={<BillsTables />}
			/>
			<BillsPaymentDiscountDialog />
		</>
	);
}

export default BillingIndex;
