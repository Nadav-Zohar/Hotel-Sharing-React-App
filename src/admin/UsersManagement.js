import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import './UsersManagement.css';


function RowActions({ clientId, isBusinessIconClicked, handleDeleteClient, handleUpdateClient }) {
    return (
        <>
            <DeleteIcon
                className="icon-button"
                onClick={() => handleDeleteClient(clientId)}
            />
            <BusinessCenterIcon
                className={`icon-button ${isBusinessIconClicked ? 'glow' : ''}`}
                onClick={() => handleUpdateClient(clientId)}
            />
        </>
    );
}

export default function UsersMenagement() {
    const [allClient, setAllClient]= useState([]);
    const [isBusinessIconClicked, setIsBusinessIconClicked] = useState({});
    const handleDeleteClient = (clientId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this client?');
        if(isConfirmed){
            fetch(`https://api.shipap.co.il/admin/clients/${clientId}?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
                credentials: 'include',
                method: 'DELETE',
            })
            .then(() => {
                const updatedClients = allClient.filter(client => client.id !== clientId);
                setAllClient(updatedClients);
            });
        }
    };
    
    const handleUpdateClient = (clientId, index) => {
        const clickedClient = allClient.find(client => client.id === clientId);
        clickedClient.business= !clickedClient.business;
        fetch(`https://api.shipap.co.il/admin/clients/${clientId}?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(clickedClient),
        })
        .then(() => {
            setAllClient([...allClient]);
        });


        setIsBusinessIconClicked(prevState => ({
            ...prevState,
            [clientId]: !prevState[clientId],
        }));
    };
    useEffect(() => {
        fetch(`https://api.shipap.co.il/admin/clients?token=717fd20e-6283-11ee-aae9-14dda9d4a5f0`, {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            setAllClient(data);
            setIsBusinessIconClicked(Array(data.length).fill(false));
            console.log(data);
        });
    }, [])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 100 },
        { field: 'lastName', headerName: 'Last name', width: 100 },
        {
            field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false, width: 140, valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        { field: 'phone', headerName: 'Phone', width: 140,},
        { field: 'email', headerName: 'Email', width: 280 },
        { field: 'business', headerName: 'Business', width: 100 },
        { field: 'actions', headerName: 'Actions', width: 200,
            renderCell: (params) => (
                <RowActions
                    clientId={params.row.id}
                    isBusinessIconClicked={isBusinessIconClicked[params.row.id] || false}
                    handleDeleteClient={handleDeleteClient}
                    handleUpdateClient={handleUpdateClient}
                />
            ),
        },
    ];
    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={allClient}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    )
}