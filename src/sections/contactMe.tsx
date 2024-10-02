import * as React from 'react';
import { Input, styled, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Theme, Grid, Zoom } from "@mui/material";
import { Box } from "@mui/system"
import iconLinkedin from '../assets/Group 8.svg'
import iconPhone from '../assets/Group.svg'
import iconMail from '../assets/Group-1.svg'
import { useState } from "react";
import { BootstrapButton } from "../components/MyButton";
import emailjs from 'emailjs-com';
import thankYouPicDark from '../assets/ThankYouPicDark.png';
import thankYouPicLight from '../assets/ThankYouPicLight.png';
import { useDarkMode } from 'usehooks-ts';
import { ContactIcon } from '../components/contactIcon';
import CheckIcon from '@mui/icons-material/Check';

export interface ContactMeProp {}

const Img = styled('img')({
  objectFit: 'contain',
  alignSelf: 'end',
  right: '0px',
  position: 'absolute'
});

const ImgMobile = styled('img')({
  objectFit: 'contain',
  alignSelf: 'end',
  right: '0px'
});

const defaultValues = {
  name: "",
  subject: "",
  email: "",
  message: ""
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      background: theme.palette.mode === "dark" ? "#010513" : "#F3F5FC",
      minHeight: "100vh",
      display: 'flex'
    },
    formInput: {
      paddingTop: "1.9444vh",
      paddingBottom: "1.3vh",
      paddingLeft: "1.61vw",
      borderRadius: "25px",
      boxShadow: "2px 2px 9px rgba(0, 0, 0, 0.25)",
      background: theme.palette.mode === 'dark' ? '#1E2E68' : '#FFFFFF',
      fontSize: "2.04vh",
      fontWeight: 400,
      fontFamily: "Corbel, sans-serif",
      lineHeight: "2.4vh",
      display:"block"
    },
    iconPopover: {
      fontFamily: "Corbel_light, sans-serif",
      fontSize: "1.20vh",
      padding: "10px",
      borderRadius: "25px",
      lineHeight: "2.22vh"
    }
  }));

