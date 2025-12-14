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
import { Workspace } from './workspace.entity';
import { Team } from './team.entity';
import { User } from './user.entity';
import { Task } from './task.entity';
import { Section } from './section.entity';
import { ProjectStatus } from './project-status.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  htmlNotes: string;

  @Column({ type: 'boolean', default: false })
  archived: boolean;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  defaultView: string;

  @Column({ type: 'date', nullable: true })
  dueOn: Date;

  @Column({ type: 'date', nullable: true })
  startOn: Date;

  @Column({ nullable: true })
  privacySetting: string;

  @Column({ type: 'boolean', default: false })
  public: boolean;

  @Column({ nullable: true })
  defaultAccessLevel: string;

  @Column({ nullable: true })
  minimumAccessLevelForCustomization: string;

  @Column({ nullable: true })
  minimumAccessLevelForSharing: string;

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.projects)
  @JoinColumn()
  workspace: Workspace;

  @ManyToOne(() => Team, (team) => team.projects, { nullable: true })
  @JoinColumn()
  team: Team;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  owner: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  completedBy: User;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({ name: 'project_members' })
  members: User[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'project_followers' })
  followers: User[];

  @ManyToMany(() => Task, (task) => task.projects)
  @JoinTable({ name: 'project_tasks' })
  tasks: Task[];

  @OneToMany(() => Section, (section) => section.project)
  sections: Section[];

  @OneToMany(() => ProjectStatus, (status) => status.project)
  statuses: ProjectStatus[];
}

