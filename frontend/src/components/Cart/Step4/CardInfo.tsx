import { useContext, useState } from 'react';
import { Box } from '@mui/material'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';
import { ResumeContext } from '../../../contexts';

export const CardInfo = () => {

    const { creditCardData } = useContext(ResumeContext)
    const [hover, setHover] = useState(false);

    return (
        <Box 
            bgcolor='#fafafb' 
            width='50%' 
            display='flex' 
            flexDirection='column' 
            alignItems='center' 
            justifyContent='center' 
            gap={1}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Cards
                cvc={creditCardData?.cvv || ''}
                expiry={creditCardData?.validate || ''}
                focused={hover ? 'cvc' : 'number'}
                name={creditCardData?.name || ''}
                number={creditCardData?.number || ''}
                locale={{valid: ''}}
            />
        </Box>
    )
}
