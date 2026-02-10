import React, { createContext, useContext, useState, useEffect } from 'react';

interface Order {
  id: string;
  status: 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'cancelled';
  restaurantId: string;
  customerId: string;
  items: any[];
  total: number;
  pickupTime: string;
  lastUpdated: Date;
}

interface OrderContextType {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
  subscribeToOrderUpdates: (orderId: string, callback: (order: Order) => void) => () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscribers, setSubscribers] = useState<Map<string, ((order: Order) => void)[]>>(new Map());

  // Initialize with mock orders
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 'ORDER-001',
        status: 'confirmed',
        restaurantId: '1',
        customerId: '1',
        items: [],
        total: 36.97,
        pickupTime: '2:30 PM',
        lastUpdated: new Date()
      }
    ];
    setOrders(mockOrders);
  }, []);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status, lastUpdated: new Date() }
          : order
      );
      
      // Notify subscribers
      const updatedOrder = updatedOrders.find(order => order.id === orderId);
      if (updatedOrder) {
        const orderSubscribers = subscribers.get(orderId) || [];
        orderSubscribers.forEach(callback => callback(updatedOrder));
      }
      
      return updatedOrders;
    });
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const subscribeToOrderUpdates = (orderId: string, callback: (order: Order) => void) => {
    setSubscribers(prev => {
      const orderSubscribers = prev.get(orderId) || [];
      const newSubscribers = new Map(prev);
      newSubscribers.set(orderId, [...orderSubscribers, callback]);
      return newSubscribers;
    });

    // Return unsubscribe function
    return () => {
      setSubscribers(prev => {
        const orderSubscribers = prev.get(orderId) || [];
        const newSubscribers = new Map(prev);
        newSubscribers.set(orderId, orderSubscribers.filter(cb => cb !== callback));
        return newSubscribers;
      });
    };
  };

  return (
    <OrderContext.Provider value={{
      orders,
      updateOrderStatus,
      getOrderById,
      subscribeToOrderUpdates,
    }}>
      {children}
    </OrderContext.Provider>
  );
};