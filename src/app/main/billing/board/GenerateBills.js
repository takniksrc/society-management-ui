import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
	'@global': {
		'#fuse-main': {
			height: '100vh'
		}
	}
}));

function GenerateBills(props) {
	const classes = useStyles(props);

	const dispatch = useDispatch();
	return (
		<div className="flex flex-1 flex-auto flex-col w-full h-full relative" >
            <h1>hy</h1>
		</div>
	);
}

export default withReducer('scrumboardApp', reducer)(withRouter(GenerateBills));
