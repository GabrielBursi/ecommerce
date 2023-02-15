import { useContext } from 'react';
import { Box, Divider, Drawer, List, useMediaQuery, useTheme } from '@mui/material';
import { ChildrenProp } from '../../types';
import { DrawerContext } from '../../contexts';
import { ListItem } from './ListItem';


export function SideBar({ children }: ChildrenProp) {

    const { drawerOptions, toggleDrawer, isDrawerOpen } = useContext(DrawerContext)

    const theme = useTheme();
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

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
                                    onClick={lgDown ? toggleDrawer : undefined}
                                />
                            ))}
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
