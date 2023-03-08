import { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Visibility, VisibilityOff, LoginOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts";

interface LoginPageProps {
    nameForm: string,
    textButton: string,
    create: boolean,
    handleSubmit: () => void,
}

export function Form({ nameForm, textButton, create, handleSubmit }: LoginPageProps) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'))

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { 
            setName, 
            setConfirmPassword, 
            setEmail, 
            setPassword, 
            name, 
            email, 
            password, 
            confirmPassword, 
            setErrorName,
            setErrorEmail,
            setErrorPassword,
            setErrorConfirmPassword,
            errorName, 
            errorEmail, 
            errorPassword, 
            errorConfirmPassword
        } = useContext(LoginContext)

    function handleChangePage(){
        setErrorName('')
        setErrorEmail('')
        setErrorPassword('')
        setErrorConfirmPassword('')
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
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
                {name}
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
                    <TextField
                        required
                        id="name"
                        label="Nome"
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={() => setErrorName('')}
                        value={name}
                        error={!!errorName}
                        helperText={errorName}
                        placeholder='Ex: Gabriel Bursi'
                    />
                }
                <TextField
                    required
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={() => setErrorEmail('')}
                    value={email}
                    error={!!errorEmail}
                    helperText={errorEmail}
                    placeholder='Ex: email@exemplo.com'
                />
                {create ?
                    <Grid container spacing={2}>
                        <Grid item xs={mdDown ? 12 : 6}>
                            <TextField
                                required
                                id="password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                label="Senha"
                                fullWidth
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={() => setErrorPassword('')}
                                value={password}
                                error={!!errorPassword}
                                helperText={errorPassword}
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
                        </Grid>
                        <Grid item xs={mdDown ? 12 : 6}>
                            <TextField
                                required
                                id="repeat-password"
                                type={showPassword ? 'text' : 'password'}
                                label="Confirme sua senha"
                                fullWidth
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onKeyDown={() => setErrorConfirmPassword('')}
                                value={confirmPassword}
                                error={!!errorConfirmPassword}
                                helperText={errorConfirmPassword}
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
                        </Grid>
                    </Grid>
                    :
                    <TextField
                        required
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Senha"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={() => setErrorPassword('')}
                        value={password}
                        error={!!errorPassword}
                        helperText={errorPassword}
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
                <Button 
                    variant="contained" 
                    size="large" 
                    fullWidth 
                    startIcon={textButton === 'criar' ? '' : <LoginOutlined />}
                    onClick={handleSubmit}
                >
                    {textButton}
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