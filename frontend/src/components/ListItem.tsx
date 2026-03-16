interface ListItemProps {
    isActive?: boolean,
    className?: string,
    item: {
        to: string,
        label: string,
        image_url: string,
        image_active: string
    }
}
export const ListItem = ({ isActive, className, item }: ListItemProps) => {
    return (
        <li className={`${className} flex flex-row  items-center gap-3 w-full `}>
            <img src={isActive ? item.image_active : item.image_url} alt="" className='w-8 aspect-square' />
            <span className='font-medium'>{item.label}</span>
        </li>
    )
}
