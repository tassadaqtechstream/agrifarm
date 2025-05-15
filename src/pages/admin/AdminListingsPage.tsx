import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Eye, Plus, Search, Building2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const AdminListingsPage = () => {
  // Mock data - would be fetched from API in a real app
  const listings = [
    {
      id: 1,
      productName: "Organic Dates",
      category: "Dates",
      seller: "Farm Fresh Co.",
      price: 12.99,
      stock: 500,
      status: "Active",
      isCompanyMaintained: true,
      isAuthenticated: true
    },
    {
      id: 2,
      productName: "Fresh Tomatoes",
      category: "Vegetables",
      seller: "Green Fields",
      price: 3.99,
      stock: 1000,
      status: "Active"
    },
    {
      id: 3,
      productName: "Premium Wheat",
      category: "Grains",
      seller: "Harvest Gold",
      price: 8.50,
      stock: 2500,
      status: "Active"
    },
    {
      id: 4,
      productName: "Organic Apples",
      category: "Fruits",
      seller: "Orchard Valley",
      price: 5.99,
      stock: 750,
      status: "Inactive"
    },
    {
      id: 5,
      productName: "Fresh Carrots",
      category: "Vegetables",
      seller: "Green Fields",
      price: 2.49,
      stock: 1200,
      status: "Active"
    }
  ];

  return (
    <AdminLayout pageTitle="Manage Products">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-8"
            />
          </div>
          <Button className="bg-earth-terracotta hover:bg-earth-terracotta-dark">
            <Plus className="mr-1 h-4 w-4" /> Add Product
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Harv3st Maintained</TableHead>
              <TableHead>Authenticated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">{listing.productName}</TableCell>
                <TableCell>{listing.category}</TableCell>
                <TableCell>{listing.seller}</TableCell>
                <TableCell>${listing.price}</TableCell>
                <TableCell>{listing.stock}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    listing.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {listing.status}
                  </span>
                </TableCell>
                <TableCell>
                  {listing.isCompanyMaintained ? (
                    <Building2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {listing.isAuthenticated ? (
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
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

export default AdminListingsPage;
