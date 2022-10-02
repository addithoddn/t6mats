const TPITEM = Object.freeze({
    ID: 'id',
    BUY_ORDERS: 'buys',
    SELL_ORDERS: 'sells'
});


const BUY_ORDER = Object.freeze({
    QUANTITY: 'quantity',
    UNIT_PRICE: 'unit_price'
});

const SELL_ORDER = Object.freeze({
    QUANTITY: 'quantity',
    UNIT_PRICE: 'unit_price'
});

const TP_CONSTANTS = Object.freeze({
    TPITEM: TPITEM,
    BUY_ORDER: BUY_ORDER,
    SELL_ORDER: SELL_ORDER
});
export default TP_CONSTANTS;