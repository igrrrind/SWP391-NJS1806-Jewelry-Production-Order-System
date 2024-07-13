import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { formatPrice } from '@/utils/formatPrice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useGetAllGemstones } from '@/hooks/gemstoneHooks';

export const GemstoneRate = () => {
  const { gemstones } = useGetAllGemstones();
  const [selectedGemstone, setSelectedGemstone] = useState(null);
  const [caratWeight, setCaratWeight] = useState('');
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    if (selectedGemstone && caratWeight) {
      const gemstone = gemstones.find(g => g.gemstoneId.toString() === selectedGemstone);
      if (gemstone) {
        const calculatedPrice = gemstone.gemstoneCarat * parseFloat(caratWeight);
        setTotalPrice(calculatedPrice);
      }
    }
  }, [selectedGemstone, caratWeight, gemstones]);

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Gemstone Price Reference</CardTitle>
          <CardDescription>Prices are by carat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={(value) => setSelectedGemstone(value)} defaultValue="">
              <SelectTrigger>
                <SelectValue placeholder="Select Gemstone" />
              </SelectTrigger>
              <SelectContent>
                {gemstones.map((gemstone) => (
                  <SelectItem key={gemstone.gemstoneId.toString()} value={gemstone.gemstoneId.toString()}>
                    {gemstone.gemstoneType} ({gemstone.color}) - {formatPrice(gemstone.gemstoneCarat)} VND/carat
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedGemstone && (
            <>
              <div className="mb-4">
                <Input
                  type="number"
                  placeholder="Enter weight in carats"
                  value={caratWeight}
                  onChange={(e) => setCaratWeight(e.target.value)}
                  className="text-sm"
                />
              </div>
              {totalPrice !== null && (
                <div className="mt-4 text-sm">
                  <p>Total Price: {formatPrice(totalPrice)} VND</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
