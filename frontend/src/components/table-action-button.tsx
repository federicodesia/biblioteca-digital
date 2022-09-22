import { IconButton, Tooltip } from "@chakra-ui/react"
import { ReactElement } from "react"

interface TableActionButtonProps {
    icon: ReactElement
    tooltip: string
    onClick?: () => void
}

const TableActionButton = ({ icon, tooltip, onClick }: TableActionButtonProps) => {
    return <Tooltip
        openDelay={400}
        bg='white'
        p='4'
        rounded='lg'
        shadow='lg'
        label={tooltip} >

        <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label={tooltip}
            icon={icon}
            onClick={onClick} />
    </Tooltip>
}

export default TableActionButton