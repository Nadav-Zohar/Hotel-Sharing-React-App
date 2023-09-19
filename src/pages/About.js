import * as React from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import "./About.css";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    }));

    const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
    ))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    export default function CustomizedAccordions() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        < >
            <div className="about-header">
                <h1>Welcome to my project!</h1>
                <p>I'm Nadav Zohar, and I'm thrilled to introduce you to my latest endeavor - a dynamic web application built with React. This project combines my passion for web development with the goal of delivering a powerful and user-friendly experience.</p>
            </div>
            <div className="about-content">
                <div className="about-text">
                    <h2>Project Overview</h2>
                    <p>
                        The heart of this project lies in its ability to seamlessly interact with a REST API, allowing users to access and manipulate data effortlessly. From user authentication to handling tokens, we've ensured that security is a top priority.
                    </p>
                </div>
            </div>
            <div className='accordion-wrapper'>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography sx={{fontWeight: 'bold', fontFamily: "Courier New"}}>Dark Mode:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{fontWeight: 'bold', fontFamily: "Courier New"}}>
                        We've implemented a stylish dark mode for your comfort. Whether you prefer a light or dark interface, we've got you covered.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography sx={{fontWeight: 'bold', fontFamily: "Courier New"}}>Token Handling:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{fontWeight: 'bold', fontFamily: "Courier New"}}>
                        Your security is our concern. We've incorporated token handling to safeguard your data and privacy.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography sx={{fontWeight: 'bold', fontFamily: "Courier New"}}>User Authentication:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{fontWeight: 'bold', fontFamily: "Courier New"}}>
                        Our user authentication system ensures that your information is protected and accessible only to you.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                        <Typography sx={{fontWeight: 'bold', fontFamily: "Courier New"}}>Responsive Design:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{fontWeight: 'bold', fontFamily: "Courier New"}}>
                        The web application is designed to adapt gracefully to various screen sizes, ensuring a smooth experience on all devices.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                        <Typography sx={{fontWeight: 'bold', fontFamily: "Courier New"}}>Icons Galore:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{fontWeight: 'bold', fontFamily: "Courier New"}}>
                        We've integrated a plethora of icons from Font Awesome and Material Icons to make navigation and interaction intuitive.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="about-content">
                <div className="about-text">
                    <h2>Get Started </h2>
                    <p>
                        Ready to explore? Dive into the world of our web application, where functionality meets aesthetics. Don't forget to check out our README.md for detailed information on setting up and using the application.
                    </p>
                </div>
            </div>
            <div className="about-content">
                <div className="about-text">
                    <h2>Contact Me </h2>
                    <p>
                    Have questions or feedback? I'd love to hear from you. Feel free to reach out via nadavzohar542@gmail.com or connect with me on social media. <br /> <br />
                    Thank you for joining me on this exciting journey of web development. Together, we'll create memorable digital experiences!
                    </p>
                </div>
            </div>
        </>
    );
}