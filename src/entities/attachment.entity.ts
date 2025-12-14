import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  resourceSubtype: string;

  @Column({ type: 'text', nullable: true })
  downloadUrl: string;

  @Column({ type: 'text', nullable: true })
  viewUrl: string;

  @Column({ type: 'text', nullable: true })
  permanentUrl: string;

  @Column({ type: 'text', nullable: true })
  host: string;

  @Column({ type: 'integer', nullable: true })
  size: number;

  @Column({ type: 'boolean', default: false })
  connectedToApp: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Task)
  @JoinColumn()
  parent: Task;
}

