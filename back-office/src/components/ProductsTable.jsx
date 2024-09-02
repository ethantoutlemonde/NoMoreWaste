import { DataGrid } from "@mui/x-data-grid";

export default function ProductsTable({ products, fetchData, setSelectedProduct }) {
    const transformedProducts = products.map(product => ({
        ...product,
        category: product.product_type ? product.product_type.product_type : 'N/A',
    }));
    return (
        <>
        <h2 className="text-xl font-medium mb-2">Products Table</h2>
        <DataGrid 
            columns={[
                { field: 'id', headerName: 'ID', width: 90 },
                { field: 'product_name', headerName: 'Name', width: 150 },
                { field: 'description', headerName: 'Description', width: 150 },
                { field: 'quantity', headerName: 'Quantity', width: 150 },
                { field: 'category',headerName: 'Category',width: 150},
            ]}
            rows={transformedProducts}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            onRowClick={row => {
                console.log(row.row);
                setSelectedProduct(row.row);
            }}
        />
        </>
    )
}