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
// import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
// import { resetProduct, newProduct, getProduct } from '../store/productSlice';
import reducer from '../store';
import DescriptionTab from '../ConsumptionTabs/DescriptionTab';
import ResidentialTab from '../ConsumptionTabs/ResidentialTab';
import ConstructionTab from '../ConsumptionTabs/ConstructionTab';
import FPATab from '../ConsumptionTabs/FPATab';
import CommercialTab from '../ConsumptionTabs/CommercialTab';
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

function EKServiceTemplate(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const pageLayout = useRef(null);
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
	console.log('I am product board', board);

	const [tabValue, setTabValue] = useState(0);

	function handleTabChange(event, value) {
		console.log('I am value', value);
		setTabValue(value);
	}
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch, control, onChange, formState } = methods;
	useEffect(() => {
		if (!board) {
			return;
		}

		/**
		 * Reset the form on product state changes
		 */
		reset(board);
	}, [board, reset]);
	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={
					<div className="flex flex-1 items-center px-16 lg:px-24">
						<Hidden lgUp>
							<IconButton
								onClick={ev => pageLayout.current.toggleLeftSidebar()}
								aria-label="open left sidebar"
							>
								<Icon>menu</Icon>
							</IconButton>
						</Hidden>
						<IconButton to="/services/boards/consumption-based-charges" component={Link}>
							<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						</IconButton>
						<Typography className="flex-1 text-20 mx-16">{board?.name}</Typography>
						<div className="flex mx-4 -mx-4 mt-12">
							<motion.div
								className="flex"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
							>
								<Button
									className="whitespace-nowrap mx-4"
									variant="contained"
									color="secondary"
									// disabled={_.isEmpty(dirtyFields) || !isValid}
									// onClick={handleSaveProduct}
								>
									Save
								</Button>
							</motion.div>
						</div>
					</div>
				}
				contentToolbar={
					<>
						{/* <TabContext value={tabValue}>
							<TabList
								onChange={handleTabChange}
								indicatorColor="primary"
								textColor="primary"
								variant="scrollable"
								scrollButtons="auto"
								classes={{ root: 'w-full h-64' }}
							>
								<Tab className="h-64" label="Description" />
								{board?.servicePricing
									? board?.servicePricing?.map(sp => {
											console.log('i am sp', sp.customer_type.name);
											setTabValue(sp.customer_type.id);

											return (
												<Tab
													className="h-64"
													label={sp.customer_type.name}
													// value={sp.customer_type.id}
												/>
											);
									  })
									: ''}
							</TabList>
							<TabPanel value={tabValue}>Item One</TabPanel>
						<TabPanel value={tabValue}>Item Two</TabPanel>
						<TabPanel value={tabValue}>Item Three</TabPanel>
						</TabContext> */}
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
							{board?.servicePricing
								? board?.servicePricing?.map(sp => {
										console.log('i am sp', sp.customer_type.name);
										return (
											<Tab
												className="h-64"
												label={sp.customer_type.name}
												value={sp.customer_type.id}
											/>
										);
								  })
								: ''}
						</Tabs>
						{/* <Tab className="h-64" label="Residential" />
							<Tab className="h-64" label="Commercial" />
							<Tab className="h-64" label="Construction" />
							<Tab className="h-64" label="FPA" /> */}
					</>
				}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<DescriptionTab />
						</div>
						<div className={tabValue !== '018fbcf2-b382-4165-9f78-499453424893' ? 'hidden' : ''}>
							<ResidentialTab TabType="Residential" />
						</div>
						<div className={tabValue !== 'd2b01e99-5d30-49a1-9528-b7640f13fe59' ? 'hidden' : ''}>
							<CommercialTab TabType="Commercial" />
						</div>

						<div className={tabValue !== 3 ? 'hidden' : ''}>
							<ConstructionTab />
						</div>
						<div className={tabValue !== 4 ? 'hidden' : ''}>
							<FPATab />
						</div>
					</div>
				}
				innerScroll
				ref={pageLayout}
			/>
		</FormProvider>
	);
}

export default withReducer('scrumboardApp', reducer)(EKServiceTemplate);
