import { useContext } from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import Modal from 'react-modal';
import { ProductsContext } from '../../contexts';

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

    const { isLoadingRemoveProduct } = useContext(ProductsContext)

    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} overlayClassName="Overlay">
            <Box display='flex' flexDirection='column' gap={2}>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Typography variant='h5' fontWeight='bold'>
                        {isLoadingRemoveProduct ? 'Excluindo...' : title}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight='light'>
                        {question}
                    </Typography>
                </Box>
                {isLoadingRemoveProduct && <LinearProgress color='primary' sx={{ margin: '1%' }} />}
                <Box display='flex' alignItems='center' gap={2} justifyContent='center'>
                    <Button disabled={isLoadingRemoveProduct} fullWidth variant='outlined' size='large' onClick={() => setIsOpen(false)}>NÃO</Button>
                    <Button disabled={isLoadingRemoveProduct} fullWidth variant='contained' size='large' onClick={action}>SIM</Button>
                </Box>
            </Box>
        </Modal>
    );
}