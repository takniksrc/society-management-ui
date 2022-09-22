import React from 'react';
import { useEffect, useState } from 'react';
import { getBillData } from '../store/billWithIdSlice';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CompactInvoicePage from './compact/CompactInvoicePage';

function BillTempelate() {
	const routeParams = useParams();
	console.log('i am routeParams in invoice', routeParams);
	const dispatch = useDispatch();
	const GetBillsData = useSelector(state => state.scrumboardApp?.billWithIdSlice);
	console.log('i am GetBills in Billtempelate', GetBillsData);

	const [invoice, setInvoice] = useState({
		id: '5725a6802d',
		from: {
			title: 'Society Bill',
			address: '2810 Country Club Road Cranford, NJ 07016',
			phone: '+66 123 455 87',
			email: 'hello@fuseinc.com',
			website: 'www.fuseinc.com'
		},
		client: {
			title: 'John Doe',
			address: '9301 Wood Street Philadelphia, PA 19111',
			phone: '+55 552 455 87',
			email: 'johndoe@mail.com'
		},
		number: 'P9-0004',
		date: 'Jul 19, 2019',
		dueDate: 'Aug 24, 2019',
		services: [
			{
				id: '1',
				title: 'Prototype & Design',
				detail:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan, quam sed eleifend imperdiet.',
				unit: 'Hour',
				unitPrice: '12.00',
				quantity: '240',
				total: '2880'
			},
			{
				id: '2',
				title: 'Coding',
				detail:
					'Vestibulum ligula sem, rutrum et libero id, porta vehicula metus. Cras dapibus neque sit amet laoreet vestibulum.',
				unit: 'Hour',
				unitPrice: '10.50',
				quantity: '350',
				total: '3675'
			},
			{
				id: '3',
				title: 'Testing',
				detail:
					'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
				unit: 'Hour',
				unitPrice: '4.00',
				quantity: '50',
				total: '200'
			},
			{
				id: '4',
				title: 'Documentation & Training',
				detail:
					'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
				unit: 'Hour',
				unitPrice: '6.50',
				quantity: '260',
				total: '1690'
			}
		],
		subtotal: '8445',
		tax: '675.60',
		discount: '120.60',
		total: '9000'
	});

	useDeepCompareEffect(() => {
		dispatch(getBillData(routeParams.billsId));
	}, [dispatch, routeParams]);

	
	return <CompactInvoicePage invoice={invoice} bills={[{ ...GetBillsData }]} />;
}

export default BillTempelate;
