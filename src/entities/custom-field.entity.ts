import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Workspace } from './workspace.entity';
import { User } from './user.entity';

@Entity('custom_fields')
export class CustomField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  type: string; // text, number, enum, date, etc.

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @Column({ type: 'boolean', default: false })
  isGlobalToWorkspace: boolean;

  @Column({ type: 'boolean', default: false })
  isFormulaField: boolean;

  @Column({ type: 'boolean', default: false })
  isValueReadOnly: boolean;

  @Column({ nullable: true })
  format: string;

  @Column({ nullable: true })
  currencyCode: string;

  @Column({ type: 'integer', nullable: true })
  precision: number;

  @Column({ type: 'jsonb', nullable: true })
  enumOptions: any[];

  @Column({ type: 'jsonb', nullable: true })
  inputRestrictions: any;

  @Column({ nullable: true })
  defaultAccessLevel: string;

  @Column({ nullable: true })
  privacySetting: string;

  @Column({ nullable: true })
  customLabel: string;

  @Column({ nullable: true })
  customLabelPosition: string;

  @Column({ type: 'boolean', default: false })
  hasNotificationsEnabled: boolean;

  @Column({ nullable: true })
  idPrefix: string;

  @Column({ nullable: true })
  resourceSubtype: string;

  @Column({ nullable: true })
  representationType: string;

  @Column({ type: 'boolean', default: false })
  asanaCreatedField: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToOne(() => Workspace)
  @JoinColumn()
  workspace: Workspace;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  createdBy: User;
}

@Entity('enum_options')
export class EnumOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  color: string;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @ManyToOne(() => CustomField, { onDelete: 'CASCADE' })
  @JoinColumn()
  customField: CustomField;
}

