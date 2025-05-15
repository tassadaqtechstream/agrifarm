
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Eye, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminOrdersPage = () => {
  // Mock data - would be fetched from API in a real app
  const orders = [
    {
      id: "ORD-1001",
      customer: "Ahmed Al-Farsi",
      date: "2023-09-15",
      total: 458.50,
      payment: "Credit Card",
      status: "Completed"
    },
    {
      id: "ORD-1002",
      customer: "Sarah Mahmoud",
      date: "2023-09-14",
      total: 129.99,
      payment: "PayPal",
      status: "Processing"
    },
    {
      id: "ORD-1003",
      customer: "Mohammed Hassan",
      date: "2023-09-12",
      total: 345.75,
      payment: "Credit Card",
      status: "Shipped"
    },
    {
      id: "ORD-1004",
      customer: "Lisa Chen",
      date: "2023-09-10",
      total: 78.25,
      payment: "Bank Transfer",
      status: "Processing"
    },
    {
      id: "ORD-1005",
      customer: "Khalid Al-Rahman",
      date: "2023-09-08",
      total: 210.99,
      payment: "Credit Card",
      status: "Cancelled"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <AdminLayout pageTitle="Manage Orders">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex flex-wrap gap-4 justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search orders..." 
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="mr-1 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>OMR {order.total.toFixed(2)}</TableCell>
                <TableCell>{order.payment}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
