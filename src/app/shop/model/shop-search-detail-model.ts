export class ShopSearchDetailModel {
    constructor(
        public skey: string,
        public page: string,
        public pagesize: string,
        public order: string,
        public sort: string,
        public s_price: string,
        public e_price: string,
        public gc_id: string,
        public show_another: string,
    ) { }
}