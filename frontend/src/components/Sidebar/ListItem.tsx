import { useContext } from 'react';
import { Badge, BadgeProps, Icon, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { ProductsContext } from '../../contexts';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -1,
        top: 5,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

interface ListItemProps {
    to: string,
    label: string,
    icon: string,
    onClick?: () => void
}

export function ListItem({ icon, label, to, onClick }: ListItemProps) {

    const navigate = useNavigate()
    const resolvedPath = useResolvedPath(to)
    const match = useMatch({ path: resolvedPath.pathname, end: true })

    const { productsLiked, productsInCart } = useContext(ProductsContext)

    function handleClick() {
        navigate(to)
        onClick?.()
    }

    if(icon === 'favorite') 
    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                    <StyledBadge badgeContent={productsLiked.length} color="info">
                        <Icon color='primary'>{icon}</Icon>
                    </StyledBadge>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )

    if (icon === 'shopping_cart')
    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <StyledBadge badgeContent={productsLiked.length} color="info">
                    <Icon color='primary'>{icon}</Icon>
                </StyledBadge>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                { icon === 'favorite' && 
                    <StyledBadge badgeContent={productsLiked.length} color="info">
                        <Icon color='primary'>{icon}</Icon>
                    </StyledBadge>
                } 
                { icon === 'shopping_cart' && 
                    <StyledBadge badgeContent={productsInCart.length} color="info">
                        <Icon color='primary'>{icon}</Icon>
                    </StyledBadge>
                }
                <Icon color='primary'>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>
    );
}