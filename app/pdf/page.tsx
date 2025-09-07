import PDFPortfolio from "@/components/PDFPortfolio";
import "./print.css";

export default function PDFPage() {
  return (
    <>
      <head>
        <title>이봉희 포트폴리오 - PDF</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <PDFPortfolio />
    </>
  );
}
