const DashboardIcon = ({ color }) => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.1 14.075H5.6V7.2H4.1V14.075ZM8.25 14.075H9.75V3.925H8.25V14.075ZM12.4 14.075H13.9V10.375H12.4V14.075ZM1.5 18C1.1 18 0.75 17.85 0.45 17.55C0.15 17.25 0 16.9 0 16.5V1.5C0 1.1 0.15 0.75 0.45 0.45C0.75 0.15 1.1 0 1.5 0H16.5C16.9 0 17.25 0.15 17.55 0.45C17.85 0.75 18 1.1 18 1.5V16.5C18 16.9 17.85 17.25 17.55 17.55C17.25 17.85 16.9 18 16.5 18H1.5ZM1.5 16.5H16.5V1.5H1.5V16.5ZM1.5 1.5V16.5V1.5Z" fill={color || "#726E6C"} />
        </svg>
    )
}

export default DashboardIcon;