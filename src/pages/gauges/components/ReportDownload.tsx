import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { AnnualOverview } from "./AnnualOverview";

export function ReportDownload() {
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    if (!componentRef.current) return;
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("download.pdf");
    });
  };

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <div>
          <div className="text-lg font-medium mb-2">Download Report</div>
          <div className="text-md">
            Generate a PDF report containing all charts and data tables
          </div>
        </div>
        <div className="mt-4">
          <div className="flex gap-4">
            <button
              className="btn btn-sm bg-primary text-white"
              onClick={handleDownloadPdf}
            >
              <i className="mgc_download_3_fill mr-2"></i> Save as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Hidden printable content */}
      <div className="h-0 overflow-hidden">
        <div ref={componentRef}>
          <h1 className="py-16 text-center text-6xl font-bold">
            Commuting CO2 Emissions
          </h1>
          <AnnualOverview />
        </div>
      </div>
    </div>
  );
}
