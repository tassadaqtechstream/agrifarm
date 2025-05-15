
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Eye, Plus, Search, CheckCircle, XCircle } from "lucide-react";

const AdminUsersPage = () => {
  // Mock data - would be fetched from API in a real app
  const users = [
    {
      id: 1,
      name: "Mohammed Al-Farsi",
      email: "mohammed@example.com",
      role: "Buyer",
      joinDate: "2023-05-12",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Seller",
      joinDate: "2023-04-22",
      verified: true
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      email: "ahmed@example.com",
      role: "Seller",
      joinDate: "2023-06-15",
      verified: false
    },
    {
      id: 4,
      name: "Lisa Wong",
      email: "lisa@example.com",
      role: "Buyer",
      joinDate: "2023-07-05",
      verified: true
    },
    {
      id: 5,
      name: "Khalid Al-Mahmood",
      email: "khalid@example.com",
      role: "Buyer",
      joinDate: "2023-08-11",
      verified: false
    }
  ];

  return (
    <AdminLayout pageTitle="Manage Users">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-8"
            />
          </div>
          <Button className="bg-earth-terracotta hover:bg-earth-terracotta-dark">
            <Plus className="mr-1 h-4 w-4" /> Add User
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'Seller'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  {user.verified ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
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

export default AdminUsersPage;
