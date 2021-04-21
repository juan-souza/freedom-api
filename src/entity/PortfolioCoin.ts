import {
  BaseEntity,
  Column,
  Entity, JoinTable, ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {PortfolioTransaction} from "./PortfolioTransaction";

@Entity('PortfolioCoin')
export class PortfolioCoin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;// nome da moeda

  @Column()
  coinId: string; // id da moeda

  @Column()
  symbol: string; // moeda

  @Column()
  pair: string; // par da moeda

  @Column()
  totalQuantity: number; // quantidade total da moeda

  @Column()
  totalFee: number;// total de taxas da moeda

  @Column()
  totalProfit: number;// lucro ou perca em dolar da moeda

  @Column()
  totalProfitPercent: number;// lucro ou perca em porcentagem da moeda

  @Column()
  totalSpent: number;// valor total em dolar da moeda

  @Column()
  avgPrice: number; // preco medio da moeda

  @ManyToMany(() => PortfolioTransaction)
  @JoinTable()
  transactions: PortfolioTransaction[];
}
