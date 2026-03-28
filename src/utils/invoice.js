export const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TEENS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

const twoDigitsToWords = (num) => {
  if (num < 10) return ONES[num];
  if (num < 20) return TEENS[num - 10];
  const tensPart = TENS[Math.floor(num / 10)];
  const onesPart = ONES[num % 10];
  return `${tensPart}${onesPart ? ` ${onesPart}` : ''}`.trim();
};

const threeDigitsToWords = (num) => {
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;
  const hundredPart = hundred ? `${ONES[hundred]} hundred` : '';
  const remainderPart = remainder ? twoDigitsToWords(remainder) : '';
  return `${hundredPart}${hundredPart && remainderPart ? ' ' : ''}${remainderPart}`.trim();
};

export const amountToWords = (value) => {
  const amount = Math.floor(Math.max(0, Number(value || 0)));
  if (amount === 0) return 'zero rupees only';

  const crore = Math.floor(amount / 10000000);
  const lakh = Math.floor((amount % 10000000) / 100000);
  const thousand = Math.floor((amount % 100000) / 1000);
  const remainder = amount % 1000;

  const parts = [];
  if (crore) parts.push(`${twoDigitsToWords(crore)} crore`);
  if (lakh) parts.push(`${twoDigitsToWords(lakh)} lakh`);
  if (thousand) parts.push(`${twoDigitsToWords(thousand)} thousand`);
  if (remainder) parts.push(threeDigitsToWords(remainder));

  return `${parts.join(' ').replace(/\s+/g, ' ').trim()} rupees only`;
};

export const generateInvoiceNumber = () => `FS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
