import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ShoppingBag, Package, Star, TrendingUp, MoreVertical, CreditCard, Box, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { products } from '@/lib/data';

const recentOrders = [
  { id: 'ORD-7032', customer: 'Sarah Jenkins', products: 'iPhone 15 Pro Max...', total: 1299.00, status: 'Processing', date: 'Sep 09, 2026' },
  { id: 'ORD-7031', customer: 'Michael Chen', products: 'Sony WH-1000XM5...', total: 348.00, status: 'Shipped', date: 'Sep 08, 2026' },
  { id: 'ORD-7030', customer: 'Emma Watson', products: 'Samsung 49" Odyssey...', total: 1199.99, status: 'Delivered', date: 'Sep 07, 2026' },
  { id: 'ORD-7029', customer: 'David Smith', products: 'Logitech MX Master 3S', total: 99.99, status: 'Delivered', date: 'Sep 06, 2026' },
  { id: 'ORD-7028', customer: 'Lisa Wong', products: 'iPad Pro 12.9"', total: 1099.00, status: 'Cancelled', date: 'Sep 05, 2026' },
];

const topProducts = products.filter(p => p.sellerId === 'sel-1').slice(0, 5);

export default function SellerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, TechVault</h1>
          <p className="text-sm text-gray-500 mt-1">Here is what is happening with your store today.</p>
        </div>
        <div className="text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm inline-flex items-center gap-2">
          <Clock className="w-4 h-4" />
          September 2026
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">৳4,52,340</h3>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +12.5%
            </span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">234</h3>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-green-600 font-medium flex items-center">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +8.2%
            </span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Products</p>
              <h3 className="text-2xl font-bold text-gray-900">89</h3>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-600 font-medium flex items-center">
              72 Active
            </span>
            <span className="text-gray-500 ml-2">17 Draft</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Rating</p>
              <h3 className="text-2xl font-bold text-gray-900">4.8<span className="text-lg text-gray-500 font-medium">/5</span></h3>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-600 font-medium">Based on 1,245 reviews</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
            <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary p-2 border">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 pt-6 border-b border-gray-200 pb-2">
            {[
              { day: 'Mon', height: '40%' },
              { day: 'Tue', height: '60%' },
              { day: 'Wed', height: '45%' },
              { day: 'Thu', height: '80%' },
              { day: 'Fri', height: '55%' },
              { day: 'Sat', height: '90%' },
              { day: 'Sun', height: '70%' },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group">
                <div className="w-full max-w-[40px] bg-blue-100 rounded-t-sm relative group-hover:bg-blue-200 transition-colors" style={{ height: '100%' }}>
                  <div className="absolute bottom-0 w-full bg-blue-600 rounded-t-sm transition-all duration-500 group-hover:bg-blue-700" style={{ height: bar.height }}></div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Top Selling Products</h2>
            <Link href="/seller/products" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative shrink-0 border border-gray-200">
                  <Image src={product.images[0]?.url || '/placeholder.png'} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">${product.price.toFixed(2)}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-gray-900">124 sold</div>
                  <div className="text-xs text-green-600 font-medium">↑ 12%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <Link href="/seller/orders" className="text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
            View All Orders
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Products</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">{order.products}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                      order.status === 'Processing' && "bg-amber-100 text-amber-800",
                      order.status === 'Shipped' && "bg-blue-100 text-blue-800",
                      order.status === 'Delivered' && "bg-green-100 text-green-800",
                      order.status === 'Cancelled' && "bg-red-100 text-red-800"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
