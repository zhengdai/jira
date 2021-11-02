import {Rate} from "antd";

interface PipProps extends React.ComponentProps<typeof Rate> {
    checked: boolean;
    onCheckedChange?: (checked: boolean) => void
}

export const Pin = ({checked, onCheckedChange, ...restProps}: PipProps) => {
    return <Rate
        count={1}
        value={checked? 1: 0}
        onChange={num => onCheckedChange?.(!!num)}
        {...restProps}
    />
}
