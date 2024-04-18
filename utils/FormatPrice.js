

const FormatPrice = (price) => {
    let rubles = Math.floor(price);
    let kopecks = Math.round((price - rubles) * 100);
    let formattedPrice = rubles.toLocaleString().replace(',', ' ');

    if (kopecks != 0) {
        return `${formattedPrice},${kopecks.toLocaleString().padStart(2, '0')}`
    }
    return formattedPrice;
}

export default FormatPrice;

