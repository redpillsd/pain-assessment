import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import Box from '@material-ui/core/Box';
import styles from './styles';

const labels = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
};

export default function Slider({name, title, value, formikHandleChange}) {
  const classes = styles();

  const [hover, setHover] = React.useState(-1);
  const [sliderValue, setSliderValue] = React.useState(value);

  return (
    <div>
        <Box component="fieldset" mb={3} borderColor="transparent" className={classes.box}>
            <Typography component="legend" className={classes.title}>
                {title}
            </Typography>
            <div className={classes.rating}>
                <Rating
                    size="large"
                    icon={<SentimentSatisfied fontSize="inherit" />}
                    name={name}
                    max={10}
                    value={sliderValue}
                    onChange={(e, newSliderValue) => {
                        setSliderValue(newSliderValue);
                        formikHandleChange(e);
                    }}
                    onChangeActive={(e, newHover) => {
                        setHover(newHover);
                    }}
                />
                <Box ml={2} className={classes.points}>
                    {labels[hover !== -1 ? hover : sliderValue]}
                </Box>
            </div>
        </Box>
    </div>
  );
}
