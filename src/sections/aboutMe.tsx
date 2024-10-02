import { styled, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { Grid, Stack, Theme } from "@mui/material";
import { Box } from "@mui/system"
import aboutMePic from "../assets/aboutMe.png"
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { BootstrapButton } from "../components/MyButton";

export interface AboutMeProp {}

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  minidth: '100%',
  minHeight: '100%',
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "100vh",
  },
  aboutMeDesc: {
    fontFamily: "Corbel_bold, sans-serif",
    fontWeight: 700,
    fontSize: "1.85vh",
    width: "100%",
    lineHeight: "2.222vh",
  },
  interestText: {
    fontFamily: "Corbel_bold, sans-serif",
    fontWeight: 700,
    fontSize: "1.85vh",
    lineHeight: "2.222vh",
  },
  mobileIcon: {
    fontSize: "90px"
  }
}));

export const AboutMe: React.FC<AboutMeProp> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('lg'))
  return (
  <div
    id="about"
    className={classes.root}
  >
    {desktop ?
    <Box
        paddingLeft="7vw"
        paddingRight="7vw"
        paddingTop="15.37vh"
        paddingBottom="21.38vh"
        width="100%"
        display="flex"
        flexDirection="row"
    >
      <Stack direction="column" spacing={1}>
        <Typography variant="body1" style={{marginBottom:"1.20vh", lineHeight:"6.01vh"}}>
          About me
        </Typography>
        <Typography variant="subtitle1" style={{marginBottom:"5.46vh"}}>
          UI/UX Designer
        </Typography>
        <Typography className={classes.aboutMeDesc} style={{marginBottom:"5.46vh"}}>
        I'm a multidisciplinary digital designer, based in France,<br/>
         focused on UI/UX design and Illustration.
        </Typography>
        <Grid container rowSpacing={3}>
          <Grid container wrap="nowrap" item spacing={2}>
            <Grid item>
              <FavoriteBorderOutlinedIcon fontSize="large" sx={{color: "#F35A50"}}/>
            </Grid>
            <Grid item>
                <Typography style={{width:"75%"}} className={classes.interestText}>
                I have always been very curious and passionate about various fields, primarily the vast domain of creation (sculpture, drawing, miniature model...) and the environment (eco-design, biology, animals). 
                </Typography>
            </Grid>
          </Grid>
          <Grid container wrap="nowrap" item spacing={2}>
            <Grid item>
              <BookmarkBorderOutlinedIcon fontSize="large" sx={{color: "#5FE46C"}}/>
            </Grid>
            <Grid item>
              <Typography className={classes.interestText}>
              Master's degree in Media Design.<br/>
              Bachelor's degree in interaction design.<br/>
              Diploma in Animation and Illustration (Master).
              </Typography>
            </Grid>
          </Grid>
          <Grid container wrap="nowrap" item spacing={2}>
            <Grid item>
              <RocketLaunchOutlinedIcon fontSize="large" sx={{color: "#20E0EE"}}/>
            </Grid>
            <Grid item>
                <Typography style={{width:"75%"}} className={classes.interestText}>
                Always ready to embark on new adventures and step out of my comfort zone. 
                </Typography>
            </Grid>
          </Grid>
        </Grid>
        <BootstrapButton
            style={{backgroundColor: "#FF9345", marginTop:"10.09vh"}}
            variant="contained"
            onClick={() => {
              const link = document.createElement("a");
              link.download = `CV-Juliette-Herlem.pdf`;
              link.href = "./cvportfolio.pdf";
              link.click();
            }}
          >
            Download CV
        </BootstrapButton>
      </Stack>
      <Img alt="aboutme" src={aboutMePic} style={{maxWidth:"43.8vw", maxHeight: "67.777vh"}}/>
    </Box> :
        <Box
        paddingLeft="7vw"
        paddingRight="7vw"
        paddingTop="15.37vh"
        paddingBottom="21.38vh"
        width="100%"
        display="flex"
        flexDirection="column"
    >
      <Stack direction="column" marginBottom="10vh" spacing={1}>
        <Typography variant="body1" style={{lineHeight:"6.01vh"}}>
          About me
        </Typography>
        <Typography variant="subtitle1" style={{marginBottom:"5.46vh"}}>
          UI/UX Designer
        </Typography>
        <Typography className={classes.aboutMeDesc} style={{marginBottom:"5.46vh"}}>
          I'm a multidisciplinary digital designer, based in France,
          focused on UI/UX design and Illustration.
        </Typography>
        <Grid container alignItems="center" rowSpacing={3}>
          <Grid container item spacing={2}>
            <Grid item xs={2}  fontSize="70px">
              <FavoriteBorderOutlinedIcon fontSize="inherit" sx={{color: "#F35A50"}}/>
            </Grid>
            <Grid item xs={10}>
                <Typography style={{width:"100%"}} className={classes.interestText}>
                I have always been very curious and passionate about various fields, primarily the vast domain of creation (sculpture, drawing, miniature model...) and the environment (eco-design, biology, animals). 
                </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" item spacing={2}>
            <Grid item xs={2} fontSize="70px">
              <BookmarkBorderOutlinedIcon fontSize="inherit" sx={{color: "#5FE46C"}}/>
            </Grid>
            <Grid item xs={10}>
              <Typography className={classes.interestText}>
              Master's degree in Media Design.<br/>
              Bachelor's degree in interaction design.<br/>
              Diploma in Animation and Illustration (Master).
              </Typography>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={2}  fontSize="70px">
              <RocketLaunchOutlinedIcon fontSize="inherit" sx={{color: "#20E0EE"}}/>
            </Grid>
            <Grid item xs={10}>
                <Typography style={{width:"100%"}} className={classes.interestText}>
                Always ready to embark on new adventures and step out of my comfort zone. 
                </Typography>
            </Grid>
          </Grid>
        </Grid>
        <BootstrapButton
            style={{backgroundColor: "#FF9345", marginTop:"5.46vh"}}
            variant="contained"
            onClick={() => {
              const link = document.createElement("a");
              link.download = `CV-Juliette-Herlem.pdf`;
              link.href = "./cvportfolio.pdf";
              link.click();
            }}
          >
            Download CV
        </BootstrapButton>
      </Stack>
      <Img alt="aboutme" src={aboutMePic} style={{margin: "-5.5vw",maxWidth:"100vw", maxHeight: "67.777vh"}}/>
    </Box>}
  </div>
)}