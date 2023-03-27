import { Box, Button, Typography } from '@mui/material';
import Modal from 'react-modal';

interface ModalProps {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    action: () => void,
    question: string,
    title: string,
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

export function ModalAction({ isOpen, setIsOpen, question, action, title }: ModalProps) {

    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} overlayClassName="Overlay">
            <Box display='flex' flexDirection='column' gap={2}>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Typography variant='h5' fontWeight='bold'>
                        {title}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight='light'>
                        {question}
                    </Typography>
                </Box>
                <Box display='flex' alignItems='center' gap={2} justifyContent='center'>
                    <Button fullWidth variant='outlined' size='large' onClick={() => setIsOpen(false)}>NÃO</Button>
                    <Button fullWidth variant='contained' size='large' onClick={action}>SIM</Button>
                </Box>
            </Box>
        </Modal>
    );
}