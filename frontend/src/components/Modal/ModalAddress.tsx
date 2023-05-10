/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import '../../TraducoesYup'

import Modal from 'react-modal';

import { Box, Button, CircularProgress, Grid, IconButton, LinearProgress, TextField, Typography } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';

import { MaskInputCep } from './utils';
import { AddressContext } from '../../contexts';
import { IAddress, IViaCep } from '../../types';
import { CustomInput } from '../Form';
interface ModalProps {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    title: string,
    btnText: string,
    isNewAddress?: boolean,
    addressFind?: IAddress
}

const addressSchema: yup.ObjectSchema<Omit<IAddress, 'isSelected'>> = yup.object({
    cep: yup.string().required(),
    identification: yup.string().required(),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string(),
    ref: yup.string(),
    neighborhood: yup.string().required(),
    city: yup.string(),
    state: yup.string(),
    
}) 

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

export function ModalAddress({ isOpen, setIsOpen, btnText, title, isNewAddress = true, addressFind }: ModalProps) {
    const { 
            control, 
            handleSubmit, 
            formState: {errors}, 
            setValue, 
            setFocus, 
            watch, 
            setError, 
            clearErrors, 
            reset 
        } = useForm<IAddress>({ 
        mode: 'onSubmit', 
        resolver: yupResolver(addressSchema) 
    })

    const cep = watch('cep', '')

    const { createAddress, editAddress, isLoading } = useContext(AddressContext)

    const [isLoadingViaCep, setIsLoadingViaCep] = useState(false);

    useEffect(() => {
        
        clearErrors('cep')

        if(!cep.includes('_') && cep !== '' && isNewAddress){

            setIsLoadingViaCep(true)

            axios(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`)
                .then(({data}) => {
                    setIsLoadingViaCep(false)
                    
                    if(data.erro){
                        return setError('cep', { type: 'custom', message: 'CEP não encontrado' });
                    }

                    clearErrors('neighborhood')
                    clearErrors('street')
                    
                    const dataTyped: IViaCep = data
                    setValue('city', dataTyped.localidade)
                    setValue('state', dataTyped.uf)
                    setValue('neighborhood', dataTyped.bairro)
                    setValue('street', dataTyped.logradouro)
                    setFocus('number')
                })
                .catch(error => {
                    console.log(error);
                })
        }
        
    }, [cep]);

    useEffect(() => {
        reset()
        if(addressFind){
            setValue('cep', addressFind.cep)
            setValue('city', addressFind.city)
            setValue('complement', addressFind.complement)
            setValue('identification', addressFind.identification)
            setValue('neighborhood', addressFind.neighborhood)
            setValue('ref', addressFind.ref)
            setValue('street', addressFind.street)
            setValue('state', addressFind.state)
            setValue('number', addressFind.number)
        }
    }, [isOpen]);

    function onSubmit(data: IAddress) {
        addressSchema.validate(data, { abortEarly: false })
        .then(async (validData) => { 
                if(addressFind){
                    await editAddress(addressFind.cep, validData)
                    setIsOpen(false)
                }else{
                    const newAddress =  await createAddress(validData)
                    if(newAddress instanceof Error){
                        setError('cep', {type: 'custom', message: newAddress.message})
                        return
                    }
                    setIsOpen(false) 
                }
            })
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} overlayClassName="Overlay">
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
                {isLoading && <LinearProgress color='primary' sx={{marginBottom: '2%'}}/>}
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name='cep'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField 
                                            {...field}
                                            autoComplete='off'
                                            variant='outlined'
                                            fullWidth 
                                            label='CEP *'
                                            placeholder='Insira o CEP'
                                            error={!!errors.cep}
                                            helperText={errors?.cep?.message}
                                            disabled={isLoadingViaCep || !isNewAddress}
                                            InputProps={{
                                                inputComponent: CustomInput as any,
                                                inputProps: {
                                                    mask: MaskInputCep,
                                                    type: 'tel',
                                                },
                                                endAdornment: (!isNewAddress && <IconButton disabled><LockIcon /></IconButton>)
                                            }}
                                            defaultValue=''
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='identification'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField 
                                            {...field}
                                            autoComplete='off'
                                            variant='outlined'
                                            error={!!errors.identification}
                                            helperText={errors?.identification?.message}
                                            fullWidth 
                                            label='Indentificação *'
                                            placeholder='Minha casa'
                                            defaultValue=''
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <Controller
                                    name='street'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField 
                                            {...field}
                                            autoComplete='off'
                                            variant='outlined'
                                            error={!!errors.street}
                                            helperText={errors?.street?.message}
                                            fullWidth 
                                            label='Rua *'
                                            placeholder='Ex: Rua dos Dados Falsos'
                                            disabled={isLoadingViaCep || !isNewAddress}
                                            InputProps={{ endAdornment: (isLoadingViaCep && <CircularProgress size={30} />) || (!isNewAddress && <IconButton disabled><LockIcon /></IconButton>) }}
                                            defaultValue=''
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Controller
                                    name='number'
                                    control={control}
                                    render={({ field: {ref, ...field} }) => 
                                        <TextField 
                                            {...field}
                                            autoComplete='off'
                                            inputRef={ref}
                                            variant='outlined'
                                            error={!!errors.number}
                                            helperText={errors?.number?.message}
                                            fullWidth 
                                            label='Número *'
                                            placeholder='000'
                                            defaultValue=''
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='complement'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField 
                                            {...field}
                                            autoComplete='off'
                                            variant='outlined'
                                            error={!!errors.complement}
                                            helperText={errors?.complement?.message}
                                            fullWidth 
                                            label='Complemento'
                                            placeholder='Ex: Bloco 99 Apto 999'
                                            defaultValue=''
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='ref'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField 
                                            {...field}
                                            autoComplete='off'
                                            variant='outlined'
                                            error={!!errors.ref}
                                            helperText={errors?.ref?.message}
                                            fullWidth 
                                            label='Referência'
                                            placeholder='Ex: Casa do portão roxo'
                                            defaultValue=''
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='neighborhood'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField 
                                            {...field}
                                            autoComplete='off'
                                            variant='outlined'
                                            error={!!errors.neighborhood}
                                            helperText={errors?.neighborhood?.message}
                                            fullWidth 
                                            label='Bairro *'
                                            disabled={isLoadingViaCep || !isNewAddress}
                                            InputProps={{ endAdornment: (isLoadingViaCep && <CircularProgress size={30} />) || (!isNewAddress && <IconButton disabled><LockIcon /></IconButton>) }}
                                            defaultValue=''
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <Controller
                                    name='city'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField 
                                            {...field}
                                            autoComplete='off'
                                            variant='filled'
                                            error={!!errors.city}
                                            helperText={errors?.city?.message}
                                            fullWidth 
                                            label='Cidade' 
                                            required 
                                            disabled 
                                            InputProps={{endAdornment: (isLoadingViaCep ? <CircularProgress size={30} /> : <IconButton disabled><LockIcon /></IconButton>)}}
                                            defaultValue=''
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Controller
                                    name='state'
                                    control={control}
                                    render={({ field }) => 
                                        <TextField 
                                            {...field}
                                            autoComplete='off'
                                            variant='filled'
                                            error={!!errors.state}
                                            helperText={errors?.state?.message}
                                            fullWidth 
                                            label='UF' 
                                            required 
                                            disabled 
                                            InputProps={{endAdornment: (isLoadingViaCep ? <CircularProgress size={30} /> : <IconButton disabled><LockIcon /></IconButton>)}}
                                            defaultValue=''
                                        />
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Box display='flex' justifyContent='end' mt={2} height='50px'>
                            <Button type='submit' variant='contained' sx={{fontSize: '1rem'}} disabled={isLoadingViaCep || isLoading}>
                                {btnText}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
}
