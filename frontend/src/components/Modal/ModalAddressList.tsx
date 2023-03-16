import { useContext } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';
import { AddressContext } from '../../contexts';
import { InfoAddress } from '../Cart';

interface ModalProps {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px'
    },
};

export function ModalAddressList({ isOpen, setIsOpen }: ModalProps) {

    const { addressList } = useContext(AddressContext)
    
    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <Box display='flex' flexDirection='column' gap={1}>
                <Box display='flex' justifyContent='space-between' alignItems='center' gap={2} height='20%'>
                    <Box display='flex' alignItems='center' gap={1}>
                        <LocationOnIcon color='primary' />
                        <Typography variant='subtitle1' color='black' fontWeight='bold'>
                            SELECIONE O ENDEREÇO
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon sx={{ fontSize: '1.2rem' }} />
                    </IconButton>
                </Box>
                <Box flex={1} display='flex' flexDirection='column' gap={1} width='600px'>
                    {addressList.map(address => 
                        <InfoAddress 
                            key={address.cep}
                            cep={address.cep}
                            identification={address.identification}
                            street={address.street}
                            city={address.city}
                            state={address.state}
                            complement={address.complement}
                            number={address.number}
                            isOnModal={true}
                        />
                    )}
                </Box>
            </Box>
        </Modal>
    );
}
