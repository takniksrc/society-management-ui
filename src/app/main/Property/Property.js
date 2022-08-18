import SettingsComponent from "./Settings";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { blue } from '@material-ui/core/colors';
import { Button, CardHeader, Chip } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	layoutRoot: {}
});

const customerType = ["Residential", "Commercial", "Construction"];
const ResidentialPropertyType = ["House", "Flat", "Plot"];
const CommercialPropertyType = ["Plot", "Shop"];
const ResidentialPropertySize = ["5 Marla", "7 Marla", "10 Marla", "1 Kanal", "2 Kanal"];
const CommercialPropertySize = ["4 Marla", "8 Marla", "12 Marla"];

function PropertyManagement() {
	const classes = useStyles();

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-10 pt-40 font-extrabold">
					<h4> Property Management </h4>
				</div>
			}
			content={
				<Card sx={{ minWidth: 275 }}>
     			 <CardContent>
       				 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          				Word of the Day
       				 </Typography>
        <Typography variant="h5" component="div">
          be
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          "a benevolent smile"
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
	

			}
		/>
	);
}

export default PropertyManagement;