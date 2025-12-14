import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity('status_updates')
export class StatusUpdate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'text', nullable: true })
  htmlText: string;

  @Column({ nullable: true })
  statusType: string;

  @Column({ nullable: true })
  resourceSubtype: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn()
  parent: Project;

  @ManyToOne(() => User)
  @JoinColumn()
  author: User;

  @ManyToOne(() => User)
  @JoinColumn()
  createdBy: User;
}

