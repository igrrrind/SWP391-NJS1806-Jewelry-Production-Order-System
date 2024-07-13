import  { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card' ;
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { formatPrice } from '@/utils/formatPrice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const metalOptions = [
    { value: 'gold', label: 'Gold' },
    { value: 'silver', label: 'Silver' },
    { value: 'copper', label: 'Copper' },
    { value: 'platinum', label: 'Platinum' },
    { value: 'palladium', label: 'Palladium' },
  ];
  
  const karatOptions = {
    gold: [
      { value: 24, label: '24K' },
      { value: 22, label: '22K' },
      { value: 18, label: '18K' },
      { value: 14, label: '14K' },
    ],
    silver: [{ value: 100, label: 'Pure Silver' }],
    copper: [{ value: 100, label: 'Pure Copper' }],
    platinum: [
        { value: 24, label: '24K' },
        { value: 22, label: '22K' },
        { value: 18, label: '18K' },
        { value: 14, label: '14K' },
      ],
    palladium: [
        { value: 24, label: '24K' },
        { value: 22, label: '22K' },
        { value: 18, label: '18K' },
        { value: 14, label: '14K' },
      ],
  };
  
  async function fetchMetalRates(metal, currency = 'VND') {
    const url = `https://api.metals.dev/v1/metal/spot?api_key=MMQUYJA6HWHUKAHUQGMC956HUQGMC&metal=${metal}&currency=${currency}`;
  
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });
  
    const result = await response.json();
    return result;
  }
  
  const MetalRateCalculator = () => {
    const [rates, setRates] = useState(null);
    const [weight, setWeight] = useState('');
    const [totalPrice, setTotalPrice] = useState(null);
    const [selectedMetal, setSelectedMetal] = useState('gold');
    const [selectedKarat, setSelectedKarat] = useState(24);
  
    useEffect(() => {
      const getRates = async () => {
        const data = await fetchMetalRates(selectedMetal);
        setRates(data.rate);
      };
  
      getRates();
    }, [selectedMetal]);
  
    const handleCalculate = () => {
        if (rates && weight) {
          let pricePerUnit;
          if (selectedMetal === 'copper') {
            // Copper is measured in metric tonnes
            pricePerUnit = rates.price / 1e6; // 1 metric tonne = 1,000,000 grams
          } else {
            // Other metals are measured in troy ounces
            const karatMultiplier = selectedKarat / 24;
            pricePerUnit = (rates.price / 31.1035) * karatMultiplier; // 1 troy ounce = 31.1035 grams
          }
          const calculatedPrice = pricePerUnit * parseFloat(weight);
          setTotalPrice(calculatedPrice.toFixed(2));
        }
      };
  
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Metal Rate Calculator</CardTitle>
            <CardDescription className="text-sm">Current metal rate per troy ounce in VND</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select onValueChange={(value) => setSelectedMetal(value)} defaultValue="gold">
                <SelectTrigger>
                  <SelectValue placeholder="Select Metal" />
                </SelectTrigger>
                <SelectContent>
                  {metalOptions.map((metal) => (
                    <SelectItem key={metal.value} value={metal.value}>
                      {metal.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Select onValueChange={(value) => setSelectedKarat(parseInt(value))} defaultValue="24">
                <SelectTrigger>
                  <SelectValue placeholder="Select Karat" />
                </SelectTrigger>
                <SelectContent>
                  {karatOptions[selectedMetal].map((karat) => (
                    <SelectItem key={karat.value.toString()} value={karat.value.toString()}>
                      {karat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {rates ? (
              <>
                <div className="mb-4 text-sm">
                  <p>Price: {rates.price.toLocaleString()} VND</p>
                  <p>Ask: {rates.ask.toLocaleString()} VND</p>
                  <p>Bid: {rates.bid.toLocaleString()} VND</p>
                  <p>High: {rates.high.toLocaleString()} VND</p>
                  <p>Low: {rates.low.toLocaleString()} VND</p>
                </div>
                <div className="mb-4">
                  <Input
                    type="number"
                    placeholder="Enter weight in grams"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="text-sm"
                  />
                </div>
                <Button onClick={handleCalculate}>Calculate</Button>
                {totalPrice && (
                  <div className="mt-4 text-sm">
                    <p>Total Price: {formatPrice(totalPrice)} VND</p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm">Loading rates...</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default MetalRateCalculator;