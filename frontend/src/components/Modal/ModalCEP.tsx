import { useContext, useState } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Modal from 'react-modal';
import InputMask from "react-input-mask";
import { ProductsContext } from '../../contexts';
import { Cep } from '../CEP';

interface ModalProps {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    cep: string,
    setCep: (cep: string) => void,
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px'
    },
};

Modal.setAppElement('#root')

export function ModalCEP({ isOpen, setIsOpen, cep, setCep }: ModalProps) {

    const [showOptions, setShowOptions] = useState(true);

    const { cepOptions } = useContext(ProductsContext)

    function showCepOptions() {
        if (cep.length >= 9) {
            setShowOptions(true)
        } else {
            setShowOptions(false)
        }

    }

    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <Box display='flex' flexDirection='column' gap={1}>
                <Box display='flex' justifyContent='space-between' alignItems='center' gap={2} height='20%'>
                    <Box display='flex' alignItems='center' gap={1}>
                        <LocalShippingIcon color='primary'/>
                        <Typography variant='subtitle1' color='black' fontWeight='bold'>
                            FRETE E PRAZO
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon sx={{ fontSize: '1.2rem' }} />
                    </IconButton>
                </Box>
                <Box display='flex' alignItems='center' gap={1} height='10%'>
                    <LocationOnIcon color='primary' sx={{fontSize:'1.2rem'}}/>
                    <Typography variant='body2' color='black'>
                        CEP {cep}
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' alignItems='center' gap={2}>
                    <Box flex={1} alignItems='center'>
                        <InputMask
                            mask="99999-999"
                            value={cep}
                            maskPlaceholder="_____-___"
                            onChange={(e) => setCep(e.target.value)}
                        >
                            <TextField value={cep} fullWidth placeholder='Insira o CEP' />
                        </InputMask>
                    </Box>
                    <Box display='flex' justifyContent='center' height='56px'>
                        <Button variant='contained' sx={{height: '100%'}} onClick={showCepOptions}>ALTERAR CEP</Button>
                    </Box>
                </Box>
                <Box display='flex' flexDirection='column' gap={1}>
                    {showOptions && 
                        cepOptions.map(option => (
                            <Cep days={option.days} name={option.name} price={option.price} rating={option.rating} key={option.name}/>
                        ))
                    }
                    
                </Box>
            </Box>
        </Modal>
    );
}
