import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: NextRequest) {
  try {
    const { url, projectId, awardId } = await request.json();

    // Puppeteer 브라우저 실행
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
      ],
    });

    const page = await browser.newPage();

    // 뷰포트 설정 (A4 크기)
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 2,
    });

    // PDF 전용 페이지로 이동
    const pdfUrl = url.includes("/pdf") ? url : `${url}/pdf`;

    // 페이지 로드
    await page.goto(pdfUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // 추가 대기 시간 (모든 콘텐츠가 로드될 때까지)
    await page.waitForTimeout(3000);

    // PDF 생성
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; color: #666;">
          <span>이봉희 포트폴리오 - ${new Date().toLocaleDateString()}</span>
        </div>
      `,
      preferCSSPageSize: true,
    });

    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="이봉희_포트폴리오.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF 생성 오류:", error);
    return NextResponse.json(
      { error: "PDF 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
