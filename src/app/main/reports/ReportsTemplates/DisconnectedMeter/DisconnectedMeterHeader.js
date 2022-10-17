import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import IconButton from '@material-ui/core/IconButton';
import { setContactsSearchText, selectUsers, resetValues } from '../../store/disconnectedmeterSlice';

function DisconnectedMeterHeader(props) {
	const dispatch = useDispatch();
	// const methods = useFormContext();
	// const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
	const searchText = useSelector(({ disconnectedmeterSlice }) => disconnectedmeterSlice.searchText);

	const mainTheme = useSelector(selectMainTheme);
	const theme = useTheme();
	const contacts = useSelector(selectUsers);
	// const contactDialog = useSelector(({ disconnectedmeterSlice }) => disconnectedmeterSlice.newUsersSlice)

	// console.log('I am userin UsersIndex',contac)

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<IconButton to="/analysisreport/boards" component={Link} onClick={() => dispatch(resetValues([]))}>
				<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
			</IconButton>
			<div className="flex items-center">
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
					Disconnected Meter Reports
				</Typography>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<Paper
						component={motion.div}
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
						className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
					>
						<Icon color="action">search</Icon>

						<Input
							placeholder="Search for anything"
							className="flex flex-1 px-16"
							disableUnderline
							fullWidth
							value={searchText}
							inputProps={{
								'aria-label': 'Search'
							}}
							onChange={ev => dispatch(setContactsSearchText(ev))}
						/>
					</Paper>
				</ThemeProvider>
			</div>
		</div>
	);
}

export default DisconnectedMeterHeader;
