import { Typography, useMediaQuery, useTheme } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { Grid, Link, Stack, Theme } from "@mui/material";
import { Box } from "@mui/system"
import { useState } from "react";
import { BootstrapButton } from "../components/MyButton";
import { ProjectCard } from "../components/ProjectCard";
import projects from "../constants/projects";
import { ProjectType } from "../entities/ProjectType";

export interface projectSelectorProp {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.mode === "dark" ? "linear-gradient(180deg, rgba(1, 5, 19, 0.06) 1.23%, #010513 99.72%)" : "linear-gradient(180deg, rgba(243, 245, 252, 0) 0%, #F3F5FC 20.1%)",
    minHeight: "100vh",
  },
  selectorLinks: {
    color: "#FFFFFF",
    fontWeight: 500,
    //fontFamily:"Red Hat Display, sans-serif",
    '&:hover': {
      color: "#F35A50",
      fontWeight: 700
    },
    '&:focus': {
      color: "#F35A50",
      fontWeight: 700,
      textDecoration: "underline"
    }
  }
}));

export const ProjectSelector: React.FC<projectSelectorProp> = () => {
  const [selectEverything, setSelectEverything] = useState(false);
  const [projectType, setProjectType] = useState<ProjectType | "">(ProjectType.UIUX);
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('lg'))
  
  const handlerChangeType = ( projectType: ProjectType ) => {
    setProjectType(projectType);
  }

  var projectIndex: number[] = [];
  if (!projectType)
    projectIndex = Array.from(Array(projects.length).keys());
  else {
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].type === projectType)
        projectIndex.push(i);
    }
  }
  projectIndex.sort((a:number, b:number) => {
    if (projects[a].order > projects[b].order)
      return 1;
    if (projects[a].order < projects[b].order)
      return -1;
    return 0;
  })
  projectIndex = projectIndex.filter(index => !projects[index].hidden)
  if (!selectEverything)
    projectIndex = projectIndex.filter(index => projects[index].type === projectType);
    return (
    <div
      id="Project-Selector"
      className={classes.root}
    >
      <Box
          paddingLeft="7vw"
          paddingRight="7vw "
          paddingTop="21.38vh"
          paddingBottom="21.38vh"
          width="100%"
          justifyContent="center"
      >
        <Typography variant='body1'>
          Some Project
        </Typography>
        {desktop ?
        <Box sx={{
          marginTop:"9.88vh",
          }}>
          <Stack spacing={7} direction="row" justifyContent="center">
            <Typography variant="subtitle1">
              <Link onClick={() => {setProjectType(ProjectType.UIUX); setSelectEverything(false);}} component="button" color="inherit" underline="hover" variant="inherit" className={classes.selectorLinks}>UI/UX</Link>
            </Typography>
            <Typography variant="subtitle1">
              <Link onClick={() => {setProjectType(ProjectType.GRAPHIC); setSelectEverything(false);}} component="button" color="inherit" underline="hover" variant="inherit" className={classes.selectorLinks}>Graphic</Link>
            </Typography>
            <Typography variant="subtitle1">
              <Link onClick={() => {setProjectType(ProjectType.AUDIOVISUAL); setSelectEverything(false);}} component="button" color="inherit" underline="hover" variant="inherit" className={classes.selectorLinks}>Audiovisual</Link>
            </Typography>
            <Typography variant="subtitle1">
              <Link onClick={() => {setProjectType(ProjectType.ILLUSTRATION); setSelectEverything(false);}} component="button" color="inherit"  underline="hover" variant="inherit" className={classes.selectorLinks}>Illustration</Link>
              </Typography>
            <Typography variant="subtitle1">
              <Link onClick={() => {setProjectType(ProjectType.GAME); setSelectEverything(false);}} component="button" color="inherit"  underline="hover" variant="inherit" className={classes.selectorLinks}>Game</Link>
            </Typography>
          </Stack>
          </Box> :
          <Box sx={{
            marginTop:"5.46vh",
            justifyContent:"center"
            }}>
            <Grid container spacing={1} direction="row" justifyContent="center" textAlign="center">
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">
                  <Link onClick={() => {setProjectType(ProjectType.UIUX); setSelectEverything(false);}} component="button" color="inherit" underline="hover" variant="inherit" className={classes.selectorLinks}>UI/UX</Link>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">
                  <Link onClick={() => {setProjectType(ProjectType.GRAPHIC); setSelectEverything(false);}} component="button" color="inherit" underline="hover" variant="inherit" className={classes.selectorLinks}>Graphic</Link>
                </Typography>
              </Grid >
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">
                  <Link onClick={() => {setProjectType(ProjectType.AUDIOVISUAL); setSelectEverything(false);}} component="button" color="inherit" underline="hover" variant="inherit" className={classes.selectorLinks}>Audiovisual</Link>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">
                  <Link onClick={() => {setProjectType(ProjectType.AUDIOVISUAL); setSelectEverything(false);}} component="button" color="inherit" underline="hover" variant="inherit" className={classes.selectorLinks}>Audiovisual</Link>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">
                  <Link onClick={() => {setProjectType(ProjectType.GAME); setSelectEverything(false);}} component="button" color="inherit"  underline="hover" variant="inherit" className={classes.selectorLinks}>Game</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        }
          <Box
            marginTop="50px"
            width="100%"
            justifyContent="center"
          >
          <Grid container justifyContent="center" rowSpacing={8} columnSpacing={{lg: 7, md: 0}}>
            {projectIndex.map((number) => (
            <ProjectCard
              index={number}
              everything={selectEverything}
              confidential={projects[number].confidential ? true : false}
            />
            ))}
          </Grid>
          <Box
            display={selectEverything ? "none" : "flex"}
            justifyContent="center"
          >
            <BootstrapButton
              sx={{
                marginTop:"109px"
              }}
              variant="contained"
              onClick={() => {
                setSelectEverything(true);
                setProjectType("");
              }}
            >
              See Everything
            </BootstrapButton>
          </Box>
        </Box>
      </Box>
    </div>
)}