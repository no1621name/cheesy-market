export default (imgName: string, metaUrl: string) => {
  // so sorry about it :)

  return new URL(`../../assets/images/products/${imgName || 'placeholder'}.png`, metaUrl).href;
};
