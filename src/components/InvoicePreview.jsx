import { amountToWords, formatDate } from '../utils/invoice';

export default function InvoicePreview({ data, invoiceRef }) {
  return (
    <div className="glass-card overflow-hidden p-3">
      <div ref={invoiceRef} className="mx-auto w-full max-w-[840px] rounded-[28px] border-2 border-zinc-800 bg-[#f4f4f5] p-5 text-zinc-900 sm:p-7">
        <div className="relative min-h-[560px] rounded-[26px] border-2 border-zinc-900/90 p-4 sm:p-7">
          <img src="/logo.svg" alt="FitShapers logo" className="pointer-events-none absolute left-1/2 top-1/2 w-[52%] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-5">
            <div>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src="/logo.svg" alt="logo" className="h-14 w-14 rounded-full border border-zinc-300" />
                  <div>
                    <h1 className="font-pop text-3xl font-extrabold tracking-wide">FIT SHAPERS</h1>
                    <p className="font-pop text-[32px] leading-none font-black uppercase">THE FITNESS CLUB</p>
                  </div>
                </div>
                <p className="max-w-[320px] text-right text-xs font-semibold leading-5 sm:text-sm">
                  338/73, Nearby KA -51 RTO Vijay Bank Layout, Devarachikkanahalli BTM 4th Stage, BDA Layout, 2ND BLOCK,
                  BANNERGHATTA ROAD, BANGALORE -560076
                </p>
              </div>

              <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm font-semibold">
                <p className="receipt-line">Invoice No: {data.invoiceNo}</p>
                <h2 className="mx-auto w-fit rounded-lg bg-zinc-900 px-4 py-0.5 font-pop text-xl font-black tracking-wide text-white">RECEIPT</h2>
                <p className="receipt-line text-right">Date: {formatDate(data.date)}</p>
              </div>

              <div className="space-y-4 text-sm sm:text-base font-semibold">
                <p className="receipt-line">Received with thanks from Ms / Mr / Mrs: {data.name || '________________'}</p>
                <p className="receipt-line">Contact No: {data.contact || '________________'}</p>
                <p className="receipt-line">Package Type: {data.packageType || '________________'}</p>
                <p className="receipt-line">
                  Start Date: {formatDate(data.startDate) || '_____________'}
                  <span className="ml-2">End Date: {formatDate(data.endDate) || '_____________'} GYM</span>
                </p>
                <p className="receipt-line">The Sum of Rupees: {amountToWords(data.amount)}</p>
              </div>
            </div>

            <div className="relative z-10 mt-3 flex items-end justify-between gap-4">
              <div className="w-[68%] space-y-2">
                {/* <p className="text-xs font-bold tracking-wide">ADVISORY</p> */}
                {/* <div className="h-8 rounded border-2 border-zinc-800/80" /> */}
                <p className="text-sm font-bold">NON REFUNDABLE</p>
                {/* <div className="h-9 w-full rounded border-2 border-zinc-800 px-3 py-1 text-lg font-bold">
                  {data.amount ? `₹ ${Number(data.amount).toLocaleString('en-IN')}` : '₹'}
                </div> */}
                <div className="h-10 w-full rounded border-2 border-zinc-800 px-3 py-1 text-base font-semibold">
                  {data.amount ? `Amount: ₹ ${Number(data.amount).toLocaleString('en-IN')}` : 'Amount: ₹'}
                </div>
              </div>
              <p className="text-lg font-bold">Authorised Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
