import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChartComponent } from './AreaChartComponent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const StatCard = ({ title, value, selectionOptions, setOrderBySelection, orderBySelection, component: Component}) => (
    <Card className="h-full hover:border-green-900 transition duration-500 hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
        <CardTitle>{title}</CardTitle>
  
        {selectionOptions &&
        <Select onValueChange={value => setOrderBySelection(value)} value={orderBySelection}>
            <SelectTrigger className="border w-30 border-stone-800" id="gemstone" aria-label="Select gemstone">
                <SelectValue placeholder="Most relevant" />
            </SelectTrigger>
            <SelectContent>
                {selectionOptions.map((option) => (
                    <SelectItem value={option} key={option}>
                        <p className="text-md">{option}</p>
                    </SelectItem>
                ))}
            </SelectContent>
         </Select>
        }

        {Component && <Component/>}
      
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
);