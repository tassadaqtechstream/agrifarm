
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBasket, CircleDollarSign, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  // Mock data - would be fetched from API in a real app
  const stats = [
    {
      title: "Total Users",
      value: "2,453",
      icon: <Users className="h-8 w-8 text-blue-500" />,
      change: "+12.5%"
    },
    {
      title: "Active Listings",
      value: "1,234",
      icon: <ShoppingBasket className="h-8 w-8 text-green-500" />,
      change: "+23.1%"
    },
    {
      title: "Revenue",
      value: "$28,430",
      icon: <CircleDollarSign className="h-8 w-8 text-earth-terracotta" />,
      change: "+8.2%"
    },
    {
      title: "Growth",
      value: "18.2%",
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      change: "+4.3%"
    }
  ];

  return (
    <AdminLayout pageTitle="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className="text-green-500 mr-1">{stat.change}</span>
                <span>from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">User #{i}</p>
                    <p className="text-sm text-muted-foreground">Joined {i} day{i !== 1 ? 's' : ''} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <ShoppingBasket className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">Order #{1000 + i}</p>
                      <p className="text-sm text-muted-foreground">${(Math.random() * 1000).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
