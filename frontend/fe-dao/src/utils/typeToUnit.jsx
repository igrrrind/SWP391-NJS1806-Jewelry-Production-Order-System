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