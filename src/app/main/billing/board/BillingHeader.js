import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link ,useParams } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { openNewContactDialog, setContactsSearchText } from '../store/newUsersSlice';

function BillingHeader(props) {
	const dispatch = useDispatch();
	// const methods = useFormContext();
	// const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
	const GetBills = useSelector(state => state.AllBillsSlice);
	console.log('i am contacts in all', GetBills);
	// const searchText = useSelector(({ newUsersSlice }) => newUsersSlice.searchText);
	const theme = useTheme();
	const mainTheme = useSelector(selectMainTheme);
	const contactDialog = useSelector(({ newUsersSlice }) => newUsersSlice.newUsersSlice);
	const routeParams = useParams();
	console.log('i am routeParams in Billing Header', routeParams);

	console.log('I am userin Users get', contactDialog);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<IconButton to="/billing/boards" component={Link}>
					<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
				</IconButton>
				<Icon
					component={motion.span}
					initial={{ scale: 0 }}
					animate={{ scale: 1, transition: { delay: 0.2 } }}
					className="text-24 md:text-32"
				>
					shopping_basket
				</Icon>
				<Typography
					component={motion.span}
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
					delay={300}
					className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
				>
					{routeParams?.boardname} - Billing 
				</Typography>
			</div>

			<motion.div
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
				className="flex flex-2 items-center justify-center px-12 max-w-xs space-x-20"
			>
				{/* <Button
					variant="contained"
					color="secondary"
					className="w-full"
					// onClick={ev => dispatch(openNewContactDialog())}
				>
					Close Month
				</Button> */}
			</motion.div>
		</div>
	);
}

export default BillingHeader;
