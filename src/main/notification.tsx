import { useEffect, useState } from "react";
import './../styles/notification.css';
interface NotificationProps {
	message: string;
	type: string;
}

interface ComponentProps {
	notification: NotificationProps;
	setNotification: React.Dispatch<React.SetStateAction<NotificationProps>>;
}


function Notification({ notification, setNotification }: ComponentProps): JSX.Element {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);
		const timer = setTimeout(() => {
			setShow(false);
		}, 2000);
	
		// Cleanup function to clear the timer when the component unmounts or notification changes
		return () => {
		  clearTimeout(timer);
		};
	  }, [notification, setNotification]);

	return (
		<>
			<div className={`notification ${notification.type} ${show ? '' : 'hidden'}`}>
				<h2>{notification.message}</h2>
			</div>
		</>
	)
}

export default Notification;