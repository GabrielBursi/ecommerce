import { Box, Grid, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import '../../../TraducoesYup'

import MaskedInput from "react-text-mask";
import { MaskInputCardNumber, MaskInputCpf, MaskInputCvv, MaskInputDate, MaskInputValidate } from "./utils";

interface FormCardData {
    name: string;
    number: string;
    validate: string;
    cvv: string;
    date: string;
    cpf: string;
}

const cardSchema: yup.ObjectSchema<FormCardData> = yup.object({
    name: yup.string().required(),
    number: yup.string().required().matches(/^\d{4} \d{4} \d{4} \d{4}$/),
    validate: yup.string().required().matches(/^\d{2}\/\d{2}$/),
    cvv: yup.string().required().matches(/^\d{3}$/),
    date: yup.string().required().matches(/^\d{2}\/\d{2}\/\d{4}$/),
    cpf: yup.string().required().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
}) 

interface FormCardProps {
    formRef: React.LegacyRef<HTMLFormElement> | undefined
}

export function FormCard({ formRef }: FormCardProps) {

    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormCardData>({
        mode: 'onSubmit',
        resolver: yupResolver(cardSchema)
    })

    function onSubmit(data: FormCardData){
        cardSchema.validate(data, { abortEarly: false })
        .then(validData => {
                console.log('valid', validData)
                navigate('/cart/identification/payment/confirm')
            })
    }

    return (
        <Box flex={1} display='flex' flexDirection='column' gap={2}>
            <Box display='flex' alignItems='center' gap={1}>
                <Typography variant="h6" fontWeight='bold'>
                    Cartão de crédito
                </Typography>
                <Typography variant="body2" fontWeight='light'>
                    (esse site é somente um projeto pessoal, não coloque dados reais)
                </Typography>
            </Box>
            <Box width='100%' height='80%'>
                <form onSubmit={handleSubmit(onSubmit)} ref={formRef}> 
                    <Grid container spacing={2} height='100%'>
                        <Grid item xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={!!errors.name}
                                        helperText={errors?.name?.message}
                                        fullWidth
                                        label='Nome impresso no cartão'
                                        autoComplete="off"
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="number"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={!!errors.number}
                                        helperText={errors?.number?.message}
                                        fullWidth
                                        label='Número do cartão'
                                        autoComplete='off'
                                        InputProps={{
                                            inputComponent: MaskedInput as any,
                                            inputProps: {
                                                mask: MaskInputCardNumber,
                                                type: 'text',
                                            },
                                        }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="validate"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={!!errors.validate}
                                        helperText={errors?.validate?.message}
                                        fullWidth
                                        label='Validade'
                                        autoComplete='off'
                                        placeholder="--/--"
                                        InputProps={{
                                            inputComponent: MaskedInput as any,
                                            inputProps: {
                                                mask: MaskInputValidate,
                                                type: 'text',
                                            },
                                        }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="cvv"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={!!errors.cvv}
                                        helperText={errors?.cvv?.message}
                                        fullWidth
                                        label='CVV'
                                        autoComplete='off'
                                        placeholder="---"
                                        InputProps={{
                                            inputComponent: MaskedInput as any,
                                            inputProps: {
                                                mask: MaskInputCvv,
                                                type: 'text',
                                            },
                                        }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={!!errors.date}
                                        helperText={errors?.date?.message}
                                        fullWidth
                                        label='Data de nascimento'
                                        autoComplete='off'
                                        placeholder="--/--/----"
                                        InputProps={{
                                            inputComponent: MaskedInput as any,
                                            inputProps: {
                                                mask: MaskInputDate,
                                                type: 'text',
                                            },
                                        }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="cpf"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={!!errors.cpf}
                                        helperText={errors?.cpf?.message}
                                        fullWidth
                                        label='CPF'
                                        autoComplete='off'
                                        InputProps={{
                                            inputComponent: MaskedInput as any,
                                            inputProps: {
                                                mask: MaskInputCpf,
                                                type: 'text',
                                            },
                                        }}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
}