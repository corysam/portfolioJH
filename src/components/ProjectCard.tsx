import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import { Modal, styled, Typography, useMediaQuery, useTheme  } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ProjectType } from "../entities/ProjectType";
import projects from "../constants/projects";
import { Grid } from "@mui/material";
import {useNavigate} from 'react-router-dom';

interface ProjectCardProps {
  className?: string;
  index: number;
  everything?: boolean;
  confidential: boolean;
}

interface Props {
  index: number;
  confidential: boolean;
}

const Img = styled('img')({
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const useStyles = makeStyles({
    thumbnail: (props: Props) => ({
      backgroundSize: "cover",
      backgroundPosition: "center",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "25px",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${process.env.NODE_ENV === 'development' ? `http://localhost:3000/julietteherlem/thumbails/project-${props.index}.png` : `thumbails/project-${props.index}.png`})`,
      '&:hover': {
        backgroundImage: `${props.confidential ? `url(thumbails/confidential.png), ` : ``}linear-gradient(180deg, rgba(243, 90, 80, 0.9) 0%, rgba(243, 90, 80, 0.9) 100%), url(${`thumbails/project-${props.index}.png`})`
      }
    }),
    tagbox: {
      marginTop: "23px",
      marginLeft: "28px",
      marginRight: "28px",
      paddingTop:"5px",
      paddingBottom:"5px",
      paddingLeft:"22px",
      paddingRight:"22px",
     background: "#FFFFFF",
     boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
     borderRadius: "17px",
     color: "#071030"
    },
    typeBox: {
      marginTop:"20px",
      marginLeft: "28px",
      marginBottom: "23px",
      marginRight: "28px",
      paddingTop:"5px",
      paddingBottom:"5px",
      paddingLeft:"22px",
      paddingRight:"22px",
      background: "#000000",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "17px",
      color: "#FFFFFF"
    },
    tagName: {
      fontSize: "22px",
      lineHeight: "2.7vh",
      fontWeight: 700
    },
    typeName: {
      fontSize: "18px",
      lineHeight: "2.7vh",
      fontWeight: 700
    },
    illustrationsDesktop: {
      position: "absolute",
      top:"50%",
      left:"50%",
      height:"100%",
      transform:"translate(-50%, -50%)",
      display:'flex',
      justifyContent:"center",
      alignItems:'center',
    },
    illustrationsMobile: {
      position:"absolute",
      top:"50%",
      left:"50%",
      width:"100%",
      transform:"translate(-50%, -50%)",
      display:'flex',
      justifyContent:"center",
      alignItems:'center',
    }
})

export const ProjectCard: React.FC<ProjectCardProps> = ({
  index,
  everything,
  confidential
}) => {
      const {name, type} = projects[index];
    var [over, setOver] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const props = {index, confidential};
    const classes = useStyles(props);
    const navigate = useNavigate();
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('lg'))
  return (
    <Grid item xl={3} lg={4} md={12} sm={12}>
      <Box
        onClick={() => {
          if (type === ProjectType.ILLUSTRATION)
            handleOpen()
          else if (index < projects.length) {
            navigate(`/project/${index}`)
          }
        }}
        onMouseEnter={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        sx={desktop ? {
          height: "25vh",
          width: "100%",
        } : {
          width: "100%",
          paddingTop:"75%"
        }}
        justifySelf="center"
        className={classes.thumbnail}
        id={`Project-${index}`}
      >
        <Box
            display={over && !confidential ? "inline-block" : "none"}
            className={classes.tagbox}
          >
          <Typography className={classes.tagName}>{name}</Typography>
        </Box>
        <Box
          display={over && everything ? "inline-block" : "none"}
          className={classes.typeBox}
        >
          <Typography className={classes.typeName}>{type}</Typography>
        </Box>
      </Box>
      <Modal
        keepMounted
        open={open}
        onBackdropClick={handleClose}
      >
      <Box className={desktop ? classes.illustrationsDesktop : classes.illustrationsMobile}>
          <Img alt="illlustration" src={`${process.env.NODE_ENV === 'development' ? `http://localhost:3000/julietteherlem/illustrations/illustration-${index}.jpg` : `illustrations/illustration-${index}.jpg`}`}/>
      </Box>
      </Modal>
    </Grid>
  );
};
