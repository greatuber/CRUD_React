import { useCallback, useEffect, useState } from 'react';
import './../styles/form.css';
import Table from './table';
import { useSelector, useDispatch } from 'react-redux';
import { addUserData, setTable, clearUser, deleteTable, updateTable } from '../redux/actions/userAction';
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
	console.log("In form component....");
	const handleSubmit = (): void => {
		if (!user.name || !user.age || !user.phone) {
			alert("Please enter valid data!");
			return;
		}

		if (buttonName === 'Submit') {
			const userId = generateId();
			dispatch(setTable({ userId, ...user }));
		} else {
			dispatch(updateTable(user));
			setButtonName('Submit');
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
	}, []);

	const handleUpdate = useCallback((dataToUpdate: UserData): void => {
		dispatch(addUserData(dataToUpdate));
		setButtonName('Update');
	},[]);


	const handleClear = (): void => {
		dispatch(clearUser());
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
			<Table tableData={usersTable} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
		</div>
	);
}

export default Form;