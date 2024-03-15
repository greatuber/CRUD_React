import { useCallback, useState } from 'react';
import './../styles/form.css';
import Table from './table';

interface UserData {
	userId: number;
	name: string;
	age: string;
	phone: string;
}

function Form(): JSX.Element {
	const generateId = ():number => Math.floor(Math.random() * 10000);

	const handleSubmit = (): void => {
		if (!userData.name || !userData.age || !userData.phone) {
			alert("Please enter valid data!");
			return;
		}

		if (buttonName === 'Submit') {
			setTableData([...tableData, userData]);
		} else {
			const updatedTableData = tableData.map(ele => ele.userId === userData.userId ? userData : ele);
			setTableData(updatedTableData);
			setButtonName('Submit');
		}
		handleClear();
	};

	const handleChange = (value: string, field: string): void => {
		const newData = {
			...userData,
			[field]: value
		}
		setUserData(newData);
	};
	
	const defaultUserData = {userId: generateId(), name:'', age:'', phone:''};
	const [userData, setUserData] = useState<UserData>(defaultUserData);
	const [tableData, setTableData] = useState<UserData[]>([]);
	const [buttonName, setButtonName] = useState('Submit');

	const handleDelete = useCallback((id: number): void => {
		const filteredTableData = tableData.filter(data => data.userId !== id);
		setTableData(filteredTableData);
	}, [tableData, setTableData]);

	const handleUpdate = useCallback((dataToUpdate: UserData): void => {
		setUserData(dataToUpdate);
		setButtonName('Update');
	},[]);

	const handleClear = (): void => {
		setUserData(defaultUserData);
	};

	return (
		<div className="formParent">
			<h1 style={{color:'grey'}}>User Form</h1>
			<div className="userForm">
				<input className="userField" type="text" placeholder="Enter Name" value={userData.name} onChange={(e) => handleChange(e.target.value, 'name')}/>
				<input className="userField" type="text" placeholder="Enter Age" value={userData.age} onChange={(e) => handleChange(e.target.value, 'age')}/>
				<input className="userField" type="text" placeholder="Enter Phone" value={userData.phone} onChange={(e) => handleChange(e.target.value, 'phone')}/>
				<div>
					<button className="formButton" onClick={handleSubmit}>{buttonName}</button>
					<button className="clearButton" onClick={handleClear}>Clear</button>
				</div>
			</div>
			<Table tableData={tableData} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
		</div>
	);
}

export default Form;