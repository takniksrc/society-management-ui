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
import { getConsumbtionBoard, updateConsumbtionBoard } from '../store/consumptionBoardSlice';
import { RESIDENTIAL, COMMERCIAL, CONSTRUCTION } from 'app/fuse-configs/constants';

const schema = yup.object().shape({
	name: yup
		.string()
		.required('You must enter a product name')
		.min(5, 'The product name must be at least 5 characters')
});

function EKServiceTemplate(props) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const theme = useTheme();
	const params = useParams();
	const pageLayout = useRef(null);
	const board = useSelector(state => state.consumptionBoard);
	console.log('board', board);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: board,
		resolver: yupResolver(schema)
	});
	const { reset, watch, control, onChange, formState, getValues } = methods;

	const [tabValue, setTabValue] = useState(0);

	function handleUpdateConsumptionBoard() {
		const data = getValues();
		dispatch(updateConsumbtionBoard({ ...data, tabValue }));
	}

	function handleTabChange(event, value) {
		console.log('I am value', value);
		setTabValue(value);
	}

	useEffect(() => {
		console.log('params', params.boardId);
		dispatch(getConsumbtionBoard(params.boardId)).then(data => {
			console.log('data :', data);
			reset(data.payload);
			setLoading(false);
		});
	}, [reset]);

	if (loading) {
		return <FuseLoading />;
	}
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
								{!!tabValue && (
									<Button
										className="whitespace-nowrap mx-4"
										variant="contained"
										color="secondary"
										type="submit"
										// disabled={_.isEmpty(dirtyFields) || !isValid}
										onClick={handleUpdateConsumptionBoard}
									>
										Save
									</Button>
								)}
							</motion.div>
						</div>
					</div>
				}
				contentToolbar={
					<>
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
												value={sp.customer_type.name}
											/>
										);
								  })
								: ''}
						</Tabs>
					</>
				}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<DescriptionTab />
						</div>
						<div className={tabValue !== RESIDENTIAL ? 'hidden' : ''}>
							<ResidentialTab TabType={RESIDENTIAL} />
						</div>
						<div className={tabValue !== COMMERCIAL ? 'hidden' : ''}>
							<CommercialTab TabType={COMMERCIAL} />
						</div>
						<div className={tabValue !== CONSTRUCTION ? 'hidden' : ''}>
							<ConstructionTab TabType={CONSTRUCTION} />
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
