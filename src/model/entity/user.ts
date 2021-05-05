import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  @Length(5, 100)
  @IsEmail()
  email: string;

  @Column({
    length: 80
  })
  @Length(2, 80)
  givenName: string;

  @Column({
    length: 80
  })
  @Length(2, 80)
  familyName: string;
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  constructor(user?: {
    givenName: string;
    familyName: string;
    email: string;
    id: number;
  }) {
    if (user !== undefined) {
      this.id = user.id;
      this.email = user.email;
      this.familyName = user.familyName;
      this.givenName = user.givenName;
    }
  }
}

export const userSchema = {
  id: { type: 'number', required: true, example: 1 },
  email: {
    type: 'string',
    required: true,
    example: 'max.musterman@localnet.com'
  },
  givenName: { type: 'string', required: true, example: 'Max' },
  familyName: { type: 'string', required: true, example: 'Musterman' },
  created: {
    type: 'timestamptz',
    required: false,
    example: '2021-05-09T21:49:56.032Z'
  }
};
