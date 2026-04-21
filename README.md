# FitShapers Premium Invoice App

High-end React + Tailwind invoice dashboard for **FitShapers The Fitness Club** with:
- Multi-step animated form (Framer Motion)
- Live invoice preview matching the provided receipt layout
- PDF download (html2canvas + jsPDF)
- Email sending with attachment (EmailJS)
- Dark premium glassmorphism UI

## 1) Setup

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## 2) EmailJS setup

1. Create a `.env` file from `.env.example`.
2. Add your EmailJS keys:

```bash
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

3. In your EmailJS template include variables:
- `{{subject}}`
- `{{to_name}}`
- `{{message}}`
- `{{invoice_number}}`
- `{{invoice_date}}`
- `{{attachment}}`
- `{{filename}}`

> For attachments, enable EmailJS attachment/base64 support in your plan/template settings.

## 3) Logo

- Current implementation ships with `public/logo.svg`.
- If you want to use your exact provided logo file, replace `public/logo.svg` with your asset (same name), no code changes needed.

## 4) Build for production

```bash
npm run build
npm run preview
```

## Notes on architecture

- `src/App.jsx`: central state, PDF generation, EmailJS workflow
- `src/components/FormPanel.jsx`: animated multi-step form content
- `src/components/InvoicePreview.jsx`: receipt layout + watermark
- `src/components/StepTracker.jsx`: progress indicator
- `src/utils/invoice.js`: formatting and invoice number utilities
