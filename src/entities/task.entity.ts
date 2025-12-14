import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';
import { Section } from './section.entity';
import { Tag } from './tag.entity';
import { Workspace } from './workspace.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column({ nullable: true })
  customId: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  htmlNotes: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ type: 'date', nullable: true })
  dueOn: Date;

  @Column({ type: 'timestamp', nullable: true })
  dueAt: Date;

  @Column({ type: 'date', nullable: true })
  startOn: Date;

  @Column({ type: 'timestamp', nullable: true })
  startAt: Date;

  @Column({ nullable: true })
  resourceSubtype: string;

  @Column({ nullable: true })
  approvalStatus: string;

  @Column({ nullable: true })
  assigneeStatus: string;

  @Column({ type: 'integer', nullable: true })
  actualTimeMinutes: number;

  @Column({ type: 'jsonb', nullable: true })
  external: any;

  @Column({ type: 'boolean', default: false })
  liked: boolean;

  @Column({ type: 'boolean', default: false })
  hearted: boolean;

  @Column({ type: 'boolean', default: false })
  isRenderedAsSeparator: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  assignee: User;

  @ManyToOne(() => User)
  @JoinColumn()
  createdBy: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  completedBy: User;

  @ManyToOne(() => Task, { nullable: true })
  @JoinColumn()
  parent: Task;

  @OneToMany(() => Task, (task) => task.parent)
  subtasks: Task[];

  @ManyToOne(() => Workspace, { nullable: true })
  @JoinColumn()
  workspace: Workspace;

  @ManyToMany(() => Project, (project) => project.tasks)
  @JoinTable({ name: 'task_projects' })
  projects: Project[];

  @ManyToMany(() => Section)
  @JoinTable({ name: 'task_sections' })
  sections: Section[];

  @ManyToMany(() => Tag, (tag) => tag.tasks)
  @JoinTable({ name: 'task_tags' })
  tags: Tag[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'task_followers' })
  followers: User[];

  @ManyToMany(() => Task)
  @JoinTable({ name: 'task_dependencies', joinColumn: { name: 'task_id' }, inverseJoinColumn: { name: 'dependency_id' } })
  dependencies: Task[];

  @ManyToMany(() => Task)
  @JoinTable({ name: 'task_dependents', joinColumn: { name: 'task_id' }, inverseJoinColumn: { name: 'dependent_id' } })
  dependents: Task[];
}

