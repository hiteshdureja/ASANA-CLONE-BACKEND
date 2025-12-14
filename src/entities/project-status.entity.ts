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

@Entity('project_statuses')
export class ProjectStatus {
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
  color: string;

  @Column({ type: 'boolean', default: false })
  isCurrent: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToOne(() => Project, (project) => project.statuses)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => User)
  @JoinColumn()
  author: User;

  @ManyToOne(() => User)
  @JoinColumn()
  createdBy: User;
}

