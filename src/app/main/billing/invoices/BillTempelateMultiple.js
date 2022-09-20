import React from 'react';
import { useEffect, useState } from 'react';
import { getBlockBillsData } from '../store/billsWithBlockIdSlice';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import CompactInvoicePage from './compact/CompactInvoicePage';

function BillTempelate() {
	const routeParams = useParams();
	console.log('i am routeParams in invoice', routeParams);
	const dispatch = useDispatch();
	const GetBillsData = useSelector(state => state.scrumboardApp?.billingBlocksSlice);
	console.log('i am GetBills Multiple Bills', GetBillsData);

	useDeepCompareEffect(() => {
		// dispatch(getBlockBillsData(routeParams?.blockId));
	}, [dispatch, routeParams]);

	return <CompactInvoicePage bills={GetBillsData ? GetBillsData : []} />;
}

export default BillTempelate;
