export  class OrderExportModel {
    public Account: String;
    public Number: String;
    public Type: String;
    public OrderDate: Date;
    public Total: string;
    public Status: string;
    public Contact: string;
}

export const ORDERS: OrderExportModel[] = [];
