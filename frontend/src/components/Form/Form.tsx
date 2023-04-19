import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import '../../TraducoesYup'

import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, Link, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Visibility, VisibilityOff, LoginOutlined } from "@mui/icons-material";

import { IUser } from "../../types";
import MaskedInput from "react-text-mask";
import { MaskInputCpf } from "../Cart/Step2/utils";

interface FormProps {
    nameForm: string,
    textButton: string,
    create: boolean,
    onSubmit: (data: IUser) => void,
    schemaCreate: yup.ObjectSchema<Omit<IUser, 'uuid'>, yup.AnyObject, any, "">,
    schemaLogin: yup.ObjectSchema<Pick<IUser, "email" | "password">, yup.AnyObject, any, "">,
    isLoading: boolean,
}

export function Form({ nameForm, textButton, create, onSubmit, schemaCreate, schemaLogin, isLoading }: FormProps) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'))

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset
    } = useForm<IUser>({
        mode: 'onSubmit',
        resolver: yupResolver(create ? schemaCreate : schemaLogin),
    })

    function handleChangePage(){
        clearErrors()
        reset()
        navigate(create ? '/login' : '/login/create')
    }

    useEffect(() => {
        setShowPassword(false)
        setShowConfirmPassword(false)
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: lgDown ? '100%' : '65%',
                height: '80%',
                alignItems: "center",
            }}
        >

            <Typography
                color="primary"
                variant={smDown ? 'h4' : mdDown ? 'h3' : 'h2'}
                noWrap
            >
                {nameForm}
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    marginTop: 5,
                    width: mdDown ? '90%' : '55%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems:'center',
                    gap: 2,
                }}
            >
                {create &&
                <>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => 
                            <TextField
                                {...field}
                                disabled={isLoading}
                                required
                                label="Nome"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                placeholder='Ex: Gabriel Bursi'
                            />
                        }
                    />
                    <Controller
                        name="cpf"
                        control={control}
                        render={({ field }) => 
                            <TextField
                                {...field}
                                disabled={isLoading}
                                required
                                label="CPF"
                                fullWidth
                                error={!!errors.cpf}
                                helperText={errors.cpf?.message}
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
                </>
                }
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => 
                        <TextField
                            {...field}
                            disabled={isLoading}
                            required
                            label="Email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            placeholder='Ex: email@exemplo.com'
                        />
                    }
                />
                {create ?
                    <Grid container spacing={2}>
                        <Grid item xs={mdDown ? 12 : 6}>
                            <Controller
                                name='password'
                                control={control}
                                render={({ field }) => 
                                    <TextField
                                        {...field}
                                        disabled={isLoading}
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        label="Senha"
                                        fullWidth
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword((show) => !show)}
                                                        edge="start"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={mdDown ? 12 : 6}>
                            <Controller
                                name='confirmPassword'
                                control={control}
                                render={({ field }) => 
                                    <TextField
                                        {...field}
                                        disabled={isLoading}
                                        required
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        label="Confirme sua senha"
                                        fullWidth
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowConfirmPassword((show) => !show)}
                                                        edge="start"
                                                    >
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                    :
                    <Controller
                    name='password'
                    control={control}
                    render={({ field }) => 
                        <TextField
                            {...field}
                            disabled={isLoading}
                            required
                            type={showPassword ? 'text' : 'password'}
                            label="Senha"
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((show) => !show)}
                                            edge="start"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    }
                    />
                }
                <Button 
                    disabled={isLoading}
                    variant="contained" 
                    size="large" 
                    fullWidth 
                    startIcon={textButton === 'criar' ? '' :  isLoading ? '' : <LoginOutlined />}
                    onClick={handleSubmit(onSubmit)}
                >
                    {isLoading ? <CircularProgress color="primary" sx={{fontSize: '0.6rem'}} /> : textButton}
                </Button>
                <Box
                    sx={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        width:'100%',
                        gap:1,
                    }}
                >   
                    <Typography color="black" variant={ smDown ? "body2" : "subtitle1"} noWrap>
                        {create ? 'Já possui um cadastro?' : 'Novo por aqui?'}
                    </Typography>
                    <Typography variant={ smDown ? "body2" : "subtitle1"} noWrap>
                        <Link 
                        underline="hover" 
                        fontWeight='bold' 
                        sx={{ cursor: 'pointer' }} 
                        onClick={handleChangePage}>
                            {create ? 'FAZER LOGIN' : 'CRIAR CONTA'}
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}