export const ContactMe: React.FC<ContactMeProp> = () => {
    const {isDarkMode} = useDarkMode();
    const classes = useStyles();
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('lg'))
    const [submitted, setSubmitted] = useState(false);
    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log(e.target.value);
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
      event.preventDefault();
      setSubmitted(true);
      emailjs.send("service_nivkbc6", "template_19j9c6s", formValues, "user_nEcYvdvpjW6MnSgXn82HH")
    };

    if (desktop) {
    return (
    <div
      className={classes.root}
      id="contact"
    >
     <Box
          paddingLeft="7vw"
          paddingRight="22.34vw"
          paddingTop="20.45vh"
          paddingBottom="21.19vh"
          width="100%"
          display="flex"
      >
        <Grid container justifyContent="space-between" direction="row">
                <Grid item  xs={6} container direction="column" spacing={1}>
                  <Grid item>
                      <Typography variant='body1'>
                        Get in touch !
                      </Typography>
                  </Grid>
                  <Grid item >
                      <Typography style={{lineHeight:"3.05vh"}} variant='subtitle1' gutterBottom>
                        If you have any inquiries,<br/> I would be happy to hear you !
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
                </Grid>
                  <Grid item container xs={6} direction="column">
                    <form>
                      <Grid item  container columnSpacing={6} >
                        <Grid item xs={6}>
                          <Input
                              id="name-input"
                              name="name"
                              placeholder="Your name"
                              type="text"
                              value={formValues.name}
                              onChange={handleInputChange}
                              disableUnderline
                              className={classes.formInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                          <Input
                              id="email-input"
                              name="email"
                              placeholder="Email adresse"
                              type="email"
                              value={formValues.email}
                              onChange={handleInputChange}
                              disableUnderline
                              className={classes.formInput}
                            />
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Input
                            id="subject-input"
                            name="subject"
                            placeholder="Subject"
                            value={formValues.subject}
                            onChange={handleInputChange}
                            disableUnderline
                            className={classes.formInput}
                            style={{marginTop: "2.778vh"}}
                          />
                      </Grid>
                      <Grid item>
                        <Input
                            id="message-input"
                            name="message"
                            placeholder="Message"
                            value={formValues.message}
                            onChange={handleInputChange}
                            disableUnderline
                            className={classes.formInput}
                            style={{marginTop: "2.778vh"}}
                            multiline
                            rows={9}
                          />
                      </Grid>
                      <BootstrapButton
                          style={{backgroundColor: "#ED4CEE", marginTop:"6.02vh"}}
                          variant="contained"
                          onClick={handleSubmit}
                          type="submit"
                        >
                          {submitted ? 
                          <Zoom in={submitted} style={{ transitionDelay: submitted ? '150ms' : '0ms' }}><CheckIcon fontSize="large"/></Zoom>
                          : 'Submit'}
                      </BootstrapButton>
                    </form>
                  </Grid>
            </Grid>
        </Box>
          {isDarkMode ? <Img alt="thankYouDark" src={thankYouPicDark} style={{width:"25.52vw", height:"25.555vh"}}/> :
          <Img alt="thankYouLight" src={thankYouPicLight} style={{width:"25.52vw", height:"25.555vh"}}/>
          }
        </div>)}
      else {
      return (
      <div
        className={classes.root}
        id="contact"
      >
      <Box
        paddingLeft="7vw"
        paddingRight="7vw"
        paddingTop="20.45vh"
        paddingBottom="5.19vh"
        width="100%"
        display="flex"
      >
      <Grid container justifyContent="space-between" direction="column">
                <Grid item>
                    <Typography variant='body1'>
                      Get in touch !
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography style={{lineHeight:"3.05vh"}} variant='subtitle1' gutterBottom>
                      If you have any inquiries,<br/> I would be happy to hear you !
                    </Typography>
                </Grid>
                <Grid item container marginTop="3vh" marginBottom="3vh" spacing={2}>
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
                  <form>
                      <Grid item>
                        <Input
                            id="name-input"
                            name="name"
                            placeholder="Your name"
                            type="text"
                            value={formValues.name}
                            onChange={handleInputChange}
                            disableUnderline
                            className={classes.formInput}
                          />
                      </Grid>
                      <Grid item>
                        <Input
                            id="email-input"
                            name="email"
                            placeholder="Email adresse"
                            type="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            disableUnderline
                            className={classes.formInput}
                            style={{marginTop: "2.778vh"}}
                          />
                      </Grid>
                    <Grid item>
                      <Input
                          id="subject-input"
                          name="subject"
                          placeholder="Subject"
                          value={formValues.subject}
                          onChange={handleInputChange}
                          disableUnderline
                          className={classes.formInput}
                          style={{marginTop: "2.778vh"}}
                          />
                    </Grid>
                    <Grid item>
                      <Input
                          id="message-input"
                          name="message"
                          placeholder="Message"
                          value={formValues.message}
                          onChange={handleInputChange}
                          disableUnderline
                          className={classes.formInput}
                          style={{marginTop: "2.778vh"}}
                          multiline
                          rows={9}
                          />
                    </Grid>
                    <BootstrapButton
                        style={{backgroundColor: "#ED4CEE", marginTop:"6.02vh"}}
                        variant="contained"
                        onClick={handleSubmit}
                        type="submit"
                      >
                        {submitted ? 
                        <Zoom in={submitted} style={{ transitionDelay: submitted ? '150ms' : '0ms' }}><CheckIcon fontSize="large"/></Zoom>
                        : 'Submit'}
                    </BootstrapButton>
                  </form>
                <Grid item> 
                  {isDarkMode ?
                    <ImgMobile alt="thankYouDark" src={thankYouPicDark} style={{width:"80%", marginLeft:"30%"}}/> :
                    <ImgMobile alt="thankYouLight" src={thankYouPicLight} style={{width:"80%", marginLeft:"30%"}}/>
                  }
                </Grid>
          </Grid>
      </Box>             
    </div>
  )}}