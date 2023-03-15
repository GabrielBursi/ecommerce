import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import '../../TraducoesYup'

import Modal from 'react-modal';
import MaskedInput from 'react-text-mask';

import { Box, Button, CircularProgress, Grid, IconButton, TextField, Typography } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';

import { MaskInputCep } from './utils';
interface ModalProps {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    title: string,
    btnText: string,
    isNewAddress: boolean
}

interface IForm {
    cep: string,
    identification: string,
    street: string,
    number: string,
    complement?: string,
    ref?: string,
    neighborhood: string,
    city?: string,
    state?: string,
}

const addressSchema: yup.ObjectSchema<IForm> = yup.object({
    cep: yup.string().required(),
    identification: yup.string().required().default('Endereço Principal'),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string(),
    ref: yup.string(),
    neighborhood: yup.string().required(),
    city: yup.string(),
    state: yup.string(),
    
}) 

type FormData = yup.InferType<typeof addressSchema>;

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

    const [cep, setCep] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: {errors} } = useForm<IForm>({ 
        mode: 'onSubmit', 
        resolver: yupResolver(addressSchema) 
    })

    const onSubmit = (data: FormData) => {
        addressSchema.validate(data, { abortEarly: false })
            .then(validData => { console.log(validData) })
    };

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name='cep'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField {...field}
                                            variant='outlined'
                                            fullWidth 
                                            label='CEP'
                                            placeholder='Insira o CEP'
                                            value={cep}
                                            error={!!errors.cep}
                                            helperText={errors?.cep?.message}
                                            onChange={(e)=>setCep(e.target.value)}
                                            InputProps={{
                                                inputComponent: MaskedInput as any,
                                                inputProps: {
                                                    mask: MaskInputCep,
                                                    type: 'tel',
                                                },
                                            }}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='identification'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField {...field}
                                            variant='outlined'
                                            error={!!errors.identification}
                                            helperText={errors?.identification?.message}
                                            fullWidth 
                                            label='Indentificação'
                                            placeholder='Minha casa'
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <Controller
                                    name='street'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField {...field}
                                            variant='outlined'
                                            error={!!errors.street}
                                            helperText={errors?.street?.message}
                                            fullWidth 
                                            label='Rua'
                                            placeholder='Ex: Rua dos Dados Falsos'
                                            disabled={isLoading}
                                            InputProps={{ endAdornment: (isLoading && <CircularProgress size={30}/>) }}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Controller
                                    name='number'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField {...field}
                                            variant='outlined'
                                            error={!!errors.number}
                                            helperText={errors?.number?.message}
                                            fullWidth 
                                            label='Número'
                                            placeholder='000'
                                            InputProps={{ endAdornment: (isLoading && <CircularProgress size={30} />) }}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='complement'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField {...field}
                                            variant='outlined'
                                            error={!!errors.complement}
                                            helperText={errors?.complement?.message}
                                            fullWidth 
                                            label='Complemento'
                                            placeholder='Ex: Bloco 99 Apto 999'
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='ref'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField {...field}
                                            variant='outlined'
                                            error={!!errors.ref}
                                            helperText={errors?.ref?.message}
                                            fullWidth 
                                            label='Referência'
                                            placeholder='Ex: Casa do portão roxo'
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='neighborhood'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField {...field}
                                            variant='outlined'
                                            error={!!errors.neighborhood}
                                            helperText={errors?.neighborhood?.message}
                                            fullWidth 
                                            label='Bairro'
                                            disabled={isLoading}
                                            InputProps={{ endAdornment: (isLoading && <CircularProgress size={30} />) }}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <Controller
                                    name='city'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField {...field}
                                            variant='filled'
                                            error={!!errors.city}
                                            helperText={errors?.city?.message}
                                            fullWidth 
                                            label='Cidade' 
                                            required 
                                            disabled 
                                            InputProps={{endAdornment: (isLoading ? <CircularProgress size={30} /> : <IconButton disabled><LockIcon /></IconButton>)}}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Controller
                                    name='state'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField {...field}
                                            variant='filled'
                                            error={!!errors.state}
                                            helperText={errors?.state?.message}
                                            fullWidth 
                                            label='UF' 
                                            required 
                                            disabled 
                                            InputProps={{endAdornment: (isLoading ? <CircularProgress size={30} /> : <IconButton disabled><LockIcon /></IconButton>)}}
                                        />
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Box display='flex' justifyContent='end' mt={2} height='50px'>
                            <Button type='submit' variant='contained' sx={{fontSize: '1rem'}}>
                                {btnText}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
}
