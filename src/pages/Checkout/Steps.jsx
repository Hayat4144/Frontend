import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Fragment } from 'react';
import { Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

export default function Steps({ activestep }) {
    const steps = [
        {
            label: <Typography>Shipping</Typography>,
            Icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            Icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            Icon: <AccountBalanceIcon />
        },

    ]
    return (
        <Fragment>
            <Stepper activeStep={activestep} alternativeLabel>
                {steps.map((item, index) => (
                    <Step key={index}
                        active={activestep === index ? true : false}
                        completed={activestep >= index ? true : false}>
                        <StepLabel
                            style={{ color: activestep >= index ? '#434190' : 'rgba(0,0,0,0.649)' }}
                            icon={item.Icon}>{item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    )
}
