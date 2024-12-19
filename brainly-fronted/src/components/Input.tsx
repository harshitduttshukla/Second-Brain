import { FC } from 'react'

interface clProps {
    placeholder : string;
    ref1 : any
}

const Input: FC<clProps> = ({ref1, placeholder}) => {
    return <>
    <input ref={ref1} placeholder={placeholder} type="text" className='px-4 py-2 border rounded-md m-2'/>
</>
}

export default Input