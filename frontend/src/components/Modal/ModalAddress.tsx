import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';

interface ModalProps {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    title: string,
    btnText: string,
    isNewAddress: boolean
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px',
    },
};

Modal.setAppElement('#root')

export function ModalAddress({ isOpen, setIsOpen, btnText, title, isNewAddress }: ModalProps) {

    const url = 'https://viacep.com.br/ws/87005020/json/'

    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <Box display='flex' flexDirection='column' gap={1}>
                <Box display='flex' justifyContent='space-between' alignItems='center' gap={2} height='20%'>
                    <Box display='flex' alignItems='center' gap={1}>
                        <LocationOnIcon color='primary' />
                        <Typography variant='subtitle1' color='black' fontWeight='bold'>    
                            {title}
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setIsOpen(false)} color='primary'>
                        <CloseIcon sx={{ fontSize: '1.2rem' }} />
                    </IconButton>
                </Box>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label='CEP'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Indentificação' placeholder='Minha casa'/>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth label='Logradouro' placeholder='Ex: Rua dos Dados Falsos'/>
                        </Grid>
                        <Grid item xs={2}>
                            <TextField fullWidth label='Número' placeholder='000'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Complemento' placeholder='Ex: Bloco 99 Apto 999'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Referência' placeholder='Casa do portão roxo'/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Bairro' disabled />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth required label='Cidade' disabled />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField fullWidth required label='UF' disabled />
                        </Grid>
                    </Grid>
                    <Box display='flex' justifyContent='end' mt={2} height='50px'>
                        <Button variant='contained' sx={{fontSize: '1rem'}}>
                            {btnText}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
