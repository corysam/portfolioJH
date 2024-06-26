import { styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import { keyframes } from '@mui/styled-engine';
import { useMediaQuery } from '@material-ui/core';

const pop = keyframes`
50% { transform: scale(1.09) }`

export const BootstrapButton = styled(Button)(({ theme}) => ({
    boxShadow: "2px 2px 9px 0px #00000040",
    textTransform: 'none',
    fontSize: '2.40vh',
    fontFamily: "Red Hat Display, sans-serif",
    fontWeight: 700,
    height: '5.74vh',
    paddingLeft: 51,
    paddingRight: 51,
    borderRadius: useMediaQuery(theme.breakpoints.up('xl')) ? 25 : 100,
    alignSelf:"flex-start",
    backgroundColor: "#F35A50",
    '&:hover': {
      backgroundColor: "#F35A50",
      animation: `${pop} 0.3s linear 1`
    },
    '&:active': {
      color: '#000000'
    }
  }));