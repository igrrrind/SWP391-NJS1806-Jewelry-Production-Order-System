export function formatName(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
}

export function formatLink(productId, formattedName) {
    return  `/products/${productId}/${formattedName}`
}

