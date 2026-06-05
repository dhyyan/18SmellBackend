import PDFDocument from 'pdfkit';
import { Response } from 'express';
import getInvoiceByIdService from './GetInvoiceByIdService.js';

class GenerateInvoicePdfService {
  async execute(orderId: string, userId: string, userRole: string, res: Response) {
    const order = await getInvoiceByIdService.execute(orderId, userId, userRole);

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-disposition', `attachment; filename=invoice-${order._id}.pdf`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    this.generateHeader(doc);
    this.generateCustomerInformation(doc, order);
    this.generateInvoiceTable(doc, order);
    this.generateFooter(doc);

    doc.end();
  }

  private generateHeader(doc: typeof PDFDocument) {
    doc
      .fillColor('#444444')
      .fontSize(20)
      .text('18Smell', 50, 57)
      .fontSize(10)
      .text('123 Fragrance Lane.', 200, 65, { align: 'right' })
      .text('Mumbai, MH, 400001', 200, 80, { align: 'right' })
      .moveDown();
  }

  private generateCustomerInformation(doc: typeof PDFDocument, order: any) {
    doc
      .fillColor('#444444')
      .fontSize(20)
      .text('Invoice', 50, 160);

    doc
      .fontSize(10)
      .text(`Invoice Number: ${order._id}`, 50, 200)
      .text(`Invoice Date: ${new Date(order.createdAt).toLocaleDateString()}`, 50, 215)
      .text(`Total Amount: ₹${order.totalAmount}`, 50, 230)

      .text(order.user.name, 300, 200)
      .text(order.user.email, 300, 215)
      .text(order.shippingAddress, 300, 230);
  }

  private generateInvoiceTable(doc: typeof PDFDocument, order: any) {
    let i;
    const invoiceTableTop = 330;

    doc.font('Helvetica-Bold');
    this.generateTableRow(
      doc,
      invoiceTableTop,
      'Item',
      'Unit Cost',
      'Quantity',
      'Line Total'
    );
    doc.font('Helvetica');

    for (i = 0; i < order.items.length; i++) {
      const item = order.items[i];
      const position = invoiceTableTop + (i + 1) * 30;
      this.generateTableRow(
        doc,
        position,
        item.product.name,
        `₹${item.price}`,
        item.quantity,
        `₹${item.price * item.quantity}`
      );
    }
  }

  private generateTableRow(
    doc: typeof PDFDocument,
    y: number,
    item: string,
    unitCost: string | number,
    quantity: string | number,
    lineTotal: string | number
  ) {
    doc
      .fontSize(10)
      .text(item, 50, y)
      .text(unitCost.toString(), 280, y, { width: 90, align: 'right' })
      .text(quantity.toString(), 370, y, { width: 90, align: 'right' })
      .text(lineTotal.toString(), 0, y, { align: 'right' });
  }

  private generateFooter(doc: typeof PDFDocument) {
    doc
      .fontSize(10)
      .text(
        'Payment is due within 15 days. Thank you for your business.',
        50,
        700,
        { align: 'center', width: 500 }
      );
  }
}

export default new GenerateInvoicePdfService();
