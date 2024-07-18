import React, { SVGProps } from 'react'

const CalPointIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 16 16" {...props}>
        <path d="M8 1a5 5 0 1 1 0 10A5 5 0 0 1 8 1zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" fill="#67B3FF" />
        <path d="M8 3.25a.75.75 0 0 1 .75.75v1.25h.75a.75.75 0 0 1 .743.648L10.25 6a.75.75 0 0 1-.75.75H8A.75.75 0 0 1 7.25 6V4A.75.75 0 0 1 8 3.25z" fill="#B8CADB" />
        <path d="M8 16c1.185-.889 1.778-1.63 1.778-2.222C9.778 12.888 8.982 12 8 12s-1.778.796-1.778 1.778c0 .654.593 1.395 1.778 2.222z" fill="#0073E6" />
    </svg>

)

export default CalPointIcon
