import { memo, useContext } from 'react';
import { Box, Divider, Drawer, Icon, Link, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChildrenProp } from '../../types';
import { DrawerContext, ThemeContext } from '../../contexts';
import { ListItem } from './ListItem';


function SideBarMemo({ children }: ChildrenProp) {

    const { drawerOptions, toggleDrawer, isDrawerOpen } = useContext(DrawerContext)
    const { themeName, toggleTheme } = useContext(ThemeContext)

    const theme = useTheme();

    const navigate = useNavigate()

    return (
        <>
            <Drawer open={isDrawerOpen} variant='temporary' onClose={toggleDrawer} anchor="right">
                <Box height='100vh' width={theme.spacing(28)} display='flex' flexDirection='column'>

                    <Divider />

                    <Box flex={1}>
                        <List component='nav'>  
                            {drawerOptions.map(option => (
                                <ListItem
                                    key={option.path}
                                    icon={option.icon}
                                    label={option.label}
                                    to={option.path}
                                    onClick={toggleDrawer}
                                />
                            ))}
                        </List>
                    </Box>

                    <Divider />

                    <Box>
                        <List component='nav'>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon color='primary'>open_in_new</Icon>
                                </ListItemIcon>
                                <Link
                                    href='https://github.com/GabrielBursi/ecommerce'
                                    underline='none'
                                    rel="noreferrer"
                                    target='_blank'
                                >
                                    <ListItemText primary='GitHub' />
                                </Link>
                            </ListItemButton>
                            <ListItemButton onClick={() => { navigate('/sobre'); toggleDrawer()  }}>
                                <ListItemIcon>
                                    <Icon color='primary'>help</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Sobre o projeto' />
                            </ListItemButton>
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon color='primary'>{themeName === 'light' ? 'dark' : 'light'}_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Mudar tema' />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height='100vh'>
                {children}
            </Box>
        </>
    );
}

export const SideBar = memo(SideBarMemo)