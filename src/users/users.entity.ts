import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  //   @Column({unique : true})
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted user with ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated user with ${this.id}`);
  }
}
