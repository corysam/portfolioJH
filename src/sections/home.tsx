import { Box, Grid, makeStyles, styled, Theme, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import iconLinkedin from '../assets/Group 8.svg'
import iconPhone from '../assets/Group.svg'
import iconMail from '../assets/Group-1.svg'
import figmaPic from '../assets/imageintro.png'
import { Link as Scroll } from 'react-scroll';
import { BootstrapButton } from '../components/MyButton';
import { ContactIcon } from '../components/contactIcon';

export interface HomeProp {}

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    minidth: '100%',
    minHeight: '100%',
    float: 'right',
  });

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      minHeight: "100vh",
    },
    iconPopover: {
      fontFamily: "Corbel_light, sans-serif",
      fontSize: "1.20vh",
      padding: "10px",
      borderRadius: "25px",
      lineHeight: "2.22vh"
    }
  }));

export const Home: React.FC<HomeProp> = () => {
    const theme = useTheme();
    const classes = useStyles();
    const mobile = useMediaQuery(theme.breakpoints.up('lg'))
    return (
        <Box
            id="home"
            marginLeft={mobile ?"7vw" : "0"}
            marginRight={mobile ?"7vw" : "0"}
            display="flex"
            justifyContent={mobile ? "flex-start" : "center"}
            height="85.7vh"
          >
            {mobile ?
            <Grid container justifyContent="space-between" alignItems="center" direction="row">
                <Grid item  xs={4} container direction="column" spacing={1}>
                  <Grid item>
                      <Typography variant='body1'>
                        Hi, I'm Juliette
                      </Typography>
                  </Grid>
                  <Grid item >
                      <Typography variant='subtitle1' gutterBottom>
                        I’m a UI/UX designer based in France. 
                      </Typography>
                  </Grid>
                  <Grid item container spacing={1}>
                    <ContactIcon
                      alt="linkedin-icon"
                      src={iconLinkedin}
                      style={{width:"1.635vw", height:"2.907vh"}}
                      link="https://www.linkedin.com/in/juliette-herlem-b4bb03177"
                    >
                    </ContactIcon>
                    <ContactIcon
                      alt="phon-icon"
                      src={iconPhone}
                      style={{width:"1.635vw", height:"2.907vh"}}
                    >
                      <Typography className={classes.iconPopover} >+33 782556339</Typography>
                    </ContactIcon>
                    <ContactIcon
                      alt="mail-icon"
                      src={iconMail}
                      style={{width:"1.635vw", height:"2.907vh"}}
                    >
                      <Typography className={classes.iconPopover} >juliette.herlem@gmail.com</Typography>
                    </ContactIcon>
                  </Grid>
                  <Grid item>
                    <Scroll to="contact" smooth>
                      <BootstrapButton style={{backgroundColor: "#5FE46C", marginTop:"13.88vh", }} variant="contained">
                        Get in touch !
                      </BootstrapButton>
                    </Scroll>
                  </Grid>
                </Grid>
              <Grid item xs={7} >
                  <Img alt="figma-pic" style={{maxWidth:"46vw", maxHeight: "55.7vh"}} src={figmaPic}/>
              </Grid>
            </Grid> : 
            <Grid  xs={12} container direction="column" alignItems="center" justifyContent='center' spacing={3}>
                  <Grid item>
                    <Img alt="figma-pic" style={{maxWidth:"100vw", width: "100%",maxHeight: "55.7vh", paddingBottom: "100px"}} src={figmaPic}/>
                  </Grid>
                  <Grid item>
                      <Typography variant='body1' align="center">
                        Hi, I'm Juliette
                      </Typography>
                  </Grid>
                  <Grid item >
                      <Typography variant='subtitle1' gutterBottom align="center">
                        I’m a UI/UX designer based in France. 
                      </Typography>
                  </Grid>
                  <Grid justifyContent='center' item container spacing={6}>
                    <ContactIcon
                      alt="linkedin-icon"
                      src={iconLinkedin}
                      style={{width:"70px"}}
                      link="https://www.linkedin.com/in/juliette-herlem-b4bb03177"
                    >
                    </ContactIcon>
                    <ContactIcon
                      alt="phon-icon"
                      src={iconPhone}
                      style={{width:"70px"}}
                    >
                      <Typography className={classes.iconPopover} >+33 782556339</Typography>
                    </ContactIcon>
                    <ContactIcon
                      alt="mail-icon"
                      src={iconMail}
                      style={{width:"70px"}}
                    >
                      <Typography className={classes.iconPopover} >juliette.herlem@gmail.com</Typography>
                    </ContactIcon>
                  </Grid>
                  <Grid item>
                    <Scroll to="contact" smooth>
                      <BootstrapButton style={{backgroundColor: "#5FE46C", marginTop:"13.88vh", }} variant="contained">
                        Get in touch !
                      </BootstrapButton>
                    </Scroll>
                  </Grid>
                </Grid>
            }
          </Box>
    )}