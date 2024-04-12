import { useCallback, useState } from 'react';
import './../styles/form.css';
import Table from './table';
import { useSelector, useDispatch } from 'react-redux';
import { addUserData, setTable, clearUser, deleteTable, updateTable } from '../redux/actions/userAction';
import Notification from './notification';
interface UserData {
	userId: number;
	name: string;
	age: string;
	phone: string;
}

function Form(): JSX.Element {
	const { user, usersTable } = useSelector((state: any) => state);
	const dispatch = useDispatch();
	const [buttonName, setButtonName] = useState('Submit');
	const [notification, setNotification] = useState({ message: '', type: '' });

	const handleSubmit = (): void => {
		if (!user.name || !user.age || !user.phone) {
			setNotification({ message: 'Please enter valid data!', type: 'error' });
			return;
		}

		if (buttonName === 'Submit') {
			const userId = generateId();
			dispatch(setTable({ userId, ...user }));
			setNotification({ message: 'User Created Successfully', type: 'success' });
		} else {
			dispatch(updateTable(user));
			setButtonName('Submit');
			setNotification({ message: 'User Updated Successfully', type: 'success' });
		}
		handleClear();
	};

	const handleChange = (value: string, field: string): void => {
		const newData = {
			[field]: value
		}
		dispatch(addUserData(newData));
	};
	
	const generateId = ():number => Math.floor(Math.random() * 10000);
	

	const handleDelete = useCallback((id: number): void => {
		dispatch(deleteTable(id));
		setNotification({ message: 'User Deleted Successfully', type: 'success' });
	}, []);

	const handleUpdate = useCallback((dataToUpdate: UserData): void => {
		dispatch(addUserData(dataToUpdate));
		setButtonName('Update');
	},[]);


	const handleClear = (): void => {
		dispatch(clearUser());
		setButtonName('Submit');
	};

	return (
		<div className="formParent">
			<h1 style={{color:'grey'}}>User Form</h1>
			<div className="userForm">
				<input className="userField" type="text" placeholder="Enter Name" value={user.name || ''} onChange={(e) => handleChange(e.target.value, 'name')}/>
				<input className="userField" type="text" placeholder="Enter Age" value={user.age || ''} onChange={(e) => handleChange(e.target.value, 'age')}/>
				<input className="userField" type="text" placeholder="Enter Phone" value={user.phone || ''} onChange={(e) => handleChange(e.target.value, 'phone')}/>
				<div>
					<button className="formButton" onClick={handleSubmit}>{buttonName}</button>
					<button className="clearButton" onClick={handleClear}>Clear</button>
				</div>
			</div>
			<Notification notification={notification} setNotification={setNotification} />
			<Table tableData={usersTable} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
		</div>
	);
}

export default Form;