import './../styles/table.css';
import {memo} from 'react';
const deleteIcon = require('./../icons/delete_icon.png');
const editIcon = require('./../icons/edit_icon.png');


interface UserData {
	userId: number;
	name: string;
	age: string;
	phone: string;
}

interface TableProps {
	tableData: UserData[];
	handleDelete: (id: number) => void;
	handleUpdate: (data: UserData) => void;
}

function Table({ tableData, handleDelete, handleUpdate }: TableProps): JSX.Element {
	console.log("In table component...");
	const deleteRow = (e:any) => {
		window.confirm("Are you sure to delete!") && handleDelete(Number(e.target.id));
	};

	const updateRow = (e:any) => {
		const dataToUpdate = tableData.find(ele => ele.userId === Number(e.target.id));
		if (dataToUpdate)
			handleUpdate(dataToUpdate);
	};
	
	return (
		<div className='tableContainer'>
			<table className='table'>
				<thead>
				<tr>
					<th>Sr no.</th>
					<th>Name</th>
					<th>Age</th>
					<th>Phone</th>
					<th>Action</th>
				</tr>
				</thead>
				<tbody>
					{tableData.map((data,i) => 
						<tr key={data.userId} className={ i%2 !== 0 ? 'evenRow': ''}>
							<td className='noColumn'>{i+1}</td>
							<td>{data.name}</td>
							<td>{data.age}</td>
							<td>{data.phone}</td>
							<td>
								<img src={editIcon} id={data.userId.toString()} onClick={(e) => updateRow(e)} alt="edit" width="18" height="18"/>
								<img src={deleteIcon} id={data.userId.toString()} onClick={(e) => deleteRow(e)} alt="delete" width="18" height="18"/>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>	
	);
}

export default memo(Table);