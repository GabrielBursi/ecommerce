import { useContext, useMemo } from 'react';
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

    const { productsFavorited, productsInCart } = useContext(ProductsContext)

    function handleClick() {
        navigate(to)
        onClick?.()
    }

    const badge = useMemo(() => {
        if (icon === 'favorite') {
            return (
                <StyledBadge badgeContent={productsFavorited.length} color="info">
                    <Icon color='primary'>{icon}</Icon>
                </StyledBadge>
            );
        } else if (icon === 'shopping_cart') {
            return (
                <StyledBadge badgeContent={productsInCart.length} color="info">
                    <Icon color='primary'>{icon}</Icon>
                </StyledBadge>
            );
        } else {
            return <Icon color='primary'>{icon}</Icon>;
        }
    }, [icon, productsFavorited.length, productsInCart.length]);

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                {badge}
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
}