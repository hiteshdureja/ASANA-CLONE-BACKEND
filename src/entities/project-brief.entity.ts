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
import { Workspace } from './workspace.entity';

@Entity('project_briefs')
export class ProjectBrief {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn()
  project: Project;
}

@Entity('user_task_lists')
export class UserTaskList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column()
  name: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  owner: User;

  @ManyToOne(() => Workspace)
  @JoinColumn()
  workspace: Workspace;
}

