import { amountToWords, formatDate } from '../utils/invoice';

function ReceiptRow({ label, value, className = '' }) {
  return (
    <p className={`flex items-end gap-2 text-zinc-800 ${className}`}>
      <span className="whitespace-nowrap font-semibold">{label}:</span>
      <span className="flex-1 border-b border-dotted border-zinc-600/90" />
      <span className="min-w-0 flex-[2] font-bold">{value}</span>
    </p>
  );
}

export default function InvoicePreview({ data, invoiceRef, balanceAmount }) {
  return (
    <div className="glass-card overflow-hidden p-3">
      <div
        ref={invoiceRef}
        className="mx-auto w-full max-w-[840px] rounded-[28px] border-2 border-zinc-800 bg-[#f4f4f5] p-5 text-zinc-900 shadow-[0_12px_40px_rgba(0,0,0,0.22)] sm:p-7"
      >
        <div className="relative min-h-[560px] rounded-[26px] border-2 border-zinc-900/90 p-4 sm:p-7">
          <img src="/IMG-20260117-WA0017(6).jpg" alt="FitShapers logo" className="pointer-events-none absolute left-1/2 top-1/2 w-[52%] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-5">
            <div>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src="/IMG-20260117-WA0017(6).jpg" alt="logo" className="h-14 w-14 rounded-full border border-zinc-300" />
                  <div>
                    <h1 className="font-pop text-3xl font-extrabold tracking-wide">FIT SHAPERS</h1>
                    <p className="font-pop text-[32px] leading-none font-black uppercase">THE FITNESS CLUB</p>
                  </div>
                </div>
                <div className="max-w-[320px] text-right text-xs font-semibold leading-5 sm:text-sm">
                  <p className="mb-1 inline-flex items-center gap-1 rounded-full bg-zinc-900 px-2.5 py-0.5 text-[11px] font-bold text-white">
                    ☎ +91 8892788868 / +91 6362249181
                  </p>
                  <p>
                    338/73, Nearby KA -51 RTO Vijay Bank Layout, Devarachikkanahalli BTM 4th Stage, BDA Layout, 2ND BLOCK,
                    BANNERGHATTA ROAD, BANGALORE -560076
                  </p>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm font-semibold">
                <p className="receipt-line">Invoice No: {data.invoiceNo}</p>
                <h2 className="mx-auto w-fit rounded-xl bg-zinc-900 px-5 py-1.5 font-pop text-xl leading-none font-black tracking-wide text-white shadow-[0_6px_14px_rgba(0,0,0,0.3)]">RECEIPT</h2>
                <p className="receipt-line text-right">Date: {formatDate(data.date)}</p>
              </div>

              <div className="space-y-4 text-sm sm:text-base">
                <ReceiptRow label="Received with thanks from Ms / Mr / Mrs" value={data.name || '________________'} />
                <ReceiptRow label="Contact No" value={data.contact || '________________'} />
                <ReceiptRow label="Package Type" value={data.packageType || '________________'} />
                <ReceiptRow
                  label="Start Date"
                  value={`${formatDate(data.startDate) || '_____________'}   End Date: ${formatDate(data.endDate) || '_____________'} GYM`}
                />
                <ReceiptRow label="The Sum of Rupees" value={amountToWords(data.amount)} />
                <ReceiptRow label="Advance Paid" value={`₹ ${Number(data.advancePaid || 0).toLocaleString('en-IN')}`} />
                <ReceiptRow label="Balance Amount to be Paid" value={`₹ ${Number(balanceAmount || 0).toLocaleString('en-IN')}`} />
              </div>
            </div>

            <div className="relative z-10 mt-3 flex items-end justify-between gap-4">
              <div className="w-[70%] space-y-2">
                <p className="text-base font-bold tracking-wide">NON REFUNDABLE</p>
                <div className="h-10 w-full rounded border-2 border-zinc-800 bg-white/35 px-3 py-1 text-lg font-bold leading-8 shadow-inner">
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
