import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { useForm, FormProvider, useFormContext, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
// eslint-disable-next-line import/named
import { saveBoard, getBoard } from '../store/boardSlice';
// import { resetProduct, newProduct, getProduct } from '../store/productSlice';

import reducer from '../store';
import DescriptionTab from './Tabs/DescriptionTab';
import ResidentialTab from './Tabs/ResidentialTab';
import CommercialTab from './Tabs/CommercialTab';
import ConstructionTab from './Tabs/ConstructionTab';
// import ProductHeader from './ProductHeader';
// import InventoryTab from './tabs/InventoryTab';
// import PricingTab from './tabs/PricingTab';
// import ProductImagesTab from './tabs/ProductImagesTab';
// import ShippingTab from './tabs/ShippingTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup
		.string()
		.required('You must enter a product name')
		.min(5, 'The product name must be at least 5 characters')
});

function SCDataTemplate(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const [tabValue, setTabValue] = useState(0);
	// const methods = useFormContext();
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const [noProduct, setNoProduct] = useState(false);

	const pageLayout = useRef(null);
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
	console.log('I am product', board);

	const routeParams = useParams();
	const form = watch();

	// const boardData = useSelector(getBoard);
	console.log('I am boardData in SCDataTemplate', board);

	function handleTabChange(event, value) {
		setTabValue(value);
	}
	const name = watch('name');

	useEffect(() => {
		dispatch(getBoard());
	}, [dispatch]);
	function handleSaveProduct() {
		dispatch(saveBoard(getValues()));
	}
	useDeepCompareEffect(() => {
		function updateProductState() {
			const { productId } = routeParams;

			if (productId === 'new') {
				/**
				 * Create New Product data
				 */
			} else {
				/**
				 * Get Product data
				 */
				dispatch(getBoard(routeParams)).then(action => {
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoProduct(true);
					}
				});
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);
	// if (_.isEmpty(form) || (board && routeParams.productId !== board.id && routeParams.productId !== 'new')) {
	// 	return <FuseLoading />;
	// }
	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header=
				{ // {ProductHeader}
					<div className="flex flex-1 items-center px-16 lg:px-24">
						<Hidden lgUp>
							<IconButton
								onClick={ev => pageLayout.current.toggleLeftSidebar()}
								aria-label="open left sidebar"
							>
								<Icon>menu</Icon>
							</IconButton>
						</Hidden>
						<IconButton to="/services/boards/society-charges" component={Link}>
							<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						</IconButton>
						<Typography className="flex-1 text-20 mx-16">Society Charges</Typography>
						<Typography className="text-16 sm:text-20 truncate font-semibold">{name}</Typography>
						<motion.div
							className="flex"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
						>
							<Button
								className="whitespace-nowrap mx-4"
								variant="contained"
								color="secondary"
								disabled={_.isEmpty(dirtyFields) || !isValid}
								onClick={handleSaveProduct}
							>
								Save
							</Button>
						</motion.div>
					</div>
				}
				contentToolbar={
					<>
						{/* <Controller
				     name="description"
				     // control={control}
				      render={({ field }) => (
					   <TextField
						{...field}
						className="mt-8 mb-16"
						id="description"
						label="Description"
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
					/>
				)}
			/> */}

						<Tabs
							value={tabValue}
							onChange={handleTabChange}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="auto"
							classes={{ root: 'w-full h-64' }}
						>
							<Tab className="h-64" label="Description" />
							<Tab className="h-64" label="Residential" />
							<Tab className="h-64" label="Commercial" />
							{/* <Tab className="h-64" label="Construction" /> */}
						</Tabs>
					</>
				}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<DescriptionTab board={board} />
						</div>
						<div className={tabValue !== 1 ? 'hidden' : ''}>
							<ResidentialTab board={board} />
						</div>

						<div className={tabValue !== 2 ? 'hidden' : ''}>
							<CommercialTab board={board} />
						</div>

						{/* <div className={tabValue !== 3 ? 'hidden' : ''}>
							<ConstructionTab />
						</div> */}
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default withReducer('scrumboardApp', reducer)(SCDataTemplate);
