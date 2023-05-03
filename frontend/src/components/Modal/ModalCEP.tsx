import { useContext, useState } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Modal from 'react-modal';
import { ResumeContext } from '../../contexts';
import { Cep } from '../CEP';
import { MaskInputCep } from './utils';
import { CustomInput } from '../Form';

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

    const { deliveryOptions } = useContext(ResumeContext)

    function showCepOptions() {
        if (cep.length >= 9) {
            setShowOptions(true)
        } else {
            setShowOptions(false)
        }

    }

    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} overlayClassName="Overlay">
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
                        <TextField
                            fullWidth
                            label='CEP'
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            InputProps={{
                                inputComponent: CustomInput as any,
                                inputProps: {
                                    mask: MaskInputCep,
                                    type: 'tel',
                                },
                            }}
                            defaultValue=''
                        />
                    </Box>
                    <Box display='flex' justifyContent='center' height='56px'>
                        <Button variant='contained' sx={{height: '100%'}} onClick={showCepOptions}>ALTERAR CEP</Button>
                    </Box>
                </Box>
                <Box display='flex' flexDirection='column' gap={1}>
                    {showOptions && 
                        deliveryOptions?.map(option => (
                            <Cep days={option.days} name={option.name} price={option.price} rating={option.rating} key={option.name}/>
                        ))
                    }
                    
                </Box>
            </Box>
        </Modal>
    );
}
