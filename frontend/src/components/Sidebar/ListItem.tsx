import { Icon, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

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

    function handleClick() {
        navigate(to)
        onClick?.()
    }

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon color='primary'>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} sx={{ color: '#1976d2' }} />
        </ListItemButton>
    );
}