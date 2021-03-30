import AccessPointType from "./enum/AccessPointType";

export class Wallet {
  public static readonly AAX = new Wallet('aax', 'AAX', false, AccessPointType.EXCHANGE);
  public static readonly BINANCE = new Wallet('binance', 'Binance', false, AccessPointType.EXCHANGE);
  public static readonly BITTREX = new Wallet('bittrex', 'Bittrex', false, AccessPointType.EXCHANGE);
  public static readonly BITVAVO = new Wallet('bitvavo', 'Bitvavo', false, AccessPointType.EXCHANGE);
  public static readonly BYTETRADE = new Wallet('bytetrade', 'ByteTrade', false, AccessPointType.EXCHANGE);
  public static readonly CURRENCY = new Wallet('currencycom', 'Currency.com', false, AccessPointType.EXCHANGE);
  public static readonly ETERBASE = new Wallet('eterbase', 'Eterbase', false, AccessPointType.EXCHANGE);
  public static readonly GOPAX = new Wallet('gopax', 'GOPAX', false, AccessPointType.EXCHANGE);
  public static readonly IDEX = new Wallet('idex', 'IDEX', false, AccessPointType.EXCHANGE);
  public static readonly KRAKEN = new Wallet('kraken', 'Kraken', false, AccessPointType.EXCHANGE);
  public static readonly WAVES = new Wallet('wavesexchange', 'Waves.Exchange', false, AccessPointType.EXCHANGE);
  public static readonly XENA = new Wallet('xena', 'Xena Exchange', false, AccessPointType.EXCHANGE);

  public static readonly LEDGER = new Wallet('ledger', 'Ledger', false, AccessPointType.WALLET_PRIVATE);
  public static readonly TREZOR = new Wallet('trezor', 'Trezor', false, AccessPointType.WALLET_PRIVATE);
  public static readonly YOROI = new Wallet('yoroi', 'Yoroi', false, AccessPointType.WALLET_PRIVATE);
  public static readonly DAEDALUS = new Wallet('daedalus', 'Daedalus', false, AccessPointType.WALLET_PRIVATE);

  private constructor(public readonly id: string,
                      public readonly name: string,
                      public readonly enable: boolean,
                      public readonly accessPointType: AccessPointType) {
  }

}
