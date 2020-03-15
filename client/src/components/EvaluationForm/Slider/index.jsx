import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import Box from '@material-ui/core/Box';
import styles from './styles';
  
const customIcons = {
    1: { icon: 1, label: '1' },
    2: { icon: 2, label: '2' },
    3: { icon: 3, label: '3' },
    4: { icon: 4, label: '4' },
    5: { icon: 5, label: '5' },
    6: { icon: 6, label: '6' },
    7: { icon: 7, label: '7' },
    8: { icon: 8, label: '8' },
    9: { icon: 9, label: '9' },
    10: { icon: 10, label: '10' }
};

function IconContainer(props) {
    const classes = styles();
    const { value, ...other } = props;
    return <span className={classes.point} {...other}>{customIcons[value].icon}</span>;
}

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
                    // icon={<SentimentSatisfied fontSize="inherit" />}
                    IconContainerComponent={IconContainer}
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
                {/* <Box ml={2} className={classes.points}>
                    {labels[hover !== -1 ? hover : sliderValue]}
                </Box> */}
            </div>
        </Box>
    </div>
  );
}
