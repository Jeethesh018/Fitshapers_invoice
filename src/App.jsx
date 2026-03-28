import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser';
import FormPanel from './components/FormPanel';
import InvoicePreview from './components/InvoicePreview';
import StepTracker from './components/StepTracker';
import { formatDate, generateInvoiceNumber } from './utils/invoice';

const defaultState = {
  invoiceNo: generateInvoiceNumber(),
  date: new Date().toISOString().split('T')[0],
  name: '',
  contact: '',
  packageType: '',
  startDate: '',
  endDate: '',
  amount: ''
};

export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(defaultState);
  const [sending, setSending] = useState(false);
  const invoiceRef = useRef(null);

  const emailConfig = useMemo(
    () => ({
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    }),
    []
  );

  const capturePDF = async () => {
    if (!invoiceRef.current) throw new Error('Invoice element not found');
    const canvas = await html2canvas(invoiceRef.current, { scale: 2, backgroundColor: '#f4f4f5', useCORS: true });
    const imageData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
    pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
    return { pdf, blob: pdf.output('blob') };
  };

  const downloadPDF = async () => {
    const { pdf } = await capturePDF();
    pdf.save(`${data.invoiceNo}.pdf`);
  };

  const sendEmail = async () => {
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      alert('EmailJS keys are missing. Please configure .env first.');
      return;
    }

    try {
      setSending(true);
      const { blob } = await capturePDF();
      const attachment = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result?.toString().split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          subject: 'FitShapers Invoice',
          to_name: data.name,
          message: `Hi ${data.name || 'Member'},\nThank you for joining FitShapers The Fitness Club.\nPlease find your invoice attached.\nStay consistent and keep pushing 💪`,
          invoice_number: data.invoiceNo,
          invoice_date: formatDate(data.date),
          attachment,
          filename: `${data.invoiceNo}.pdf`
        },
        { publicKey: emailConfig.publicKey }
      );

      alert('Invoice sent successfully!');
    } catch (error) {
      console.error(error);
      alert('Unable to send email. Please verify EmailJS template variables.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-7 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[420px_1fr]"
      >
        <section>
          <div className="glass-card mb-4 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-300">FitShapers Studio</p>
            <h1 className="font-pop text-3xl font-bold">Premium Invoice Dashboard</h1>
            <p className="mt-2 text-sm text-zinc-400">Dynamic, animated, and export-ready receipts with EmailJS delivery.</p>
          </div>
          <StepTracker current={step} />
          <FormPanel step={step} data={data} setData={setData} setStep={setStep} onDownload={downloadPDF} onSend={sendEmail} sending={sending} />
        </section>

        <section>
          <InvoicePreview data={data} invoiceRef={invoiceRef} />
        </section>
      </motion.div>
    </main>
  );
}
