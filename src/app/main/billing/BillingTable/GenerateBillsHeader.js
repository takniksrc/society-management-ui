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
import GBData from './GenrateBillUploadFPA';
import reducer from '../store';
import BillsPaymentDiscountDialog from './BillsPaymentDiscountDialog';

const useStyles = makeStyles(theme => ({
	'@global': {
		'#fuse-main': {
			height: '100vh'
		}
	}
}));

function GenerateBillsHeader(props) {
	const theme = useTheme();
	const routeParams = useParams();
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	console.log('routeParams', routeParams);

	return (
		<>
			<FusePageSimple
				style={{ left: 'auto' }}
				classes={{
					content: 'flex flex-col flex-auto overflow-hidden',
					header: 'h-72 min-h-72 lg:ltr:rounded-bl-20 lg:rtl:rounded-br-20 left-auto'
					// sidebar: 'border-0'
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
						<IconButton to="/billing/boards" component={Link}>
							<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						</IconButton>
						<Typography className="flex-1 text-20 mx-16">
							 Generate Bills - ({routeParams?.boardname} )
						</Typography>
					</div>
				}
				content={<GBData blockId={routeParams.boardId} blockname={routeParams.boardname} />}
				innerScroll
				ref={pageLayout}
			/>
			{/* <BillsPaymentDiscountDialog /> */}
		</>
	);
}

export default withReducer('scrumboardApp', reducer)(withRouter(GenerateBillsHeader));
