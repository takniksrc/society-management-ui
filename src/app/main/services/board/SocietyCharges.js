import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from '../store';
import SCData from './SCData';

const useStyles = makeStyles(theme => ({
	'@global': {
		'#fuse-main': {
			height: '100vh'
		}
	}
}));

function SocietyCharges(props) {
	const theme = useTheme();
	const routeParams = useParams();
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	return (
		<FusePageSimple
		style={{left:'auto'}}
			classes={{
				content: 'flex flex-col flex-auto overflow-hidden',
				header: 'h-72 min-h-72 lg:ltr:rounded-bl-20 lg:rtl:rounded-br-20 left-auto',
				// sidebar: 'border-0'
			}}
			header={
				<div className="flex flex-1 items-center px-16 lg:px-24" >
					<Hidden lgUp>
						<IconButton
							onClick={ev => pageLayout.current.toggleLeftSidebar()}
							aria-label="open left sidebar"
						>
							<Icon>menu</Icon>
						</IconButton>
					</Hidden>
					<IconButton to="/services/boards" component={Link}>
						<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
					</IconButton>
					 <Typography className="flex-1 text-20 mx-16">Society Charges</Typography>
				</div>
			}
			content={<SCData/>}
			// content={
			// 	course && (
			// 		<div className="flex flex-1 relative overflow-hidden">
			// 			<FuseScrollbars className="w-full overflow-auto">
			// 				<SwipeableViews
			// 					className="overflow-hidden"
			// 					index={activeStep - 1}
			// 					enableMouseEvents
			// 					onChangeIndex={handleChangeActiveStep}
			// 				>
			// 					{course.steps.map((step, index) => (
			// 						<div
			// 							className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64"
			// 							key={step.id}
			// 						>
			// 							<Paper className="w-full max-w-lg rounded-20 p-16 md:p-24 shadow text-14 leading-normal">
			// 								<div
			// 									dangerouslySetInnerHTML={{ __html: step.content }}
			// 									dir={theme.direction}
			// 								/>
			// 							</Paper>
			// 						</div>
			// 					))}
			// 				</SwipeableViews>
			// 			</FuseScrollbars>

			// 			<div className="flex justify-center w-full absolute left-0 right-0 bottom-0 pb-16 md:pb-32">
			// 				<div className="flex justify-between w-full max-w-xl px-8">
			// 					<div>
			// 						{activeStep !== 1 && (
			// 							<Fab className="" color="secondary" onClick={handleBack}>
			// 								<Icon>{theme.direction === 'ltr' ? 'chevron_left' : 'chevron_right'}</Icon>
			// 							</Fab>
			// 						)}
			// 					</div>
			// 					<div>
			// 						{activeStep < course.steps.length ? (
			// 							<Fab className="" color="secondary" onClick={handleNext}>
			// 								<Icon>{theme.direction === 'ltr' ? 'chevron_right' : 'chevron_left'}</Icon>
			// 							</Fab>
			// 						) : (
			// 							<Fab className={classes.successFab} to="/apps/academy/courses" component={Link}>
			// 								<Icon>check</Icon>
			// 							</Fab>
			// 						)}
			// 					</div>
			// 				</div>
			// 			</div>
			// 		</div>
			// 	)
			// }
			innerScroll
			ref={pageLayout}
		/>
	);
}

export default withReducer('scrumboardApp', reducer)(withRouter(SocietyCharges));