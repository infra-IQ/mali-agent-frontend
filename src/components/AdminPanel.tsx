import React, { useState } from 'react';
import { 
  Bell, 
  User, 
  Package, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  Check,
  X,
  MapPin,
  ShoppingBag,
  Calendar,
  Clock
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Mock data for orders
const initialOrders = [
  { id: 1, customer: 'John Doe', address: '123 Main St, New York', items: 3, total: 45.99, status: 'pending', date: '2025-05-10' },
  { id: 2, customer: 'Jane Smith', address: '456 Oak Ave, Boston', items: 1, total: 18.50, status: 'pending', date: '2025-05-10' },
  { id: 3, customer: 'Robert Johnson', address: '789 Pine Rd, Chicago', items: 5, total: 72.25, status: 'delivered', date: '2025-05-09' },
  { id: 4, customer: 'Sarah Williams', address: '101 Elm Blvd, Miami', items: 2, total: 29.99, status: 'delivered', date: '2025-05-09' },
  { id: 5, customer: 'Michael Brown', address: '202 Cedar Ln, Seattle', items: 4, total: 56.75, status: 'canceled', date: '2025-05-08' },
  { id: 6, customer: 'Emily Davis', address: '303 Birch Dr, Denver', items: 2, total: 32.50, status: 'pending', date: '2025-05-10' },
  { id: 7, customer: 'David Wilson', address: '404 Maple Ave, Austin', items: 3, total: 41.25, status: 'pending', date: '2025-05-11' },
  { id: 8, customer: 'Lisa Martinez', address: '505 Walnut St, San Francisco', items: 1, total: 22.99, status: 'pending', date: '2025-05-11' },
];

function AdminPanel() {
  const [orders, setOrders] = useState(initialOrders);
  const [notifications, setNotifications] = useState(2);

  // Calculate dashboard metrics
  const totalOrders = orders.length;
  const totalDelivered = orders.filter(order => order.status === 'delivered').length;
  const totalCanceled = orders.filter(order => order.status === 'canceled').length;
  const totalRevenue = orders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0)
    .toFixed(2);

  const handleAcceptOrder = (id: number) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'delivered' } : order
    ));
  };

  const handleCancelOrder = (id: number) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'canceled' } : order
    ));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'canceled':
        return 'destructive';
      default:
        return 'warning';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'canceled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Delivery Admin</h1>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-700 font-medium">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Delivered</p>
                <p className="text-2xl font-bold text-gray-800">{totalDelivered}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="rounded-full bg-red-100 p-3 mr-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Canceled</p>
                <p className="text-2xl font-bold text-gray-800">{totalCanceled}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">${totalRevenue}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-2 w-full ${
                  order.status === 'delivered' 
                    ? 'bg-green-500' 
                    : order.status === 'canceled' 
                      ? 'bg-red-500' 
                      : 'bg-yellow-500'
                }`} />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{order.address}</p>
                    </div>
                    <div className="flex items-center">
                      <ShoppingBag className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-600">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                  </div>
                </CardContent>
                
                {order.status === 'pending' && (
                  <CardFooter className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAcceptOrder(order.id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Check className="h-4 w-4 mr-1" /> Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;