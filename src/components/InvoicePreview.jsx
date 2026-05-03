import { amountToWords, formatDate } from '../utils/invoice';

function ReceiptRow({ label, value, className = '' }) {
  return (
    <div className={`text-zinc-800 ${className}`}>
      <p className="mb-1 text-[13px] font-semibold sm:text-sm">{label}:</p>
      <div className="relative h-7 border-b border-dotted border-zinc-700/90">
        <span className="absolute -top-1.5 left-2 bg-transparent px-1 text-sm font-bold sm:text-base">{value}</span>
      </div>
    </div>
  );
}

export default function InvoicePreview({ data, invoiceRef, balanceAmount }) {
  return (
    <div className="glass-card overflow-hidden p-3">
      <div
        ref={invoiceRef}
        className="mx-auto w-full max-w-[840px] rounded-[28px] border-2 border-zinc-800 bg-[#f4f4f5] p-5 text-zinc-900 shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:p-7"
      >
        <div className="relative min-h-[560px] rounded-[26px] border-2 border-zinc-900/90 p-4 sm:p-7">
          <img src="/1000135832-Photoroom.png" alt="FitShapers watermark" className="pointer-events-none absolute left-1/2 top-1/2 w-[52%] -translate-x-1/2 -translate-y-8/2 opacity-[0.06]" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-5">
            <div>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src="/1000135338-Photoroom~2.png" alt="logo" className="h-16 w-16 rounded-full border border-zinc-300 object-cover" />
                  <div>
                    <h1 className="font-pop text-4xl font-extrabold leading-none tracking-wide">FITSHAPERS</h1>
                    <p className="mt-1 font-pop text-xs font-normal uppercase tracking-[0.2em] text-zinc-700">The Fitness Club</p>
                  </div>
                </div>
                <div className="max-w-[320px] text-right text-xs font-semibold leading-5 sm:text-sm">
                  <div className="mb-1 inline-flex h-7 items-center rounded-full px-2 text-[14px] font-bold text-zinc-900">
                    <span className="mr-1">☎</span> +91 8892788868 / +91 6362249181
                  </div>
                  <p>
                    338/73, Nearby KA -51 RTO Vijay Bank Layout, Devarachikkanahalli BTM 4th Stage, BDA Layout, 2ND BLOCK,
                    BANNERGHATTA ROAD, BANGALORE -560076
                  </p>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm font-semibold">
                <p className="receipt-line">Invoice No: {data.invoiceNo}</p>
                <h2 className="mx-auto inline-flex h-9 min-w-[150px] -translate-y-8 items-center justify-center rounded-full border-2 border-zinc-900 px-6 font-pop text-xl font-black tracking-wide text-zinc-900">RECEIPT</h2>
                <p className="receipt-line text-right">Date: {formatDate(data.date)}</p>
              </div>

              <div className="space-y-3 text-sm sm:text-base">
                <ReceiptRow label="Received with thanks from Ms / Mr / Mrs" value={data.name || '________________'} />
                <ReceiptRow label="Contact No" value={data.contact || '________________'} />
                <ReceiptRow label="Package Type" value={data.packageType || '________________'} />
                <ReceiptRow label="Start Date / End Date" value={`${formatDate(data.startDate) || '_____________'}  to  ${formatDate(data.endDate) || '_____________'}`} />
                <ReceiptRow label="The Sum of Rupees" value={amountToWords(data.amount)} />
                <ReceiptRow label="Advance Paid" value={`₹ ${Number(data.advancePaid || 0).toLocaleString('en-IN')}`} />
                <ReceiptRow label="Balance Amount to be Paid" value={`₹ ${Number(balanceAmount || 0).toLocaleString('en-IN')}`} />
              </div>
            </div>

            <div className="relative z-10 mt-3 flex items-end justify-between gap-4">
              <div className="w-[70%] space-y-2">
                <p className="text-base font-bold tracking-wide">NON REFUNDABLE</p>
                <div className="flex h-10 w-full items-start rounded border-2 border-zinc-800 bg-white/35 px-4 pt-1 text-lg font-bold leading-none shadow-inner">
                  ₹ {Number(data.amount || 0).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="flex min-w-[170px] flex-col items-center justify-end gap-1">
                <div className="flex h-12 w-full items-end justify-center overflow-hidden">
                  {data.signatureDataUrl ? (
                    <img src={data.signatureDataUrl} alt="Authorised signature" className="max-h-12 w-auto object-contain" />
                  ) : (
                    <span className="text-[11px] text-zinc-500">No signature uploaded</span>
                  )}
                </div>
                <p className="text-lg font-bold leading-none">Authorised Signatory</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
