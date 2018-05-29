import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ChildRecord } from 'ng-salesforce';
import { count } from 'rxjs/operator/count';
import {ORDERS , OrderExportModel} from './../models/OrderExportModel.model';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[],orderLineItesm : ChildRecord = null, excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    let tableHeaders = [["Product Name","Product Code","Unit Price","Quantity","Net Price"]];
    var orderLineRecArr = [];
    if(orderLineItesm != null)
    {
      XLSX.utils.sheet_add_aoa(worksheet,tableHeaders, {origin: "A4"});
      for (let counter = 0;counter < orderLineItesm.records.length;counter++) {
        orderLineRecArr[counter] = [];
        orderLineRecArr[counter][0] =  orderLineItesm.records[counter].Apttus_Config2__Description__c;
        orderLineRecArr[counter][1] = orderLineItesm.records[counter].APTSCU_Product_Code__c;
        orderLineRecArr[counter][2] = "$ "+orderLineItesm.records[counter].Apttus_Config2__NetUnitPrice__c;
        orderLineRecArr[counter][3] = orderLineItesm.records[counter].Apttus_Config2__Quantity__c;
        orderLineRecArr[counter][4] = "$ "+orderLineItesm.records[counter].Apttus_Config2__NetPrice__c;
    }
    
    XLSX.utils.sheet_add_aoa(worksheet,orderLineRecArr, {origin: "A5"});
    }
    this.tableHeaderFormatting(worksheet.A1);
    this.tableHeaderFormatting(worksheet.B1);
    this.tableHeaderFormatting(worksheet.C1);
    this.tableHeaderFormatting(worksheet.D1);
    this.tableHeaderFormatting(worksheet.E1);

    this.tableBodyFormatting(worksheet.A2);
    this.tableBodyFormatting(worksheet.B2);
    this.tableBodyFormatting(worksheet.C2);
    this.tableBodyFormatting(worksheet.D2);
    this.tableBodyFormatting(worksheet.E2);

    this.tableHeaderFormatting(worksheet.A4);
    this.tableHeaderFormatting(worksheet.B4);
    this.tableHeaderFormatting(worksheet.C4);
    this.tableHeaderFormatting(worksheet.D4);
    this.tableHeaderFormatting(worksheet.E4);
    for(let i=5;i<(orderLineItesm.records.length+5);i++){
      this.tableBodyFormatting(worksheet['A'+i]);
      this.tableBodyFormatting(worksheet['B'+i]);
      this.tableBodyFormatting(worksheet['C'+i]);
      this.tableBodyFormatting(worksheet['D'+i]);
      this.tableBodyFormatting(worksheet['E'+i]);
    }
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
    ORDERS.length = 0;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  private tableHeaderFormatting(cell: XLSX.CellObject) {
    const wrapAndCenterCellStyle = { fill:{fgColor : {rgb: "8DB4E2"}},alignment: { wrapText: false, vertical: 'center', horizontal: 'center' } , font: { bold: true , name:"Calibri" , sz : "11"} , border : {top : {style: 'thin', color: {rgb: "000000"} },bottom : {style: 'thin', color: {rgb: "000000"} },left : {style: 'thin', color: {rgb: "000000"} },right : {style: 'thin', color: {rgb: "000000"} } } };
    this.setCellStyle(cell, wrapAndCenterCellStyle);
  }

  private tableBodyFormatting(cell: XLSX.CellObject) {
    const wrapAndCenterCellStyle = { fill:{ fgColor : {rgb: "C4B597"}} , alignment: { wrapText: false, vertical: 'center', horizontal: 'center' } ,  border : {top : {style: 'thin', color: {rgb: "000000"} },bottom : {style: 'thin', color: {rgb: "000000"} },left : {style: 'thin', color: {rgb: "000000"} },right : {style: 'thin', color: {rgb: "000000"} } } };
    this.setCellStyle(cell, wrapAndCenterCellStyle);
  }

  private setCellStyle(cell: XLSX.CellObject, style: {}) {
    if(cell!=null){
      cell.s = style;
    }
  }

}