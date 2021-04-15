import {
  BaseEntity,
  Column,
  Entity, JoinTable, ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Exchange from "./enum/Exchange";
import {PortfolioCoin} from "./PortfolioCoin";

@Entity('PortfolioTracker')
export class PortfolioTracker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;//nome do portifolio

  @Column()
  exchange: Exchange;//corretora do portifolio

  @Column()
  totalFee: number;//valor total de taxas do portifolio

  @Column()
  totalProfit: number;// lucro ou perca em dolar do portifolio

  @Column()
  totalProfitPercent: number;// lucro ou perca em porcentagem  do portifolio

  @Column()
  totalSpent: number;//valor total em dolar do portifolio

  @ManyToMany(() => PortfolioCoin)
  @JoinTable()
  coins: PortfolioCoin[]; //moedas do  portifolio

}
