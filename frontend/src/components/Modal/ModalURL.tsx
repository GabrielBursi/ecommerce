import { Box, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Modal from 'react-modal';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

interface ModalProps {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    url: string
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root')

export function ModalURL({isOpen, setIsOpen, url}: ModalProps) {
    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} overlayClassName="Overlay">
            <Box display='flex' flexDirection='column' gap={1}>
                <Box display='flex' justifyContent='space-between' alignItems='center' gap={2}>
                    <Typography variant='subtitle1' color='black' fontWeight='bold'>
                        Compartilhar link do produto
                    </Typography>
                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon sx={{ fontSize: '0.8rem' }} />
                    </IconButton>
                </Box>
                <Box display='flex' justifyContent='space-between' alignItems='center' gap={2}>
                    <Box flex={1} alignItems='center'>
                        <TextField value={url} fullWidth InputProps={{readOnly: true}}/>
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <CopyToClipboard text={url}>
                            <IconButton color='primary' onClick={() => toast.success('Link do produto copiado!', {position: 'top-center'})} size='small' sx={{width: '50%', height:'50%'}}>
                                <ContentCopyIcon sx={{fontSize: '1.4rem'}}/>
                            </IconButton>
                        </CopyToClipboard>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}