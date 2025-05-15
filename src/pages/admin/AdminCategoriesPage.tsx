
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Plus } from "lucide-react";

const AdminCategoriesPage = () => {
  // Mock data - would be fetched from API in a real app
  const categories = [
    {
      id: 1,
      name: "Fruits",
      products: 24,
      description: "Fresh seasonal fruits from local farmers"
    },
    {
      id: 2,
      name: "Vegetables",
      products: 32,
      description: "Fresh and organic vegetables"
    },
    {
      id: 3,
      name: "Grains",
      products: 18,
      description: "Wholesome grains and cereals"
    },
    {
      id: 4,
      name: "Dates",
      products: 12,
      description: "Premium quality dates from the region"
    },
    {
      id: 5,
      name: "Nuts & Seeds",
      products: 15,
      description: "Healthy nuts and seeds"
    }
  ];

  return (
    <AdminLayout pageTitle="Manage Categories">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">All Categories</h3>
              <Button className="bg-earth-terracotta hover:bg-earth-terracotta-dark">
                <Plus className="mr-1 h-4 w-4" /> Add Category
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.products}</TableCell>
                    <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                    <TableCell className="text-right space-x-1">
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
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input id="name" placeholder="Enter category name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Enter description" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Category Image</Label>
                  <Input id="image" type="file" />
                </div>
                
                <Button className="w-full bg-earth-terracotta hover:bg-earth-terracotta-dark">
                  Save Category
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;
