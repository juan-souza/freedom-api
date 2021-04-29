import {ExchangeId} from "ccxt";

interface ExchangeInfo {
  showOrder: number;
  exchangeId: ExchangeId;
  name: string;
  enable: boolean;
}

enum Exchange {
  GLOBAL,
  BINANCE,
  COINBASE_PRO,
  KRAKEN,
  BITTREX,
  KUCOIN,
  FTX
}

export const Exchanges: Record<Exchange, ExchangeInfo> = {
  [Exchange.GLOBAL]: {showOrder: 10, exchangeId: null, name: 'Global', enable: true},
  [Exchange.BINANCE]: {showOrder: 20, exchangeId: 'binance', name: 'Binance', enable: true},
  [Exchange.COINBASE_PRO]: {showOrder: 30, exchangeId: 'coinbasepro', name: 'Coinbase Pro', enable: false},
  [Exchange.KRAKEN]: {showOrder: 40, exchangeId: 'kraken', name: 'Kraken', enable: false},
  [Exchange.BITTREX]:{showOrder: 50, exchangeId: 'bittrex', name: 'Bittrex', enable: false},
  [Exchange.KUCOIN]: {showOrder: 60, exchangeId: 'kucoin', name: 'Kucoin', enable: false},
  [Exchange.FTX]: {showOrder: 70, exchangeId: 'ftx', name: 'FTX', enable: false}
};

export default Exchange;
