import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Workspace } from './workspace.entity';

@Entity('webhooks')
export class Webhook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column({ type: 'text' })
  target: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'text', nullable: true })
  resource: string;

  @Column({ type: 'jsonb', nullable: true })
  filters: any;

  @Column({ type: 'timestamp', nullable: true })
  lastSuccessAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastFailureAt: Date;

  @Column({ type: 'text', nullable: true })
  lastFailureContent: string;

  @Column({ type: 'integer', default: 0 })
  deliveryRetryCount: number;

  @Column({ type: 'timestamp', nullable: true })
  nextAttemptAfter: Date;

  @Column({ type: 'timestamp', nullable: true })
  failureDeletionTimestamp: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Workspace, { nullable: true })
  @JoinColumn()
  workspace: Workspace;
}

