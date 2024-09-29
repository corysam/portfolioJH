import { Box, Grid, Link, Popover} from '@material-ui/core';
import { ReactNode, useState } from 'react';

export interface ContactIconProps {
    src: string
    alt: string
    link?: string
    style: React.CSSProperties;
    children?: ReactNode
}

export const ContactIcon: React.FC<ContactIconProps> = ({
    children,
    src,
    alt,
    link,
    style
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    return (
        <Grid item>
          {link ?
            <Link href={link}>
              <img alt={alt} src={src} style={style}/>
            </Link> : 
            <Box onClick={handleClick}>
               <img alt={alt} src={src} style={style}/>
            </Box>
          }
          <Popover
             anchorEl={anchorEl}
             open={open} 
             onBackdropClick={() => handleClose()}
             anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
             }}
             transformOrigin={{
               vertical: 'top',
               horizontal: 'center',
             }}
           >
             {children}
          </Popover>
        </Grid>
    )
}