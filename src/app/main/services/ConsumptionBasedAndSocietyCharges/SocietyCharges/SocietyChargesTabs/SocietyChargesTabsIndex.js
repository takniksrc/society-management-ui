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

import { updateSocietyChargesServiceBoard, getSocietyChargesServiceBoard } from '../../../store/societyChargesServiceSlice';

import reducer from '../../../store';
import DescriptionTab from './DescriptionTab';
import ResidentialTab from './ResidentialTab';
import CommercialTab from './CommercialTab';
import ConstructionTab from './ConstructionTab';
import { CONSTRUCTION, RESIDENTIAL, COMMERCIAL } from 'app/fuse-configs/constants';

const schema = yup.object().shape({
	name: yup.string()
});

function SocietyChargesTabsIndex(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.societyChargesServiceSlice);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: board,
		resolver: yupResolver(schema)
	});
	const { reset, watch, control, onChange, formState, getValues } = methods;

	const [tabValue, setTabValue] = useState('Description');

	const { isValid, dirtyFields } = formState;

	const pageLayout = useRef(null);

	const routeParams = useParams();
	const form = watch();

	console.log('I am boardData in SocietyChargesTabsIndex', board);

	function handleTabChange(event, value) {
		setTabValue(value);
		console.log('tabValue', tabValue);
	}
	const name = watch('name');

	function handleSaveSocietyCharges() {
		dispatch(updateSocietyChargesServiceBoard(getValues()));
	}

	useEffect(() => {
		dispatch(getSocietyChargesServiceBoard(routeParams.boardId)).then(data => {
			reset(data.payload);
		});
	}, [reset]);

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={
					// {ProductHeader}
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
						<Typography className="flex-1 text-20 mx-16">{name}</Typography>
						{/* <Typography className="text-16 sm:text-20 truncate font-semibold"></Typography> */}
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
								onClick={handleSaveSocietyCharges}
							>
								Save
							</Button>
						</motion.div>
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
							<Tab id="Description" className="h-64" label="Description" value="Description" />
							<Tab id={RESIDENTIAL} className="h-64" label={RESIDENTIAL} value={RESIDENTIAL} />
							<Tab id={COMMERCIAL} className="h-64" label={COMMERCIAL} value={COMMERCIAL} />
							<Tab id={CONSTRUCTION} className="h-64" label={CONSTRUCTION} value={CONSTRUCTION} />
						</Tabs>
					</>
				}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 'Description' ? 'hidden' : ''}>
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
			/>
		</FormProvider>
	);
}

export default withReducer('scrumboardApp', reducer)(SocietyChargesTabsIndex);
