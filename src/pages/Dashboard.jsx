import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Badge } from "@/components/ui/badge"

const calculateDaysUntilDepletion = (quantity, dailyDemand) => {
  if (dailyDemand === 0) return Infinity;
  return Math.floor(quantity / dailyDemand);
}

const data = [
  { name: 'Mon', sales: 4000, stock: 24, dailyDemand: 3 },
  { name: 'Tue', sales: 3000, stock: 13, dailyDemand: 2 },
  { name: 'Wed', sales: 2000, stock: 98, dailyDemand: 5 },
  { name: 'Thu', sales: 2780, stock: 39, dailyDemand: 4 },
  { name: 'Fri', sales: 1890, stock: 8, dailyDemand: 2 },
  { name: 'Sat', sales: 2390, stock: 38, dailyDemand: 3 },
  { name: 'Sun', sales: 3490, stock: 43, dailyDemand: 4 },
]

export default function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Stock Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,345</div>
          <p className="text-xs text-muted-foreground">+180 new items this week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">Requires immediate attention</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">2 new this month</p>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="stock" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Low Stock Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.filter(item => item.stock <= 10).map(item => (
              <Badge key={item.name} variant="destructive">
                {item.name}: {item.stock} ({calculateDaysUntilDepletion(item.stock, item.dailyDemand)} days left)
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

