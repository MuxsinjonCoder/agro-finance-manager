import { Scrollbar as CustomScrollbar } from 'react-scrollbars-custom';

export default function Scrollbar() {
    return (
        <CustomScrollbar style={{ width: 250, height: 250 }}>
            <p>Hello world!</p>
        </CustomScrollbar>
    );
}
