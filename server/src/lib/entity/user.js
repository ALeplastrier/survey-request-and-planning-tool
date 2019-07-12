import {Entity, PrimaryColumn, Column, ManyToOne, OneToMany} from "typeorm";

import { DateTransformer } from './utils';

import { Organisation } from './organisation'
import { RecordState } from './record-state'
import { Role } from './role'

@Entity()
export class User {

  @PrimaryColumn('varchar')
  id = undefined;

  @Column("varchar")
  issuer = undefined;

  @Column("varchar")
  issuerSub = undefined;

  @Column("varchar")
  avatar = undefined;

  @Column("varchar")
  email = undefined;

  @Column("varchar")
  name = undefined;

  // last time user did something within the application
  @Column({
      type:"timestamp with time zone",
      transformer: new DateTransformer(),
      nullable: true,
  })
  lastSeen;

  @Column("varchar", {select: false})
  accessToken = undefined;

  @Column("varchar", {select: false})
  refreshToken = undefined;

  @ManyToOne(type => Role, role => role.users)
  role;

  @ManyToOne(type => Organisation, org => org.users)
  organisation;

  @OneToMany(type => RecordState, recordState => recordState.user)
  recordStates;
}
