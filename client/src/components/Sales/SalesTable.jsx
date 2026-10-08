import { useEffect, useState } from "react"
import RecordRow from "../shared/RecordRow";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const headers = [
    { label: "Customer", key: "customer_id" },
    { label: "Vehicle", key: "vehicle_id" },
    { label: "Date", key: "sale_date" },
    { label: "Price", key: "sale_price" },
]

export default function SalesTable() {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSales = async () => {
            const response = await fetch("http://localhost:3000/api/sales");
            const data = await response.json();
            setSales(data);
        }
        fetchSales();
        console.log(sales);
    }, []);
    return (
        <div>
            <div className="flex mb-4 items-center justify-between p-6 shadow-md border border-gray-200 text-sm">
                {headers.map(header => <span className="text-center w-1/4" key={header.key}>{header.label}</span>)}
            </div>
            {
                sales.map(sale => (
                    <SaleRow key={sale.sale_id} {...sale} />
                ))
            }
        </div>
    )
}

const SaleRow = ({ customer_id, vehicle_id, sale_date, sale_price }) => {
    const date = new Date(sale_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <RecordRow>
            <span className="w-1/4" title={customer_id}>{customer_id}</span>
            <span className="w-1/4" title={vehicle_id}>{vehicle_id}</span>
            <span className="w-1/4" title={date}>{date}</span>
            <span className="w-1/4" title={formatter.format(sale_price)}>{formatter.format(sale_price)}</span>
        </RecordRow>
    )
}