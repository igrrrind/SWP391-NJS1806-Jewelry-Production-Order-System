import { sizeCharts } from "@/config/sizeCharts";

export function getJewelrySizeLabel(jewelryType, size) {
    let sizeLabel = '';
  
    switch (jewelryType?.toLowerCase()) {
      case 'charm':
        sizeLabel = `${size} mm`;
        break;
      case 'ring':
        sizeLabel = `Size ${size}`;
        break;
      case 'earring':
        sizeLabel = `${size} mm diameter`;
        break;
      case 'necklace':
        sizeLabel = `${size} cm length`;
        break;
      case 'bracelet':
        sizeLabel = `${size} cm length`;
        break;
      default:
        sizeLabel = 'Invalid jewelry type';
    }
  
    return sizeLabel;
  }


  export function getJewelrySizeName(jewelryType) {
    let sizeLabel = '';
  
    switch (jewelryType?.toLowerCase()) {
      case 'charm':
        sizeLabel = `Width (mm)`;
        break;
      case 'ring':
        sizeLabel = `Size`;
        break;
      case 'earring':
        sizeLabel = `Diameter (mm)`;
        break;
      case 'necklace':
        sizeLabel = `Length (cm)`;
        break;
      case 'bracelet':
        sizeLabel = `Length (cm)`;
        break;
      default:
        sizeLabel = 'Invalid jewelry type';
    }
  
    return sizeLabel;
  }

export function getSizeChartUrl(type) {
    const chart = sizeCharts.find(chart => chart.type === type.toLowerCase());
    return chart ? chart.url : "#";
}